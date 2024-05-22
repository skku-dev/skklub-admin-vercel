import {
	Box,
	Container,
	Stack,
	Typography,
	Modal,
	Unstable_Grid2 as Grid,
} from '@mui/material';
import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import axiosInterceptorInstance from '../../../axios/axiosInterceptorInstance';

const EditModal = ({ data, openEdit, setOpenEdit }) => {
	const [clubData, setClubData] = useState(null);

	useEffect(() => {
		if (openEdit) {
			axiosInterceptorInstance.get(`/club/${data.id}`).then((response) => {
				setClubData(response.data);
			});
		}
	}, [openEdit]);

	const handleClose = () => {
		setOpenEdit(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setClubData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const ModalBox = styled.div`
		/* modal css */
		width: 100%;
		height: 100%;
		padding: 1rem;
	`;

	return (
		<Modal
			open={openEdit}
			onClose={handleClose}
			sx={{
				overflow: 'scroll',
			}}
		>
			<ModalBox>
				<Stack spacing={3}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography variant="h4">정보 수정</Typography>
						<CancelIcon
							onClick={handleClose}
							sx={{
								cursor: 'pointer',
								fontSize: '2rem',
							}}
						/>
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
								<AccountProfileDetails
									data={clubData}
									handleInputChange={handleInputChange}
								/>
							</Grid>
						</Grid>
					</div>
				</Stack>
			</ModalBox>
		</Modal>
	);
};

export default EditModal;
