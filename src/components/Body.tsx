import React, { useEffect, useState } from 'react';
import Pokemon from '../utilities/PokeTypes.js';
import PaginationBottom from './Pagination/PaginationBottom.js';
import PaginationTop from './Pagination/PaginationTop.js';
import { useAppSelector,useAppDispatch} from '../utilities/hooks';
import { addItem } from '../utilities/Store/pokemonSlice.js';
import Results from '../utilities/fetchTypes.js';
import CardList from './CardlList/CardList.js';

const BodyLayout: React.FC = () => {
	const [next, setNext] = useState<string | null>(null);
	// const [searchPokemon, setSearchPokemon] = useState('');
	// const [currentPage ,setCurrentPage] = useState(1);
	const [pokemonsPerPage] = useState(50);
	const pokemonList = useAppSelector(store => store.pokemon.pokemonList);
	const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(store => store.pageNum.currentPage);
	const searchPokemon = useAppSelector(store => store.findPokemon.searchPokemon);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=320');
				const data: Results = await response.json();
				dispatch(addItem(data.results));
				setNext(data.next);
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchPokemon();
	}, []);

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
		<div className="container">
			<h1 className="title">Pokémon List</h1>
			<PaginationTop
				filteredPokemonList={filteredPokemonList}
				currentPage={currentPage}
				next={next}
				setNext= {setNext}
			/>
			<CardList currentPokemons={currentPokemons} />
			<PaginationBottom
				filteredPokemonList={filteredPokemonList}
				currentPage={currentPage}
				next={next}
				setNext= {setNext}
			/>
		</div>
	);
};

export default BodyLayout;