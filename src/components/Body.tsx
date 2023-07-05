import React, { useEffect, useState } from 'react';
import Pokemon from '../utilities/PokeTypes.js';
import Pagination from './Pagination';
import { useAppSelector,useAppDispatch} from '../utilities/hooks';
import { addItem } from '../utilities/pokemonSlice.js';
import Search from './Search.js';
import Results from '../utilities/fetchTypes.js';

const BodyLayout: React.FC = () => {
	const [next, setNext] = useState<string | null>(null);
	const [searchPokemon, setSearchPokemon] = useState('');
	const [currentPage ,setCurrentPage] = useState(1);
	const [pokemonsPerPage] = useState(50);
	const pokemonList = useAppSelector(store => store.pokemon.pokemonList);
	const dispatch = useAppDispatch();

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

	const filteredPokemonList = pokemonList.filter((pokemon: Pokemon) =>
		pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
	);
	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

	

	return (
		<div className="container">
			<h1 className="title">Pokémon List</h1>
			<Search setCurrentPage={setCurrentPage} searchPokemon={searchPokemon} setSearchPokemon={setSearchPokemon}/>
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
			<Pagination
				filteredPokemonList={filteredPokemonList}
				currentPage={currentPage}
				next={next}
				setNext= {setNext}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default BodyLayout;