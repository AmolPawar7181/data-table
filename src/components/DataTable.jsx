import React, {useEffect, useState} from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';
import TableSearch from './table-search';
import useDataTable from '../hooks/useDataTable';
import {DeleteIcon, EditIcon, SaveIcon} from './Icons';

const DataTable = ({headers, body}) => {
	// this hook manages the data
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

	const [searchValue, setSearchValue] = useState('');
	const [isAllSelected, setIsAllSelected] = useState(false);

	// set option selected
	const setOptionSelected = (checked, option) => {
		const newData = [...currentTableData];
		// selects all the options
		if (option === -1) setIsAllSelected(checked);
		// adds isChecked property to the object
		// so we can use it later in the JSX
		newData.map((row) => {
			if (row.id === option) row.isChecked = checked;
			else if (option === -1) row.isChecked = checked;
		});
		// sets new data for the table
		setCurrentTableData([...newData]);
	};
	// delete selected options
	const deleteSelectedOptions = () => {
		const newData = tableData.filter((row) => !row.isChecked);
		setTableData([...newData]);
		if (isAllSelected) {
			setIsAllSelected(false);
		}
	};
	// delete single row
	const deleteRow = (index) => {
		setOptionSelected(true, index);
		deleteSelectedOptions();
	};
	// set row on edit mode
	const setIsEditRow = (index) => {
		const newData = [...currentTableData];
		newData.map((row) => {
			if (row.id === index) row.isEditing = true;
		});

		setCurrentTableData([...newData]);
	};
	// save the data in the row
	const saveRow = (index) => {
		const newData = [...currentTableData];
		newData.map((row) => {
			if (row.id === index) {
				// checks if there are any empty inputs in a row
				const rowResult = doesObjHasEmptyValues(row);
				if (!rowResult.isInValid) {
					row.isEditing = false;
				} else {
					alert('Please enter value in ' + rowResult.rowName);
				}
			}
		});
		setCurrentTableData([...newData]);
	};
	// checks of obj has any empty values
	const doesObjHasEmptyValues = (obj) => {
		let output = {isInValid: false, rowName: ''};
		for (let prop in obj) {
			if (obj[prop].length === 0) {
				output.isInValid = true;
				output.rowName = prop;
				break;
			}
		}
		return output;
	};
	// edit row
	const handleRowEdit = (id, target) => {
		const newData = [...currentTableData];
		newData.map((row) => {
			if (row.id == id) {
				row[target.name] = target.value;
			}
		});

		setCurrentTableData([...newData]);
	};
	// actions will be used to assign the
	// event to the buttons
	const actions = [
		{
			action: 'edit',
			event: setIsEditRow,
			icon: EditIcon,
		},
		{
			action: 'save',
			event: saveRow,
			icon: SaveIcon,
		},
		{
			action: 'delete',
			event: deleteRow,
			icon: DeleteIcon,
		},
	];
	// search data
	useEffect(() => {
		searchData(searchValue);
	}, [searchValue]);

	return (
		<div className='max-w-[1280px] m-auto overflow-x-auto '>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg m-3 px-1 py-3 dark:text-gray-400 dark:bg-gray-900'>
				{currentTableData && (
					<>
						{/* Search Component */}
						<TableSearch
							searchValue={searchValue}
							setSearchValue={setSearchValue}
						/>
						<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
							{/* Table Header with select all button */}
							<TableHeader
								headers={headers}
								setOptionSelected={setOptionSelected}
								isChecked={isAllSelected}
							/>
							{/* list of all users */}
							<TableBody
								body={currentTableData}
								headers={headers}
								setOptionSelected={setOptionSelected}
								rowActions={actions}
								handleRowEdit={handleRowEdit}
							/>
						</table>
						{numberOfPages > 0 && (
							// footer contains button to delete all selected rows
							// and a Pagination
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
