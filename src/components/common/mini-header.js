import { useState } from 'react';
import { Button, Stack, SvgIcon, Typography } from '@mui/material';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import CustomModal from './custom-modal';
import NoticeInfoModal from '../notice/notice-info-modal';
import NoticeAddModal from '../notice/notice-add-modal';

export default function MiniHeader({ label, noticesSelection }) {
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => setModalOpen(false);

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			spacing={4}
		>
			<Stack spacing={1}>
				<Typography
					variant="h4"
					sx={{
						'@media (max-width: 425px)': {
							fontSize: '25px',
						},
					}}
				>
					{label}
				</Typography>
			</Stack>

			<div>
				<Button
					startIcon={
						<SvgIcon fontSize="small">
							<TrashIcon />
						</SvgIcon>
					}
					variant="contained"
					onClick={() => {
						handleOpen();
					}}
				>
					추가
				</Button>
				<Button
					sx={{
						marginLeft: '10px',
					}}
					startIcon={
						<SvgIcon fontSize="small">
							<PlusIcon />
						</SvgIcon>
					}
					variant="contained"
					color="error"
				>
					삭제
				</Button>
			</div>
			<NoticeAddModal
				handleClose={handleClose}
				modalOpen={modalOpen}
			/>
		</Stack>
	);
}
