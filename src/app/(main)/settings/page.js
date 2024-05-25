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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import axiosInterceptorInstance from '../../../../axios/axiosInterceptorInstance';
import { error } from '@/utils/theme/colors';

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

	const [passwordMatchError, setPasswordMatchError] = useState(false);

	const [inputValue, setInputValue] = useState({
		presidentName: '',
		presidentContact: '',
		password1: '',
		password2: '',
	});

	useEffect(() => {
		setUserId(window.localStorage.getItem('userId'));
		setInputValue({
			presidentName: window.localStorage.getItem('presidentName'),
			presidentContact: window.localStorage.getItem('presidentContact'),
			password1: '',
			password2: '',
			passwordConfirm: '',
		});
	}, []);

	const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
	const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
	const handleClickShowPasswordConfirm = () =>
		setShowPasswordConfirm((show) => !show);

	const handleMouseDownPassword1 = (event) => {
		event.preventDefault();
	};

	const handleMouseDownPassword2 = (event) => {
		event.preventDefault();
		// match with password 1
	};

	const handleMouseDownPasswordConfirm = (event) => {
		event.preventDefault();
		// match with password 1
	};

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
	};

	const passwordChangeSubmit = () => {
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
			})
			.catch((error) => {
				alert(error);
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
												onMouseDown={handleMouseDownPasswordConfirm}
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
						<div>
							{/* Change password */}
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
								disabled
							>
								유저 정보 수정하기
							</Button>

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
															onMouseDown={handleMouseDownPassword1}
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
															onMouseDown={handleMouseDownPassword2}
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
									disabled
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
