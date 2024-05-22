'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	Box,
	Button,
	Divider,
	Drawer as MuiDrawer,
	Stack as MuiStack,
	SvgIcon,
	Typography,
	Tooltip,
	useMediaQuery,
	IconButton,
} from '@mui/material';
import Image from 'next/image';
import { items } from '@/utils/sidebar-items';
import { SideNavItem } from './side-nav-item';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useUserLogoutApi } from '@/hooks/use-user';
import { formatMs } from '@/utils/formatMs';
import { useRecoilState } from 'recoil';
import { UserState } from '@/utils/recoil/atoms';

const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const LogoContainer = styled(Box)`
	display: inline-flex;
	height: 32px;
	width: 32px;
`;

const ProfileContainer = styled(Box)`
	align-items: center;
	background-color: rgba(255, 255, 255, 0.04);
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	margin-top: 16px;
	padding: 12px;
	font-family: 'GmarketMediumSans';
`;

const Drawer = styled(MuiDrawer)`
	& .MuiDrawer-paper {
		background-color: rgba(38, 38, 38, 1);
		color: #fff;
		width: 280px;
		border-right: 1px solid rgba(220, 220, 220, 0.5);
	}
`;

const Stack = styled(MuiStack)`
	list-style: none;
	padding: 24px 16px;
	margin: 0;
`;

const SideNav = (props) => {
	const { open, onClose } = props;
	const pathname = usePathname();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

	const [user, setUser] = useRecoilState(UserState);

	const [logout] = useUserLogoutApi();

	const handleClick = (e) => {
		e.preventDefault();
		logout();
	};

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			variant={lgUp ? 'permanent' : 'temporary'}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
		>
			<Container>
				<Box sx={{ p: 3 }}>
					<LogoContainer component={Link} href="/account">
						<Image src="/assets/skklub.png" width={30} height={30} alt="logo" />
					</LogoContainer>
					<ProfileContainer>
						<div>
							<Typography color="inherit" variant="subtitle1">
								{user.name ? user.name : '알수없음'}
							</Typography>
							<Typography color="neutral.400" variant="body2">
								남은 시간: {formatMs(props.sessionTime)}
							</Typography>
						</div>
						<Tooltip title="로그아웃" arrow>
							<IconButton onClick={handleClick}>
								<LogoutIcon
									color="primary"
									sx={{
										cursor: 'pointer',
										width: 20,
										height: 20,
									}}
								/>
							</IconButton>
						</Tooltip>
					</ProfileContainer>
				</Box>
				<Divider sx={{ borderColor: 'neutral.700' }} />
				<Stack component="nav" spacing={0.5}>
					{items.map((item) => {
						const active = item.path ? pathname === item.path : false;

						if (
							user.role === 'ROLE_MASTER' ||
							user.role === 'ROLE_ADMIN_SUWON_CENTRAL' ||
							user.role === 'ROLE_ADMIN_SEOUL_CENTRAL'
						) {
							if (item.admin === 1 || item.admin === 0) {
								return (
									<SideNavItem
										active={active.toString()}
										disabled={item.disabled}
										external={item.external}
										icon={item.icon}
										key={item.title}
										path={item.path}
										title={item.title}
									/>
								);
							}
						} else {
							if (item.admin === 2 || item.admin === 0) {
								return (
									<SideNavItem
										active={active.toString()}
										disabled={item.disabled}
										external={item.external}
										icon={item.icon}
										key={item.title}
										path={item.path}
										title={item.title}
									/>
								);
							}
						}
					})}
				</Stack>
			</Container>
		</Drawer>
	);
};

export default SideNav;
