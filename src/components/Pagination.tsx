import React, { useState } from 'react';
import PaginationProps from '../utilities/PaginatiionProps';

const Pagination: React.FC<PaginationProps> = ({ filteredPokemonList,currentPage ,setCurrentPage }) => {
	const [pokemonsPerPage] = useState(50);
	const totalPages = Math.ceil(filteredPokemonList.length / pokemonsPerPage);
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};
    
	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
    
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	const renderPagination = () => {
		
		const pageNumbers = [];
		const maxPagesToShow = 5;
		const halfMaxPagesToShow = Math.floor(maxPagesToShow / 3);
		let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
		let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

		if (totalPages <= maxPagesToShow) {
			startPage = 1;
			endPage = totalPages;
		} else if (currentPage <= halfMaxPagesToShow) {
			endPage = maxPagesToShow;
		} else if (currentPage + halfMaxPagesToShow >= totalPages) {
			startPage = totalPages - maxPagesToShow + 1;
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return (
			<ul className="pagination-list">
				{startPage > 1 && (
					<>
						<li className="pagination-item" onClick={() => paginate(1)}>
              1
						</li>
						<li className="pagination-item disabled">...</li>
					</>
				)}
				{pageNumbers.map((pageNumber) => (
					<li
						key={pageNumber}
						className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
						onClick={() => paginate(pageNumber)}
					>
						{pageNumber}
					</li>
				))}
				{endPage < totalPages && (
					<>
						<li className="pagination-item disabled">...</li>
						<li className="pagination-item" onClick={() => paginate(totalPages)}>
							{totalPages}
						</li>
					</>
				)}
			</ul>
		);
	};
  
	return (
		<div className="pagination">
			{totalPages > 1 && (
				<ul className="pagination-list">
					<li
						className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
						onClick={goToPreviousPage}
					>
              &lt;
					</li>
					{renderPagination()}
					<li
						className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
						onClick={goToNextPage}
					>
              &gt;
					</li>
				</ul>
			)}
		</div>
	);
};

export default Pagination;