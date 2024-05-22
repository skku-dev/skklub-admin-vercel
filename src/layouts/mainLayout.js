'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import SideNav from '@/components/common/side-nav';
import { TopNav } from '@/components/common/top-nav';

import { useRecoilState } from 'recoil';
import { SessionTimeState, SessionDialogState } from '@/utils/recoil/atoms';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import axiosInterceptorInstance from '../../axios/axiosInterceptorInstance';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	[theme.breakpoints.up('lg')]: {
		paddingLeft: SIDE_NAV_WIDTH,
	},
}));

const LayoutContainer = styled('div')({
	display: 'flex',
	flex: '1 1 auto',
	flexDirection: 'column',
	width: '100%',
});

export const MainLayout = (props) => {
	const { children } = props;
	const pathname = usePathname();
	const [openNav, setOpenNav] = useState(false);

	const [openDialog, setOpenDialog] = useState(false);

	const [sessionTime, setSessionTime] = useRecoilState(SessionTimeState);
	const [sessionDialog, setSessionDialog] = useRecoilState(SessionDialogState);

	const handlePathnameChange = useCallback(() => {
		if (openNav) {
			setOpenNav(false);
		}
	}, [openNav]);

	const handleClose = () => {
		setOpenDialog(false);
	};

	const handleRefresh = () => {
		axiosInterceptorInstance
			.get('/refresh', {
				headers: {
					'refresh-token': window.localStorage.getItem('refresh'),
				},
			})
			.then((res) => {
				window.localStorage.setItem('key', res.headers['authorization']);
				setSessionTime(1800000);
				setOpenDialog(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(
		() => {
			handlePathnameChange();

			const timerTimeout = setInterval(() => {
				setSessionTime((prevTime) => prevTime - 1000);
			}, 1000);

			console.log(sessionTime);
			console.log(sessionDialog);

			if (sessionTime <= 300000 && sessionDialog === false) {
				setOpenDialog(true);
				setSessionDialog(true);
			}

			return () => clearTimeout(timerTimeout);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps

		[pathname]
	);

	return (
		<>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					sx={{
						marginTop: '1rem',
					}}
				>
					세션 시간을 연장하시겠습니까?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						연장하지 않으면 자동으로 로그아웃 됩니다.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="error">
						연장하지 않기
					</Button>
					<Button onClick={handleRefresh} autoFocus>
						연장하기
					</Button>
				</DialogActions>
			</Dialog>
			<TopNav onNavOpen={() => setOpenNav(true)} />
			<SideNav
				onClose={() => setOpenNav(false)}
				open={openNav}
				sessionTime={sessionTime}
			/>
			<LayoutRoot>
				<LayoutContainer>{children}</LayoutContainer>
			</LayoutRoot>
		</>
	);
};
