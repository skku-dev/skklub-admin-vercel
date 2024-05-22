'use client';

import Head from 'next/head';
import {
	Box,
	Container,
	Stack,
	Typography,
	Unstable_Grid2 as Grid,
} from '@mui/material';
import { AccountProfile } from '@/components/clubRegistration/account-profile';
import { AccountProfileDetails } from '@/components/clubRegistration/account-profile-details';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterTable from '@/components/clubRegistration/register-table';

const Registration = () => {
	return (
		<>
			<AccountProfile />
			<AccountProfileDetails />
		</>
	);
};

export default Registration;
