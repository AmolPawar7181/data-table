import {SearchIcon} from './Icons';
const TableSearch = ({search, setSearch}) => {
	return (
		<div className='pb-4 bg-white dark:bg-gray-900'>
			<label htmlFor='table-search' className='sr-only'>
				Search
			</label>
			<div className='relative mt-1'>
				<div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none search-icon'>
					<SearchIcon />
				</div>
				<input
					type='text'
					id='table-search'
					className='block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Search for name,email,role'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default TableSearch;
