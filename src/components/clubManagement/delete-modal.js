import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Modal,
} from '@mui/material';
import styled from '@emotion/styled';
import { useDeleteClubApi } from '@/hooks/use-user';

const DeleteModal = ({ data, openDelete, setOpenDelete, setIsRefetching}) => {
	const [deleteClub] = useDeleteClubApi();

	const handleClose = () => {
		setOpenDelete(false);
	};

	const handleDelete = () => {
		deleteClub(data.id);
        setOpenDelete(false);
        setIsRefetching(true);
	};

	const ModalBox = styled.div`
		/* modal css */
		width: 100%;
		height: 100%;
		padding: 1rem;
	`;

	return (
		<Dialog open={openDelete} onClose={handleClose}>
			<ModalBox>
				<DialogTitle>삭제</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{data?.name} 동아리를 삭제하시겠습니까?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>취소</Button>
					<Button onClick={handleDelete}>삭제</Button>
				</DialogActions>
			</ModalBox>
		</Dialog>
	);
};

export default DeleteModal;
