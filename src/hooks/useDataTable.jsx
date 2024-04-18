import React, {useEffect, useState} from 'react';
import {filterData} from '../utils/helpers';

const useDataTable = (data) => {
	const [tableData, setTableData] = useState([...data]);
	const [currentTableData, setCurrentTableData] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [productsPerPage, setProductsPerPage] = useState(10);

	useEffect(() => {
		setSlicedData();
	}, [tableData, currentPage]);

	const setSlicedData = (data = []) => {
		let newData = data.length > 0 ? [...data] : [...tableData];

		const indexOfLastData = currentPage * productsPerPage;
		const indexOfFirstData = indexOfLastData - productsPerPage;
		let slicedData = newData.slice(indexOfFirstData, indexOfLastData);
		setCurrentTableData([...slicedData]);
		setPageCount(newData.length);
	};

	const setPageCount = (len) => {
		let pages = Math.ceil(len / productsPerPage);
		setNumberOfPages(pages);
	};

	const searchData = (str) => {
		setCurrentPage(1);
		const newData = filterData(tableData, str);

		if (newData.length > 0) {
			setSlicedData(newData);
		} else {
			setCurrentTableData([]);
			setPageCount(0);
		}
	};

	return {
		tableData,
		currentTableData,
		setTableData,
		setSlicedData,
		currentPage,
		numberOfPages,
		productsPerPage,
		setCurrentPage,
		searchData,
		setCurrentTableData,
	};
};

export default useDataTable;
