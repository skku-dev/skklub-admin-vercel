import { useCallback, useEffect, useState } from 'react';
import { TextField, Unstable_Grid2 as Grid } from '@mui/material';
import { useClubInfoApi } from '@/hooks/use-user';

const ClubInfoForm = ({ values, setValues }) => {
	const handleChange = useCallback((event) => {
		setValues((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}, []);

	return (
		<>
			<Grid container spacing={3}>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="동아리 이름"
						name="name"
						onChange={handleChange}
						required
						value={values?.name || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="분류"
						name="briefActivityDescription"
						helperText="활동 키워드를 입력해주세요"
						onChange={handleChange}
						required
						value={values?.briefActivityDescription || ''}
					/>
				</Grid>
				<Grid xs={12} md={12}>
					<TextField
						fullWidth
						label="동아리 설명"
						name="clubDescription"
						helperText="동아리에 대해 자세히 설명해주세요"
						onChange={handleChange}
						required
						multiline
						maxRows={6}
						value={values?.clubDescription || ''}
					/>
				</Grid>
				<Grid xs={12} md={12}>
					<TextField
						fullWidth
						label="활동 설명"
						name="activityDescription"
						helperText="동아리 활동에 대해 자세히 설명해주세요"
						onChange={handleChange}
						required
						multiline
						maxRows={6}
						value={values?.activityDescription || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="설립연도"
						name="establishDate"
						onChange={handleChange}
						value={values?.establishDate || ''}
						placeholder="YYYY"
						type="number"
						maxLength={4}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="한줄 소개"
						name="headLine"
						onChange={handleChange}
						value={values?.headLine || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="의무 활동 기간"
						name="mandatoryActivatePeriod"
						onChange={handleChange}
						value={values?.mandatoryActivatePeriod || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="동아리 인원"
						name="memberAmount"
						onChange={handleChange}
						value={values?.memberAmount || ''}
						type="number"
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="정규 모임 시간"
						name="regularMeetingTime"
						onChange={handleChange}
						value={values?.regularMeetingTime || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="동아리 방 위치"
						name="roomLocation"
						onChange={handleChange}
						value={values?.roomLocation || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="관련 사이트 주소 1"
						name="webLink1"
						onChange={handleChange}
						value={values?.webLink1 || ''}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<TextField
						fullWidth
						label="관련 사이트 주소 2"
						name="webLink2"
						onChange={handleChange}
						value={values?.webLink2 || ''}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default ClubInfoForm;
