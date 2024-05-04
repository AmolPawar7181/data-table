import React from 'react';
import CheckBox from './CheckBox';

const TableBody = ({
	body,
	headers,
	setOptionSelected,
	rowActions,
	handleRowEdit,
}) => {
	// if no users found
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
					className={` border-b  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 ${
						row.isChecked
							? 'bg-gray-100 dark:bg-gray-600 dark:text-gray-100'
							: 'bg-white dark:bg-gray-800'
					}`}
				>
					<td className='w-4 p-4'>
						<CheckBox
							isChecked={row.isChecked}
							id={row.id}
							setOptionSelected={setOptionSelected}
						/>
					</td>
					{/* Headers with respective actions */}
					{headers.map((header) => {
						// to avoid extra empty column
						if (header !== 'actions') {
							return (
								<td key={header} className='px-6 py-4'>
									{/* showing input inline if isEditing
										else normal text
									*/}
									{row.isEditing ? (
										<input
											className='border border-gray-500 px-1 text-gray-500'
											value={row[header]}
											placeholder={header}
											name={header}
											onChange={(e) => handleRowEdit(row.id, e.target)}
										/>
									) : (
										<span>{row[header]}</span>
									)}
								</td>
							);
						}
					})}
					<td className='px-6 py-4'>
						<div className='flex'>
							{/* action buttons like edit, save, delete */}
							{rowActions.map((action) => {
								return (
									<button
										className={`${action.action} m-1 visible cursor-pointer ${
											row.isEditing
												? action.action === 'save'
													? 'visible'
													: action.action === 'delete'
													? 'visible'
													: 'hidden'
												: action.action === 'edit'
												? 'visible'
												: action.action === 'delete'
												? 'visible'
												: 'hidden'
										}`}
										key={action.action}
										onClick={() => {
											action.event(row.id);
										}}
									>
										<action.icon />
									</button>
								);
							})}
						</div>
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
