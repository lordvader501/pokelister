import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonInfoTypes from './PokemonInfoTypes';
import './PokemonInfo.css';

const PokemonInfo: React.FC = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState<PokemonInfoTypes>();

	useEffect(()=>{
		
		const fetchPokemonDetails = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
				const data = await response.json();
				setPokemon(data);
				console.log(data);
			} catch (error) {
				console.log('Error: ', error);
			}
		};
		fetchPokemonDetails();
	},[]);
	console.log(pokemon);
	return (
		<div className='container info-container'>
			<div className="info-div">
				<div className='poke-head'>
					<div className="poke-img">
						<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={id} />
					</div>
					<h1>{pokemon?.species.name}</h1>
				</div>

			</div>
		</div>
	);
};

export default PokemonInfo;