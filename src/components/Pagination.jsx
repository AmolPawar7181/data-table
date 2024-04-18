import PaginationBtn from './PaginationBtn';

const Pagination = ({numberOfPages, setCurrentPage, currentPage}) => {
	const pageCount = Array.from(Array(numberOfPages + 1).keys()).slice(1);
	const lastPage = pageCount[pageCount.length - 1];
	const firstPage = pageCount[0];

	return (
		<>
			{pageCount && (
				<div className='flex justify-evenly md:justify-start md:gap-6 w-full -space-x-px rtl:space-x-reverse text-sm h-8'>
					<PaginationBtn
						txt={'<<'}
						isActive={false}
						isDisabled={currentPage === firstPage}
						onClick={() => setCurrentPage(firstPage)}
						className='first-page'
					/>
					<PaginationBtn
						txt={'<'}
						isActive={false}
						isDisabled={currentPage === firstPage}
						onClick={() => setCurrentPage(currentPage - 1)}
						className='previous-page'
					/>
					{pageCount.map((item, index) => {
						return (
							<PaginationBtn
								key={item}
								txt={index + 1}
								isActive={currentPage === index + 1}
								onClick={() => setCurrentPage(item)}
								className={'page-' + item}
							/>
						);
					})}

					<PaginationBtn
						txt={'>'}
						isDisabled={currentPage === lastPage}
						onClick={() => setCurrentPage(currentPage + 1)}
						className='next-page'
					/>
					<PaginationBtn
						txt={'>>'}
						isDisabled={currentPage === lastPage}
						onClick={() => setCurrentPage(lastPage)}
						className='last-page'
					/>
				</div>
			)}
		</>
	);
};

export default Pagination;
