import { Box, Typography, TextField, CardContent, Button } from '@mui/material';
import styled from '@emotion/styled';
import CustomModal from '../common/custom-modal';
import { useEffect, useState } from 'react';

import axiosInterceptorInstance from '../../../axios/axiosInterceptorInstance';

import Image from 'next/image';

const StyledHeader = styled(Typography)({
	width: '90%',
	margin: '20px auto',
	color: '#FFF',
	fontSize: '28px',
	display: 'flex',
	'& > b': {
		color: '#80a4ff',
	},
});

const Warn = styled(Box)`
	width: 90%;
	margin: 0 auto;
	margin-bottom: 30px;
	color: #666;
`;

const InfoWrap = styled(Box)`
	border-radius: 16px;
	position: relative;
	margin: 20px auto 50px auto;
	width: 90%;
`;

const ThumbnailWrap = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	> img {
		border-radius: 25%;
	}
`;

const ThumbailImage = styled(Image)`
	border-radius: 25%;
	margin-bottom: 10px;
`;

const NoticeInfoModal = ({ data, setOpenEdit, openEdit }) => {
	const [noticeData, setNoticeData] = useState({});
	const [thumbnail, setThumbnail] = useState('/assets/profile.jpeg');
	const [files, setFiles] = useState(null);

	useEffect(() => {
		if (openEdit) {
			axiosInterceptorInstance
				.get(`/notice/prev/${data.noticeId}`)
				.then((response) => {
					setNoticeData(response.data);
					if (response.data.thumbnail) {
						setThumbnail(response.data.thumbnail.url);
					}

					if (response.data.files) {
						setFiles(response.data.files);
					}
				});
		}
	}, [data]);

	const handleClick = () => {
		axiosInterceptorInstance
			.post(`/notice/${data.noticeId}`, noticeData)
			.then((response) => {
				console.log(response);
				setOpenEdit(false);
			});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNoticeData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<CustomModal
			setModalOpen={setOpenEdit}
			handleClick={handleClick}
			modalOpen={openEdit}
			buttonTitle={'저장하기'}
		>
			<StyledHeader variant="h3">공지 내용</StyledHeader>

			<Warn>
				<Typography variant="body2">
					수정이 필요한 경우, 아래 수정하시고 저장 버튼을 눌러주세요.
				</Typography>
			</Warn>

			<InfoWrap>
				<ThumbnailWrap>
					<Image
						src={thumbnail}
						alt="club image"
						width={200}
						height={200}
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
					/>
					{/* change image button */}
					<Button
						variant="contained"
						component="label"
						sx={{
							marginTop: '10px',
						}}
					>
						이미지 변경
						<input type="file" hidden />
					</Button>
				</ThumbnailWrap>

				<TextField
					value={noticeData?.title || ''}
					onChange={handleInputChange}
					fullWidth
					label="제목"
					name="제목"
					required
					sx={{
						marginBottom: '20px',
					}}
				/>

				<TextField
					label="내용"
					name="내용"
					value={noticeData?.content || ''}
					onChange={handleInputChange}
					fullWidth
					multiline
					minRows={5}
					maxRows={5}
					sx={{
						marginBottom: '20px',
					}}
				/>

				<div>
					<div>
						{files?.map((file) => (
							<div key={file.name}>
								<Button
									onClick={() => {
										setFiles((prevFiles) =>
											prevFiles.filter(
												(prevFile) => prevFile.name !== file.name
											)
										);
									}}
								>
									{file.name}
								</Button>
							</div>
						))}
					</div>
					{/* <Button variant="contained" component="label">
						파일 추가
						<input type="file" hidden />
					</Button> */}
				</div>
			</InfoWrap>
		</CustomModal>
	);
};

export default NoticeInfoModal;
