import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
} from '@mui/material';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRef } from 'react';
import axios from 'axios';
import { LogoDev } from '@mui/icons-material';
import axiosInterceptorInstance from '../../../axios/axiosInterceptorInstance';

const ProfileCardContent = styled(CardContent)`
	display: flex;
	align-items: center;
	justify-content: center;
	> img {
		border-radius: 20px;
	}
`;

export const AccountProfile = ({ clubId }) => {
	const inputRef = useRef(null);

	const handleFileUploadClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleFileUpload = (e) => {
		let data = new FormData();
		let selectedFile = e.target.files[0];
		data.append('logo', selectedFile);

		if (selectedFile) {
			if (confirm('선택한 사진으로 동아리 썸네일을 수정하시겠습니까?')) {
				axiosInterceptorInstance
					.post(`/club/${clubId}/logo`, data, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then(() => {
						alert('사진이 성공적으로 수정되었습니다.');
					})
					.catch((err) => {
						console.log(err);
						alert('사진 수정에 실패했습니다.');
					});
			}
		}
	};

	return (
		<Card sx={{
			margin: 2,
		}}>
			<ProfileCardContent>
				<Image
					src="/assets/profile.jpeg"
					alt="club image"
					width={220}
					height={220}
					placeholder="blur"
					loading="lazy"
					blurDataURL="data:image/jpeg;base64,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"
				/>
			</ProfileCardContent>
			<Divider />

			<CardActions>
				<Button fullWidth variant="text" onClick={handleFileUploadClick}>
					Upload picture
				</Button>
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					hidden
					onChange={handleFileUpload}
				/>
			</CardActions>
		</Card>
	);
};
