import { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	Typography,
	Tabs,
	Tab,
	Unstable_Grid2 as Grid,
} from '@mui/material';
import ClubInfoForm from './club-info-form';
import { useClubInfoApi, useEditClubInfoApi } from '@/hooks/use-user';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

export const AccountProfileDetails = ({ clubData }) => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	// 동아리 정보, 모집 정보 state
	const [infoValues, setInfoValues] = useState({});
	useEffect(() => {
		setInfoValues(clubData);
	}, [clubData]);

	// 수정 submit
	const [editClubInfo] = useEditClubInfoApi();
	const handleSubmit = (event) => {
		event.preventDefault();
		if (tabValue === 0) {
			editClubInfo(infoValues);
		}
	};

	return (
		<form autoComplete="off" noValidate onSubmit={handleSubmit}>
			<Card>
				<CardHeader subheader="자유롭게 정보를 수정해보세요!" />
				<CardContent sx={{ pt: 0 }}>
					<Box sx={{ m: -1.5 }}>
						<Box
							sx={{
								borderBottom: 1,
								borderColor: 'divider',
								margin: '0 15px',
							}}
						>
							<Tabs
								value={tabValue}
								onChange={handleTabChange}
								aria-label="basic tabs example"
							>
								<Tab label="동아리 정보" />
							</Tabs>
						</Box>
						<CustomTabPanel value={tabValue} index={0}>
							<ClubInfoForm values={infoValues} setValues={setInfoValues} />
						</CustomTabPanel>
					</Box>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: 'flex-end', padding: '15px' }}>
					<Button variant="contained" onClick={handleSubmit}>
						수정사항 저장
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};
