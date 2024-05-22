import { Chip, Typography, Button } from '@mui/material';

import { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import axiosInterceptorInstance from '../../../axios/axiosInterceptorInstance';

const ClubSettings = ({ clubType, clubId }) => {
	const handleClubTypeClick = () => {
		if (clubType === '중앙동아리') {
			axiosInterceptorInstance
				.patch(`club/${clubId}/down`)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axiosInterceptorInstance
				.patch(`club/${clubId}/up`)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const StyledContainer = styled.div`
		margin-bottom: 2rem;
	`;

	const StyledButton = styled(Button)`
		margin-top: 1rem;
	`;

	return (
		<>
			<StyledContainer>
				<Typography>
					현재 동아리 분류:{' '}
					<Chip label={clubType} variant="outlined" color="primary" />
				</Typography>
				<StyledButton
					variant="contained"
					color="primary"
					onClick={handleClubTypeClick}
				>
					{clubType === '중앙동아리' ? '준중앙동아리' : '중앙동아리'}로 분류
					변경
				</StyledButton>
			</StyledContainer>
			<StyledContainer>
				<Typography>
					현재 동아리 보임 상태:{' '}
					<Chip label={'Coming soon'} variant="outlined" color="primary" />
				</Typography>
				<StyledButton variant="contained" color="primary" disabled>
					{clubType === '공개' ? '공개' : '숨김으'}로 변경
				</StyledButton>
			</StyledContainer>
		</>
	);
};

export default ClubSettings;
