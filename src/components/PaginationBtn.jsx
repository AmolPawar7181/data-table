import React from 'react';

const PaginationBtn = ({
	txt,
	isActive = false,
	isDisabled = false,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			type='button'
			className={`${isActive ? 'text-blue-400' : 'text-white bg-blue-400'}  ${
				isDisabled ? 'disabled:opacity-50' : ''
			} border border-blue-400  focus:ring-1 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm p-2.5 text-center inline-flex items-center `}
		>
			{txt}
		</button>
	);
};

export default PaginationBtn;
