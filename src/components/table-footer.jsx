import Pagination from './Pagination';

const TableFooter = ({
	currentPage,
	numberOfPages,
	setCurrentPage,
	deleteSelectedOptions,
}) => {
	return (
		<div className='flex flex-col sm:flex-row mt-4 px-3'>
			<div className='w-full sm:w-[30%] flex items-center'>
				{/* will delete all selected rows */}
				<button
					type='button'
					className='delete-selected text-white bg-red-500 font-semibold rounded-full py-1 px-4'
					onClick={() => deleteSelectedOptions()}
				>
					Delete Selected
				</button>
			</div>
			<div className='w-full sm:w-[70%] mt-3 sm:m-auto'>
				{/* Pagination */}
				<Pagination
					numberOfPages={numberOfPages}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
};

export default TableFooter;
