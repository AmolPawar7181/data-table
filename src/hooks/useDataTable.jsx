import React, {useEffect, useState} from 'react';
import {filterData} from '../utils/helpers';
// this hook handles the data
const useDataTable = (data) => {
	const [tableData, setTableData] = useState([...data]);
	const [currentTableData, setCurrentTableData] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [usersPerPage, setusersPerPage] = useState(10);

	useEffect(() => {
		setSlicedData();
	}, [tableData, currentPage]);

	// this will set the data for the current page
	// by slicing the whole data as per products per page count
	const setSlicedData = (data = []) => {
		let newData = data.length > 0 ? [...data] : [...tableData];

		const indexOfLastData = currentPage * usersPerPage;
		const indexOfFirstData = indexOfLastData - usersPerPage;
		// 10 users data as per the curretPage and usersPerPage
		let slicedData = newData.slice(indexOfFirstData, indexOfLastData);
		// update table data
		setCurrentTableData([...slicedData]);
		// update count for pagination
		setPageCount(newData.length);
	};
	// sets page count
	const setPageCount = (len) => {
		let pages = Math.ceil(len / usersPerPage);
		setNumberOfPages(pages);
	};
	// filters data based on search value
	const searchData = (str) => {
		setCurrentPage(1);
		const newData = filterData(tableData, str);
		// if users found matching search value
		// set data
		if (newData.length > 0) {
			setSlicedData(newData);
		} else {
			// set data to blank
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
		usersPerPage,
		setCurrentPage,
		searchData,
		setCurrentTableData,
	};
};

export default useDataTable;
