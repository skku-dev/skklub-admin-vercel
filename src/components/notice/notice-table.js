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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '@/components/clubManagement/edit-modal';
import DeleteModal from '@/components/clubManagement/delete-modal';
import { Edit } from '@mui/icons-material';

import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';
import NoticeAddModal from './notice-add-modal';
import NoticeDeleteModal from './notice-delete-modal';
import NoticeInfoModal from './notice-info-modal';
import formatTime from '@/utils/formatTime';
import { useRecoilState } from 'recoil';
import { UserState } from '@/utils/recoil/atoms';

const NoticeTable = () => {
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

	const [user, setUser] = useRecoilState(UserState);

	useEffect(() => {
		if (!data.length) {
			setIsLoading(true);
		} else {
			setIsRefetching(true);
		}

		// if (globalFilter === '') {
		// 	try {
		// 		axios
		// 			.get('/notice/prev/search/title', {
		// 				params: {
		// 					title: globalFilter,
		// 				},
		// 			})
		// 			.then((response) => {
		// 				setData(response.data.content);
		// 				setRowCount(response.data.totalElements);
		// 			});
		// 	} catch (error) {
		// 		setIsError(true);
		// 		console.error(error);
		// 		return;
		// 	}
		// 	setIsError(false);
		// 	setIsLoading(false);
		// 	setIsRefetching(false);
		// } else {
		if (user.role === 'ROLE_MASTER') {
			setRole('');
		}

		axios
			.get('/notice/prev', {
				params: {
					role: user.role,
					page: pagination.pageIndex,
					size: pagination.pageSize,
				},
			})
			.then((response) => {
				setData(response.data.content);
				setRowCount(response.data.totalElements);
			});

		setIsError(false);
		setIsLoading(false);
		setIsRefetching(false);
		// }
	}, [globalFilter, pagination.pageIndex, pagination.pageSize, isRefetching]);

	const columns = useMemo(
		() => [
			{
				header: '작성 날짜',
				accessorKey: 'createdAt',
				size: 50,
				// date format
				Cell: ({ renderedCellValue }) => {
					return formatTime(renderedCellValue);
				},
			},
			{
				header: '제목',
				accessorKey: 'title',
				size: 300,
			},
			{
				header: '작성자',
				accessorKey: 'writerName',
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
		enableGlobalFilter: false,
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
		muiSearchTextFieldProps: {
			placeholder: '제목 검색',
		},
		renderRowActions: ({ row, table }) => (
			<>
				<Box sx={{ display: 'flex', gap: '1rem' }}>
					<Tooltip title="Edit">
						<IconButton onClick={() => openModalEdit(row)}>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton
							color="error"
							onClick={() => openDeleteConfirmModal(row)}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</>
		),

		renderTopToolbarCustomActions: () => (
			<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
				<Button variant="contained" color="primary" onClick={openModalAdd}>
					공지 추가
				</Button>
			</Box>
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
				<NoticeAddModal
					openAdd={openAdd}
					setOpenAdd={setOpenAdd}
					setIsRefetching={setIsRefetching}
				/>
				<NoticeInfoModal
					data={rowData}
					openEdit={openEdit}
					setOpenEdit={setOpenEdit}
					setIsRefetching={setIsRefetching}
				/>
				<NoticeDeleteModal
					data={rowData}
					openDelete={openDelete}
					setOpenDelete={setOpenDelete}
					setIsRefetching={setIsRefetching}
				/>
			</div>
		</TableContainer>
	);
};

export default NoticeTable;
