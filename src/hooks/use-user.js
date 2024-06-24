const BASE_URL = process.env.NEXT_PUBLIC_DEV_URI;
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInterceptorInstance from '../../axios/axiosInterceptorInstance';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {
	SessionDialogState,
	SessionTimeState,
	UserState,
} from '@/utils/recoil/atoms';

export const useUserLoginApi = () => {
	const router = useRouter();
	const [user, setUser] = useRecoilState(UserState);
	const [sessionTime, setSessionTime] = useRecoilState(SessionTimeState);
	const [sessionDialog, setSessionDialog] = useRecoilState(SessionDialogState);

	const login = (id, pw) => {
		axios
			.post(`/user/login?username=${id}&password=${pw}`)
			.then((response) => {
				console.log(response.data);
				window.localStorage.setItem('key', response.headers['authorization']);
				window.localStorage.setItem(
					'refresh',
					response.headers['refresh-token']
				);
				window.localStorage.setItem('userid', response.data.id);
				window.localStorage.setItem('username', response.data.username);
				window.localStorage.setItem('role', response.data.role);
				setUser({
					name: response.data.username,
					role: response.data.role,
				});
				// 30 minutes
				setSessionTime(1800000);
				setSessionDialog(false);

				return response.data.role;
			})
			.then((role) => {
				if (
					role === 'ROLE_MASTER' ||
					role === 'ROLE_ADMIN_SEOUL_CENTRAL' ||
					role === 'ROLE_ADMIN_SUWON_CENTRAL'
				) {
					router.push('/clubs');
				} else {
					router.push('/account');
				}
			})
			.catch((error) => {
				console.log(error);
				alert('아이디나 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
			});
	};

	return [login];
};

export const useUserRefreshApi = () => {
	const [sessionTime, setSessionTime] = useRecoilState(SessionTimeState);
	const [sessionDialog, setSessionDialog] = useRecoilState(SessionDialogState);

	const refresh = () => {
		axiosInterceptorInstance
			.get('/refresh', {
				headers: {
					'refresh-token': window.localStorage.getItem('refresh'),
				},
			})
			.then((res) => {
				window.localStorage.setItem('key', res.headers['authorization']);
				setSessionTime(1800000);
				setSessionDialog(false);
				return true;
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	};

	return [refresh];
};

export const useUserLogoutApi = () => {
	const [user, setUser] = useRecoilState(UserState);
	const [sessionTime, setSessionTime] = useRecoilState(SessionTimeState);
	const [sessionDialog, setSessionDialog] = useRecoilState(SessionDialogState);

	const logout = () => {
		axiosInterceptorInstance
			.post(`/user/logout`, {
				withCredentials: true,
			})
			.then((response) => {
				window.localStorage.clear();
				setUser({
					name: '',
					role: '',
				});
				setSessionTime(0);
				setSessionDialog(false);

				window.location.href = '/';
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return [logout];
};

export const useUserEditApi = () => {
	const editUser = ({ name, pw, contact }) => {
		axiosInterceptorInstance
			.post(`/user/0?password=${pw}&name=${name}&contact=${contact}`)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return [editUser];
};

export const useClubInfoApi = () => {
	const [clubInfo, setClubInfo] = useState(null);
	useEffect(() => {
		const userid = window.localStorage.getItem('userid');
		const auth = window.localStorage.getItem('key');
		if (userid) {
			const getClubInfo = async () => {
				await axiosInterceptorInstance
					.get(`/club/my`, { withCredentials: true })
					.then((response) => {
						// console.log(response.data);
						setClubInfo(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			};
			getClubInfo();
		}
	}, []);

	return [clubInfo];
};

export const useClubInfoApiAdmin = (id) => {
	const [clubInfo, setClubInfo] = useState(null);
	useEffect(() => {
		if (id) {
			const getClubInfo = async () => {
				await axiosInterceptorInstance
					.get(`/club/${id}`, { withCredentials: true })
					.then((response) => {
						// console.log(response.data);
						setClubInfo(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			};
			getClubInfo();
		}
	}, []);

	return [clubInfoAdmin];
};

export const useEditClubInfoApi = () => {
	const editClubInfo = (values) => {
		if (values.name === '') {
			alert('동아리 이름을 입력해주세요.');
		} else if (values.briefActivityDescription === '') {
			alert('분류를 입력해주세요.');
		} else if (values.activityDescription === '') {
			alert('활동 설명을 입력해주세요.');
		} else if (values.clubDescription === '') {
			alert('동아리 설명을 입력해주세요.');
		} else {
			if (values.id) {
				let data = new FormData();
				data.append('clubName', values.name);
				data.append(
					'briefActivityDescription',
					values.briefActivityDescription
				);
				data.append('activityDescription', values.activityDescription || '');
				data.append('clubDescription', values.clubDescription || '');
				data.append('establishDate', values.establishDate || '');
				data.append('headLine', values.headLine || '');
				data.append(
					'mandatoryActivatePeriod',
					values.mandatoryActivatePeriod || ''
				);
				data.append('memberAmount', values.memberAmount || '');
				data.append('regularMeetingTime', values.regularMeetingTime || '');
				data.append('roomLocation', values.roomLocation || '');
				data.append('webLink1', values.webLink1 || '');
				data.append('webLink2', values.webLink2 || '');

				axiosInterceptorInstance
					.patch(`/club/${values.id}`, data, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						alert('정보가 수정되었습니다.');
						return res;
					})
					.catch((error) => {
						alert('정보 수정에 실패했습니다.');
						return error;
					});
			}
		}
	};

	return [editClubInfo];
};

export const useEditClubInfoApiAdmin = () => {
	const editClubInfoAdmin = (values) => {
		if (values.name === '') {
			alert('동아리 이름을 입력해주세요.');
		} else if (values.briefActivityDescription === '') {
			alert('분류를 입력해주세요.');
		} else if (values.activityDescription === '') {
			alert('활동 설명을 입력해주세요.');
		} else if (values.clubDescription === '') {
			alert('동아리 설명을 입력해주세요.');
		} else {
			if (values.id) {
				let data = new FormData();
				data.append('clubName', values.name);
				data.append(
					'briefActivityDescription',
					values.briefActivityDescription
				);
				data.append('activityDescription', values.activityDescription || '');
				data.append('clubDescription', values.clubDescription || '');
				data.append('establishDate', values.establishDate || '');
				data.append('headLine', values.headLine || '');
				data.append(
					'mandatoryActivatePeriod',
					values.mandatoryActivatePeriod || ''
				);
				data.append('memberAmount', values.memberAmount || '');
				data.append('regularMeetingTime', values.regularMeetingTime || '');
				data.append('roomLocation', values.roomLocation || '');
				data.append('webLink1', values.webLink1 || '');
				data.append('webLink2', values.webLink2 || '');

				axiosInterceptorInstance
					.patch(`/club/${values.id}`, data, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						alert('정보가 수정되었습니다.');
						return res;
					})
					.catch((error) => {
						alert('정보 수정에 실패했습니다.');
						return error;
					});
			}
		}
	};

	return [editClubInfoAdmin];
};

export const useClubRegisterApi = () => {
	const registerClub = (values) => {
		if (values.name === '') {
			alert('동아리 이름을 입력해주세요.');
		} else if (values.briefActivityDescription === '') {
			alert('분류를 입력해주세요.');
		} else if (values.activityDescription === '') {
			alert('활동 설명을 입력해주세요.');
		} else if (values.clubDescription === '') {
			alert('동아리 설명을 입력해주세요.');
		} else {
			if (userid) {
				axiosInterceptorInstance
					.post(
						`/club`,
						{
							clubName: values.name,
							briefActivityDescription: values.briefActivityDescription,
							activityDescription: values.activityDescription,
							clubDescription: values.clubDescription,
							establishDate: values.establishDate,
							headLine: values.headLine,
							mandatoryActivatePeriod: values.mandatoryActivatePeriod,
							memberAmount: values.memberAmount,
							regularMeetingTime: values.regularMeetingTime,
							roomLocation: values.roomLocation,
							webLink1: values.webLink1,
							webLink2: values.webLink2,
						},
						{
							withCredentials: true,
						}
					)
					.then((res) => console.log(res))
					.catch((error) => console.log(error));
			}
		}
	};

	return [registerClub];
};

export const useDeleteClubApi = () => {
	const deleteClub = (id) => {
		axiosInterceptorInstance
			.delete(`/club/${id}`)
			.then((res) => {
				return res;
			})
			.catch((error) => {
				alert('동아리 삭제에 실패했습니다.');
				return error;
			});
	};

	return [deleteClub];
};
