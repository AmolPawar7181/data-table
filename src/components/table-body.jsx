import React from 'react';
import CheckBox from './CheckBox';

const TableBody = ({body, headers, setOptionSelected}) => {
	if (body.length === 0)
		return (
			<tbody>
				<tr>
					<td>No records found!</td>
				</tr>
			</tbody>
		);

	return (
		<tbody>
			{body.map((row) => (
				<tr
					key={row.id}
					className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
				>
					<td className='w-4 p-4'>
						<CheckBox
							isChecked={row.isChecked}
							id={row.id}
							setOptionSelected={setOptionSelected}
						/>
					</td>
					{headers.map((header) => {
						if (row[header]) {
							return (
								<td key={header} className='px-6 py-4'>
									{row[header]}
								</td>
							);
						}
					})}
					<td className='px-6 py-4'>
						<a
							href='#'
							className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
						>
							Edit
						</a>
					</td>
					{/* <th
						scope='row'
						className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
					>
						{row.name}
					</th>
					<td className='px-6 py-4'>{row.email}</td>
					<td className='px-6 py-4'>{row.role}</td>
					 */}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
