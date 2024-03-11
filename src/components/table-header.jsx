import React, {memo} from 'react';
import CheckBox from './CheckBox';

const TableHeader = ({headers, setOptionSelected, isChecked}) => {
	if (headers.length === 0) return <></>;
	return (
		<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
			<tr>
				<th scope='col' className='p-4'>
					<CheckBox
						isChecked={isChecked}
						setOptionSelected={setOptionSelected}
						id={-1}
					/>
				</th>
				{headers.map((header) => {
					return (
						<th key={header} scope='col' className='px-6 py-3'>
							{header}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

export default memo(TableHeader);
