import React, { useEffect, useState } from 'react';
import Pokemon from '../utilities/PokeTypes';
import PaginationBottom from './Pagination/PaginationBottom';
import PaginationTop from './Pagination/PaginationTop';
import { useAppSelector } from '../utilities/Hooks/hooks';
import CardList from './CardlList/CardList';

const BodyLayout: React.FC = () => {
	const [pokemonsPerPage] = useState(20);
	const pokemonList = useAppSelector(store => store.pokemon.pokemonList);
	const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);
	const currentPage = useAppSelector(store => store.pageNum.currentPage);
	const searchPokemon = useAppSelector(store => store.findPokemon.searchPokemon);

	useEffect(()=> {
		const newFilteredPokemonList = pokemonList.filter((pokemon: Pokemon) =>
			pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
		);
		setFilteredPokemonList(newFilteredPokemonList);
	},[pokemonList,searchPokemon]);

	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

	return (
		<div className="container home">
			<PaginationTop
				filteredPokemonList={filteredPokemonList}
				currentPage={currentPage}
				pokemonsPerPage={pokemonsPerPage}
			/>
			<CardList currentPokemons={currentPokemons} />
			<PaginationBottom
				filteredPokemonList={filteredPokemonList}
				currentPage={currentPage}
				pokemonsPerPage={pokemonsPerPage}
			/>
		</div>
	);
};

export default BodyLayout;