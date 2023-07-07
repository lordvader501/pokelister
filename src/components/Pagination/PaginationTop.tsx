import React, { useState } from 'react';
import PaginationProps from './PaginatiionProps.js';
import Results from '../../utilities/fetchTypes';
import { useAppDispatch} from '../../utilities/hooks';
import { addItem } from '../../utilities/pokemonSlice.js';
import './PaginationTop.css';

const Pagination: React.FC<PaginationProps> = ({ filteredPokemonList, currentPage, next, setNext, setCurrentPage }) => {
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

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
    
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
		else if (currentPage === totalPages) {
			fetchPokemon();
		}
	};
  
	return (
		<div className="pagination pagination-top">
			{totalPages > 1 && (
				<ul className="pagination-list button-space">
					<li
						className={`pagination-item ${currentPage === 1 ? 'page-end' : ''}`}
						onClick={goToPreviousPage}
					>
              &lt;
					</li>
					<li
						className={`pagination-item ${((currentPage === totalPages)&& (next===null)) ? 'page-end' : ''}`}
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