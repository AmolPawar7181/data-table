import React, {useEffect, useState} from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';
import TableSearch from './table-search';
import useDataTable from '../hooks/useDataTable';
import {DeleteIcon, EditIcon, SaveIcon} from './Icons';

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

	const [isAllSelected, setIsAllSelected] = useState(false);

	const setOptionSelected = (checked, option) => {
		const newData = [...currentTableData];
		if (option === -1) setIsAllSelected(checked);

		newData.map((row) => {
			if (row.id === option) row.isChecked = checked;
			else if (option === -1) row.isChecked = checked;
		});
		setCurrentTableData([...newData]);
	};

	const deleteSelectedOptions = () => {
		const newData = tableData.filter((row) => !row.isChecked);
		setTableData([...newData]);
		if (isAllSelected) {
			setIsAllSelected(false);
		}
	};

	const deleteRow = (index) => {
		setOptionSelected(true, index);
		deleteSelectedOptions();
	};

	const setIsEditRow = (index) => {
		const newData = [...currentTableData];

		newData.map((row) => {
			if (row.id === index) row.isEditing = true;
		});

		setCurrentTableData([...newData]);
	};

	const saveRow = (index) => {
		const newData = [...currentTableData];
		newData.map((row) => {
			if (row.id === index) {
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

	const handleRowEdit = (id, target) => {
		const newData = [...currentTableData];
		newData.map((row) => {
			if (row.id == id) {
				row[target.name] = target.value;
			}
		});

		setCurrentTableData([...newData]);
	};

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

	useEffect(() => {
		setSlicedData();
	}, []);

	useEffect(() => {
		searchData(search);
	}, [search]);

	return (
		<div className='max-w-[1280px] m-auto overflow-x-auto '>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg m-3 px-1 py-3 dark:text-gray-400 dark:bg-gray-900'>
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
								rowActions={actions}
								handleRowEdit={handleRowEdit}
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
