import React, {useEffect, useState} from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';
import TableSearch from './table-search';
import {filterData} from '../utils/helpers';
import useDataTable from '../hooks/useDataTable';

const DataTable = ({headers, body}) => {
	const {
		tableData,
		currentTableData,
		setTableData,
		setSlicedData,
		currentPage,
		numberOfPages,
		setCurrentPage,
		searchData,
		setCurrentTableData,
	} = useDataTable(body);
	const [search, setSearch] = useState('');
	//const [tableData, setTableData] = useState([...body]);

	// const [currentPage, setCurrentPage] = useState(1);
	// const [numberOfPages, setNumberOfPages] = useState(0);
	// const [productsPerPage, setProductsPerPage] = useState(10);

	const [filteredData, setFilteredData] = useState([]);
	const [isAllSelected, setIsAllSelected] = useState(false);

	// console.log(
	// 	'tableData ',
	// 	tableData,
	// 	currentTableData,
	// 	currentPage,
	// 	numberOfPages
	// );

	const setSlicedData1 = (fromData) => {
		let newData = [...fromData];

		const indexOfLastData = currentPage * productsPerPage;
		const indexOfFirstData = indexOfLastData - productsPerPage;
		let slicedData = newData.slice(indexOfFirstData, indexOfLastData);
		setTableData([...slicedData]);
		setPageCount(fromData.length);
		//console.log('tableData ', tableData);
	};

	// const setPageCount = (len) => {
	// 	let pages = Math.ceil(len / productsPerPage);
	// 	setNumberOfPages(pages);
	// };

	const setOptionSelected = (checked, option) => {
		console.log('setOptionSelected ', checked, option);
		const newData = [...currentTableData];
		if (option === -1) setIsAllSelected(checked);

		newData.map((row) => {
			if (row.id === option) row.isChecked = checked;
			else if (option === -1) row.isChecked = checked;
		});
		console.log('newData ', newData);
		setCurrentTableData([...newData]);
	};

	const deleteSelectedOptions = () => {
		const newData = tableData.filter((row) => !row.isChecked);
		//console.log('isAllSelected ', isAllSelected, newData, tableData);
		setTableData([...newData]);
		//setSlicedData([...newData]);
		if (isAllSelected) {
			//setCurrentPage(currentPage + 1);
			setIsAllSelected(false);
		}
		//console.log('newData ', newData);
	};

	useEffect(() => {
		setSlicedData();
	}, []);

	// useEffect(() => {
	// 	setSlicedData(search.length > 0 ? filteredData : body);
	// 	setIsAllSelected(false);
	// }, [currentPage]);

	useEffect(() => {
		//setCurrentPage(1);
		//if (search.length > 0) {
		searchData(search);
		//}
		// else {
		// 	setSlicedData(body);
		// 	setFilteredData([]);
		// }
	}, [search]);

	return (
		<div className='max-w-[1280px] m-auto overflow-x-auto '>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg m-3 px-1 py-3'>
				{currentTableData && (
					<>
						<TableSearch search={search} setSearch={setSearch} />
						<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
							<TableHeader
								headers={headers}
								setOptionSelected={setOptionSelected}
								isChecked={isAllSelected}
							/>
							<TableBody
								body={currentTableData}
								headers={headers}
								setOptionSelected={setOptionSelected}
							/>
						</table>
						{numberOfPages > 0 && (
							<TableFooter
								numberOfPages={numberOfPages}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								deleteSelectedOptions={deleteSelectedOptions}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default DataTable;
