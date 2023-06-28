import React, { useEffect, useState } from 'react';
import Pokemon from '../utilities/PokeTypes.js';

const BodyLayout: React.FC = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [searchPokemon, setSearchPokemon] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage] = useState(50);
	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
				const data = await response.json();
				setPokemonList(data.results);
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchPokemon();
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPokemon(event.target.value);
	};

	const filteredPokemonList = pokemonList.filter((pokemon: Pokemon) =>
		pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
	);
	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);
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
		<div className="container">
			<h1 className="title">Pokémon List</h1>
			<input
				type="text"
				className="search-input"
				placeholder="Search Pokémon"
				value={searchPokemon}
				onChange={handleSearchChange}
			/>
			<ul className="pokemon-list">
				{currentPokemons.map((pokemon: Pokemon) => (
					<li className="pokemon-item" key={pokemon.name}>
						<img
							className="pokemon-image"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
							alt={pokemon.name}
						/>
						{pokemon.name}
					</li>
				))}
			</ul>
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
		</div>
	);
};

export default BodyLayout;