'use client';

import Head from 'next/head';
import {
	Box,
	Container,
	Stack,
	Typography,
	Unstable_Grid2 as Grid,
} from '@mui/material';
import { AccountProfile } from '@/components/account/account-profile';
import { AccountProfileDetails } from '@/components/account/account-profile-details';
import { useEffect, useState } from 'react';
import axiosInterceptorInstance from '../../../../axios/axiosInterceptorInstance';
import { useRecoilState } from 'recoil';
import { UserState } from '@/utils/recoil/atoms';

const Account = () => {
	const [user, setUser] = useRecoilState(UserState);
	const [clubData, setClubData] = useState(null);

	useEffect(() => {
		axiosInterceptorInstance
			.get(`/club/my`)
			.then((res) => {
				setClubData(res.data);
				window.localStorage.setItem(
					'presidentContact',
					res.data.presidentContact
				);
				window.localStorage.setItem('presidentName', res.data.presidentName);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setClubData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<>
			<Head>
				<title>내 계정 관리</title>
			</Head>
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
							<Typography variant="h4">
								<b style={{ color: '#80A4FF' }}>
									{'[ '}
									{user.name ? user.name : '동아리'}
									{' ]  '}
								</b>
								정보 수정
							</Typography>
						</div>
						<div>
							<Grid container spacing={3}>
								<Grid xs={12} md={6} lg={4}>
									<AccountProfile
										url={clubData?.logo?.url}
										clubId={clubData?.id}
									/>
								</Grid>
								<Grid xs={12} md={6} lg={8}>
									<AccountProfileDetails clubData={clubData} />
								</Grid>
							</Grid>
						</div>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

export default Account;
