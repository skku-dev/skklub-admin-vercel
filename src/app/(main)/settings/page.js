'use client';

import { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Stack,
	Divider,
	Typography,
	TextField,
	Button,
	FormControl,
	InputAdornment,
	IconButton,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	DialogContentText,
	CircularProgress,
	Backdrop,
} from '@mui/material';
import Callout from '@/components/common/callout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import axiosInterceptorInstance from '../../../../axios/axiosInterceptorInstance';
import { error } from '@/utils/theme/colors';

import { useRecoilState } from 'recoil';
import { UserState } from '@/utils/recoil/atoms';
import { useUserLogoutApi } from '@/hooks/use-user';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const Settings = () => {
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [userId, setUserId] = useState('');
	const [backdropState, setBackdropState] = useState(false);

	const [user, setUser] = useRecoilState(UserState);

	const [passwordMatchError, setPasswordMatchError] = useState(false);
	const [passwordBtnState, setPasswordBtnState] = useState(true);

	const [logout] = useUserLogoutApi();

	const [inputValue, setInputValue] = useState({
		presidentName: '',
		presidentContact: '',
		password1: '',
		password2: '',
	});

	useEffect(() => {
		user.role !== 'ROLE_USER'
			? null
			: axiosInterceptorInstance.get(`/club/my`).then((res) => {
					setInputValue({
						presidentName: res.data.presidentName,
						presidentContact: res.data.presidentContact,
						password1: '',
						password2: '',
						passwordConfirm: '',
					});
			  });

		setUserId(window.localStorage.getItem('userid'));
	}, []);

	const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
	const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
	const handleClickShowPasswordConfirm = () =>
		setShowPasswordConfirm((show) => !show);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setInputValue((prevData) => ({
			...prevData,
			[name]: value,
		}));

		setPasswordMatchError(() => {
			if (value !== inputValue.password1 && name === 'password2') {
				return true;
			}
			return false;
		});

		setPasswordBtnState(() => {
			if (
				value === inputValue.password1 &&
				value !== '' &&
				inputValue.password1 !== '' &&
				inputValue.password2 !== ''
			) {
				return false;
			}
			return true;
		});
	};

	const passwordChangeSubmit = () => {
		setBackdropState(true);
		axiosInterceptorInstance
			.post(
				`/user/${userId}?password=${inputValue.password1}&name=${inputValue.presidentName}&contact=${inputValue.presidentContact}`
			)
			.then((response) => {
				setInputValue((prevData) => ({
					...prevData,
					password1: '',
					password2: '',
				}));

				logout();
			})
			.catch((error) => {
				alert(error);
				setBackdropState(false);
			});
	};

	const [open, setOpen] = useState(false);
	const [loadingBtnStatus, setLoadingBtnStatus] = useState(false);
	const [passwordConfirmMatchError, setPasswordConfirmMatchError] =
		useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleUserInfoEditBtn = () => {
		setOpen(true);
	};

	const userInfoEditSubmit = () => {
		setLoadingBtnStatus(true);
		// match with password

		axiosInterceptorInstance
			.post(
				`/user/${userId}?password=${inputValue.passwordConfirm}&name=${inputValue.presidentName}&contact=${inputValue.presidentContact}`
			)
			.then((response) => {
				console.log(response);
				setLoadingBtnStatus(false);
				setInputValue((prevData) => ({
					...prevData,
					passwordConfirm: '',
				}));
				handleClose();
				setPasswordConfirmMatchError(false);
			})
			.catch((error) => {
				console.log(error);
				setLoadingBtnStatus(false);
				setPasswordConfirmMatchError(true);
			});
	};

	return (
		<>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={backdropState}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<BootstrapDialog
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
				>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle sx={{ m: 0, p: 3 }}>
							{'유저 정보를 수정하시겠습니까?'}
						</DialogTitle>

						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
						<DialogContent dividers>
							<Typography gutterBottom>
								유저 정보를 수정하려면 비밀번호를 입력해주세요.
							</Typography>
							<TextField
								label="비밀번호"
								type={showPasswordConfirm ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPasswordConfirm}
												edge="end"
											>
												{showPasswordConfirm ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								name="passwordConfirm"
								onChange={handleInputChange}
								value={inputValue.passwordConfirm}
								error={passwordConfirmMatchError}
								helperText={
									passwordConfirmMatchError
										? '비밀번호가 일치하지 않습니다.'
										: ''
								}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={userInfoEditSubmit}
								autoFocus
								loading={loadingBtnStatus}
							>
								변경하기
							</Button>
						</DialogActions>
					</Dialog>
				</BootstrapDialog>

				<Container maxWidth="lg">
					<Stack spacing={3}>
						<div>
							<Typography variant="h4">설정 페이지</Typography>
						</div>
						<Callout title="유의사항" emoji="📌">
							유저네임, 전화번호 변경, 비밀번호 변경 후 자동으로 로그아웃
							됩니다.
							<br />
							비밀번호 변경 버튼은 비밀번호가 일치할 때만 활성화됩니다.
						</Callout>
						<div>
							{/* Change password */}
							{user.role !== 'ROLE_USER' ? (
								<Callout title="없는 기능입니다" emoji="🔒">
									관리자 계정은 인적사항 데이터가 존재하지 않습니다
								</Callout>
							) : (
								<div>
									<Stack
										direction="row"
										spacing={2}
										sx={{
											mb: 1,
										}}
									>
										<div>
											<Typography
												variant="h5"
												sx={{
													marginBottom: '10px',
												}}
											>
												유저네임 변경
											</Typography>
											<TextField
												required
												id="outlined-required"
												label="Required"
												name="presidentName"
												value={inputValue.presidentName}
												onChange={handleInputChange}
											/>
										</div>

										<div>
											<Typography
												variant="h5"
												sx={{
													marginBottom: '10px',
												}}
											>
												전화번호 변경
											</Typography>
											<TextField
												required
												id="outlined-required"
												label="Required"
												name="presidentContact"
												value={inputValue.presidentContact}
												onChange={handleInputChange}
											/>
										</div>
									</Stack>

									<Button
										variant="contained"
										sx={{
											marginTop: '10px',
											marginBottom: '30px',
										}}
										onClick={handleUserInfoEditBtn}
									>
										유저 정보 수정하기
									</Button>
								</div>
							)}

							<Divider
								sx={{
									marginTop: '30px',
									marginBottom: '30px',
								}}
							/>

							<Typography
								variant="h5"
								sx={{
									marginBottom: '10px',
								}}
							>
								비밀번호 변경
							</Typography>

							<Box component="form" noValidate>
								<div>
									<FormControl
										sx={{ mt: 1, mb: 1, width: '25ch' }}
										variant="outlined"
									>
										<TextField
											label="변경할 비밀번호"
											id="outlined-adornment-password1"
											type={showPassword1 ? 'text' : 'password'}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword1}
															edge="end"
														>
															{showPassword1 ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											name="password1"
											onChange={handleInputChange}
											value={inputValue.password1}
										/>
									</FormControl>
								</div>
								<div>
									<FormControl
										sx={{ mt: 1, mb: 1, width: '25ch' }}
										variant="outlined"
									>
										<TextField
											label="비밀번호 확인"
											id="outlined-adornment-password2"
											type={showPassword2 ? 'text' : 'password'}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword2}
															edge="end"
														>
															{showPassword2 ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											name="password2"
											onChange={handleInputChange}
											value={inputValue.password2}
											error={passwordMatchError}
											helperText={
												passwordMatchError
													? '비밀번호가 일치하지 않습니다.'
													: ''
											}
										/>
									</FormControl>
								</div>
								<Button
									variant="contained"
									sx={{
										marginTop: '10px',
										marginBottom: '30px',
									}}
									onClick={passwordChangeSubmit}
									disabled={passwordBtnState}
								>
									비밀번호 변경
								</Button>
							</Box>
						</div>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

export default Settings;
