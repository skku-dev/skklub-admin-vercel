import { Box, Typography, Modal, Button } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const StyledBox = styled(Box)({
	position: 'absolute',
	top: '50px',
	left: '50%',
	transform: 'translate(-50%, 0)',
	backgroundColor: '#262626',
	// responsive width
	width: '60%',
	maxWidth: '800px',
	// responsive height
	maxHeight: '80%',
	overflow: 'auto',

	borderRadius: '10px',
	boxShadow: 24,
	padding: '20px',

	'@media (max-width: 425px)': {
		width: '90%',
	},
});

const CloseBtn = styled(Button)`
	position: absolute;
	top: 0px;
	right: 0px;
	font-size: 24px;
	font-weight: 200;
	border-radius: 36px;
	width: 60px;
	height: 60px;
	color: #888;
	text-align: center;
`;

const SaveBtn = styled(Button)`
	position: absolute;
	bottom: 20px;
	right: 60px;
	margin-top: 30px;
`;

export default function CustomModal({
	children,
	setModalOpen,
	modalOpen,
	buttonTitle,
	handleClick,
	files,
	setFiles,
}) {
	const handleCloseClick = () => {
		setModalOpen(false);
		if (files) {
			setFiles([]);
		}
	};

	return (
		<Modal
			open={modalOpen}
			onClose={handleCloseClick}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{ overflow: 'auto' }}
		>
			<StyledBox>
				<CloseBtn onClick={handleCloseClick}>
					<CloseIcon />
				</CloseBtn>

				{children}
				<SaveBtn variant="contained" onClick={handleClick}>
					<SaveAsIcon ml="5px" /> &nbsp; {buttonTitle}
				</SaveBtn>
			</StyledBox>
		</Modal>
	);
}
