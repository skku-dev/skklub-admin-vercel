'use client';

import { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Stack,
	Divider,
	Grid,
	Typography,
	TextField,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Settings = () => {
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [passwordMatchError, setPasswordMatchError] = useState(false);

	const [inputValue, setInputValue] = useState({
		presidentName: '',
		presidentContact: '',
		password1: '',
		password2: '',
	});

	useEffect(() => {
		setInputValue({
			presidentName: window.localStorage.getItem('presidentName'),
			presidentContact: window.localStorage.getItem('presidentContact'),
			password1: '',
			password2: '',
		});
	}, []);

	const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
	const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

	const handleMouseDownPassword1 = (event) => {
		event.preventDefault();
	};

	const handleMouseDownPassword2 = (event) => {
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
			if (value !== inputValue.password1) {
				return true;
			}
			return false;
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
				<Container maxWidth="lg">
					<Stack spacing={3}>
						<div>
							<Typography variant="h4">설정 페이지</Typography>
						</div>
						<div>
							{/* Change password */}
							<Stack direction="row" spacing={2}>
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
