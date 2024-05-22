import CogIcon from '@heroicons/react/24/solid/CogIcon';
import InfoIcon from '@heroicons/react/24/solid/NewspaperIcon';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';

// admin
// 0: show to all users
// 1: show to admin only
// 2: show to user only

export const items = [
	{
		title: '내 계정 관리',
		path: '/account',
		admin: 2,
		icon: (
			<SvgIcon fontSize="small">
				<UserIcon />
			</SvgIcon>
		),
	},
	{
		title: '동아리 관리',
		path: '/clubs',
		admin: 1,
		icon: (
			<SvgIcon fontSize="small">
				<UsersIcon />
			</SvgIcon>
		),
	},
	{
		title: '동아리 등록',
		path: '/registration',
		admin: 1,
		icon: (
			<SvgIcon fontSize="small">
				<UserPlusIcon />
			</SvgIcon>
		),
	},
	{
		title: '공지 관리',
		path: '/notices',
		admin: 1,
		icon: (
			<SvgIcon fontSize="small">
				<InfoIcon />
			</SvgIcon>
		),
	},
	{
		title: '설정',
		path: '/settings',
		admin: 0,
		icon: (
			<SvgIcon fontSize="small">
				<CogIcon />
			</SvgIcon>
		),
	},
	// {
	//   title: "Login",
	//   path: "/auth/login",
	//   icon: (
	//     <SvgIcon fontSize="small">
	//       <LockClosedIcon />
	//     </SvgIcon>
	//   ),
	// },

	// {
	//   title: "Error",
	//   path: "/404",
	//   icon: (
	//     <SvgIcon fontSize="small">
	//       <XCircleIcon />
	//     </SvgIcon>
	//   ),
	// },
];
