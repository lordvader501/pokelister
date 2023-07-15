import React from 'react';
// import SearchProps from './SearchProps';
import './Search.css';
import { useAppDispatch, useAppSelector } from '../../utilities/Hooks/hooks';
import { setCurrentPage } from '../../utilities/Store/pageSlice';
import { setSearchPokemon } from '../../utilities/Store/searchSlice';

const Search:React.FC = () => {
	const searchPokemon = useAppSelector(store => store.findPokemon.searchPokemon);
	const dispatch = useAppDispatch();
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setCurrentPage(1));
		dispatch(setSearchPokemon(event.target.value));
		console.log(searchPokemon);
	};
	return (
		<input
			type="search"
			className="search-input"
			placeholder="Search Pokémon"
			value={searchPokemon}
			onChange={handleSearchChange}
		/>
	);
};

export default Search;