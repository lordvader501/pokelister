import React, { useState } from 'react';
import PaginationProps from './PaginatiionProps.js';
import Results from '../../utilities/fetchTypes';
import { useAppDispatch} from '../../utilities/hooks';
import { addItem } from '../../utilities/Store/pokemonSlice.js';
import './PaginationBottom.css';
import { setCurrentPage } from '../../utilities/Store/pageSlice.js';

const Pagination: React.FC<PaginationProps> = ({ filteredPokemonList, currentPage, next, setNext }) => {
	const dispatch = useAppDispatch();
	const [pokemonsPerPage] = useState(50);
	let totalPages = Math.ceil(filteredPokemonList.length / pokemonsPerPage);
	const fetchPokemon = async () => {
		try {
			if(next!== '' && next !== null){
				const response = await fetch(next);
				const data:Results = await response.json();
				dispatch(addItem(data.results));
				totalPages = Math.ceil((filteredPokemonList.length + data.results.length) / pokemonsPerPage);
				setNext(data.next);
			}
		} catch (error) {
			console.log('Error:', error);
		}
	};
	const paginate = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber));
	};
    
	const goToPreviousPage = () => {
		if (currentPage > 1) {
			dispatch(setCurrentPage(currentPage - 1));
		}
	};
    
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setCurrentPage(currentPage + 1));
		}
		else if (currentPage === totalPages) {
			fetchPokemon();
		}
	};
	const renderPagination = () => {
		
		const pageNumbers = [];
		const maxPagesToShow = 5;
		const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
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
						className={`pagination-item down-arrow ${currentPage === 1 ? 'disabled' : ''}`}
						onClick={goToPreviousPage}
					>
              &lt;
					</li>
					{renderPagination()}
					<li
						className={`pagination-item down-arrow ${((currentPage === totalPages)&& (next===null)) ? 'disabled' : ''}`}
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