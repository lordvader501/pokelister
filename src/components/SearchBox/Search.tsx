import React from 'react';
import SearchProps from './SearchProps';
import './Search.css';

const Search:React.FC<SearchProps> = ({setCurrentPage, searchPokemon, setSearchPokemon}) => {
	
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(1);
		setSearchPokemon(event.target.value);
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