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
import { useEffect, useRef, useState } from 'react';
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

async function compressImage(imageFile) {
	const options = {
		maxSizeMB: 0.5,
		maxWidthOrHeight: 500,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		return compressedFile;
	} catch (error) {
		console.log(error);
	}
}

export const AccountProfile = ({ url, clubId }) => {
	const inputRef = useRef(null);
	const [imageUrl, setImageUrl] = useState('/assets/profile.jpeg');

	const handleFileUploadClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	useEffect(() => {
		setImageUrl(url);
	}, [url]);

	const handleFileUpload = async (e) => {
		let data = new FormData();
		let selectedFile = e.target.files[0];
		let compressedBlob = await compressImage(selectedFile);
		let compressedFile = new File([compressedBlob], selectedFile.name);
		data.append('logo', compressedFile);

		if (selectedFile) {
			if (confirm('선택한 사진으로 동아리 썸네일을 수정하시겠습니까?')) {
				axiosInterceptorInstance
					.post(`/club/${clubId}/logo`, data, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((resp) => {
						const image_base =
							'https://s3.ap-northeast-2.amazonaws.com/skklub.develop/';
						url = image_base + resp.data.logoSavedName;
						setImageUrl(url);
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
		<Card>
			<ProfileCardContent>
				{imageUrl ? (
					<Image src={imageUrl} alt="club image" width={220} height={220} />
				) : (
					<Image
						src={'/assets/profile.jpeg'}
						alt="club image"
						width={220}
						height={220}
						priority={true}
					/>
				)}
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
