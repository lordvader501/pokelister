import React from 'react';
import PaginationProps from './PaginatiionProps.js';
import { useAppDispatch} from '../../utilities/Hooks/hooks.js';
import './PaginationTop.css';
import { setCurrentPage } from '../../utilities/Store/pageSlice.js';

const Pagination: React.FC<PaginationProps> = ({ filteredPokemonList, currentPage, pokemonsPerPage }) => {
	const dispatch = useAppDispatch();
	const totalPages = Math.ceil(filteredPokemonList.length / pokemonsPerPage);
	

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			dispatch(setCurrentPage(currentPage - 1));
		}
	};
    
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setCurrentPage(currentPage + 1));
		}
	};
  
	return (
		<>
			{totalPages > 1 && (
				<div className="pagination pagination-top">
					<ul className="pagination-list button-space">
						<li
							className={`pagination-item ${currentPage === 1 ? 'page-end' : ''}`}
							onClick={goToPreviousPage}
						>
            &lt;
						</li>
						<li
							className={`pagination-item ${(currentPage === totalPages) ? 'page-end' : ''}`}
							onClick={goToNextPage}
						>
              &gt;
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default Pagination;