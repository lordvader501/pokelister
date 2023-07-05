import React from 'react';
import SearchProps from '../utilities/SearchProps';
const Search:React.FC<SearchProps> = ({setCurrentPage, searchPokemon, setSearchPokemon}) => {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(1);
		setSearchPokemon(event.target.value);
	};
	return (
		<input
			type="text"
			className="search-input"
			placeholder="Search Pokémon"
			value={searchPokemon}
			onChange={handleSearchChange}
		/>
	);
};

export default Search;