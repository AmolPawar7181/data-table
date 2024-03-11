import React from 'react';

const CheckBox = ({isChecked, id, setOptionSelected}) => {
	return (
		<div className='flex items-center'>
			<input
				id='checkbox-table-search-1'
				type='checkbox'
				className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
				checked={isChecked}
				onChange={(e) => setOptionSelected(e.target.checked, id)}
			/>
			<label htmlFor='checkbox-table-search-1' className='sr-only'>
				checkbox
			</label>
		</div>
	);
};

export default CheckBox;
