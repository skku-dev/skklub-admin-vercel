'use client';

import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import InfoIcon from '@mui/icons-material/Info';

import EditModal from '@/components/clubManagement/edit-modal';
import DeleteModal from '@/components/clubManagement/delete-modal';
import { Edit } from '@mui/icons-material';

import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';
import axiosInterceptorInstance from '../../../axios/axiosInterceptorInstance';

const RegisterTable = () => {
	const [data, setData] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefetching, setIsRefetching] = useState(false);

	const [rowCount, setRowCount] = useState(0);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});

	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const [globalFilter, setGlobalFilter] = useState('');
	const [rowData, setRowData] = useState(null);

	const [role, setRole] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!data.length) {
				setIsLoading(true);
			} else {
				setIsRefetching(true);
			}

			try {
				axiosInterceptorInstance
					.get('/pending', {
						params: {
							page: pagination.pageIndex,
							size: pagination.pageSize,
						},
					})
					.then((response) => {
						setData(response.data.content);
						setRowCount(response.data.totalElements);
					});
			} catch (error) {
				setIsError(true);
				console.error(error);
				return;
			}
			setIsError(false);
			setIsLoading(false);
			setIsRefetching(false);
		};

		fetchData();
	}, [
		pagination.pageIndex,
		globalFilter,
		pagination.pageSize,
		role,
		isRefetching,
	]);

	const columns = useMemo(
		() => [
			{
				header: '동아리 이름',
				accessorKey: 'clubName',
				size: 50,
				// date format
				// Cell: ({ renderedCellValue }) => {
				// 	return formatTime(renderedCellValue);
				// },
			},
			{
				header: '회장 이름',
				accessorKey: 'presidentName',
				size: 300,
			},
			{
				header: '회장 연락처',
				accessorKey: 'presidentContact',
				size: 50,
			},
		],
		[]
	);

	const openModalAdd = () => {
		setOpenAdd(true);
	};

	const openModalEdit = (row) => {
		setRowData(row.original);
		setOpenEdit(true);
	};

	const openDeleteConfirmModal = (row) => {
		setRowData(row.original);
		setOpenDelete(true);
	};

	const table = useMaterialReactTable({
		initialState: {
			showGlobalFilter: true,
		},
		enableGlobalFilter: true,
		enableColumnFilters: false,
		enableDensityToggle: false,
		enableFullScreenToggle: false,
		enableHiding: false,
		enableSorting: false,
		columns,
		data,
		manualFiltering: true,
		manualPagination: true,
		muiToolbarAlertBannerProps: isError
			? {
					color: 'error',
					children: 'Error loading data',
			  }
			: undefined,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		rowCount,
		state: {
			globalFilter,
			isLoading,
			pagination,
			showAlertBanner: isError,
			showProgressBars: isRefetching,
		},
		enableRowActions: true,
		renderRowActions: ({ row, table }) => (
			<>
				<Box sx={{ display: 'flex', gap: '1rem' }}>
					<Tooltip title="승낙">
						<IconButton onClick={() => openModalEdit(row)} color="success">
							<ThumbUpIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="거절">
						<IconButton
							color="error"
							onClick={() => openDeleteConfirmModal(row)}
						>
							<ThumbDownIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="자세히 보기">
						<IconButton onClick={() => openModalEdit(row)}>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</>
		),
	});

	const TableContainer = styled.div`
		width: 100%;
		height: 100%;
		padding: 1.2rem;
		position: relative;
	`;

	return (
		<TableContainer>
			<div>
				<MaterialReactTable table={table} />
			</div>
		</TableContainer>
	);
};

export default RegisterTable;
