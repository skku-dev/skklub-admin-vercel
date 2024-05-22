import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';

const CommonTable = ({
	data,
	columns,
	options,
	pagination,
	rowCount,
	globalFilter,
	isError,
	isLoading,
	isRefetching,
	setPagination,
	setGlobalFilter,
}) => {
	const table = useMaterialReactTable({
		data,
		columns,
		...options,
		onPaginationChange: setPagination, //hoist pagination state to your state when it changes
		//pagination options
		muiPaginationProps: {
			color: 'primary',
			shape: 'rounded',
			showRowsPerPage: false,
			variant: 'outlined',
		},
		paginationDisplayMode: 'pages',

		state: {
			pagination,
			globalFilter,
			showAlertBanner: isError,
			showProgressBars: isRefetching,
			isLoading,
			isError,
		},
		muiToolbarAlertBannerProps: isError
			? {
					color: 'error',
					children: 'Error loading data',
			  }
			: undefined,
		rowCount,
		onGlobalFilterChange: setGlobalFilter,
		manualFiltering: true, //turn off client-side filtering
		manualPagination: true,
	});

	return <MaterialReactTable table={table} />;
};

export default CommonTable;
