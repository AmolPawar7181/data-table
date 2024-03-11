import React, {useEffect, useState} from 'react';

const useDataTable = () => {
	const [tableData, setTableData] = useState([]);

	const filterData = (data, keyword) => {
		// Convert keyword to lowercase for case-insensitive search
		const lowerKeyword = keyword.toLowerCase();

		// Filter the data array based on the keyword
		return data.filter((item) => {
			// Iterate over each key in the object
			for (let key in item) {
				// Check if the value of the current key contains the keyword
				if (item[key].toLowerCase().includes(lowerKeyword)) {
					// If keyword found in any key's value, return true to keep the item
					return true;
				}
			}
			// If keyword not found in any key's value, return false to filter out the item
			return false;
		});
	};

	return {tableData, setTableData, filterData};
};

export default useDataTable;
