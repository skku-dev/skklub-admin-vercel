import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginState = atom({
	key: 'LoginState',
	default: false,
	effects_UNSTABLE: [persistAtom],
});

export const UserState = atom({
	key: 'User',
	default: {
		name: '',
		role: '',
	},
	effects_UNSTABLE: [persistAtom],
});

// session time (30 minutes)
export const SessionTimeState = atom({
	key: 'SessionTimeState',
	default: 1800000,
	effects_UNSTABLE: [persistAtom],
});

export const SessionDialogState = atom({
	key: 'SessionDialogState',
	default: false,
	effects_UNSTABLE: [persistAtom],
});
