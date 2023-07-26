import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PokemonInfoTypes from './PokemonInfoTypes';
import './PokemonInfo.scss';
import { addFavourites } from '../../utilities/Auth/firebase';
import { UserContext } from '../../utilities/Contexts/User.context';

const PokemonInfo: React.FC = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState<PokemonInfoTypes>();
	const { currUser } = useContext(UserContext);

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
	
	const handleFavourites = async () => {
		if (currUser && id)
			await addFavourites(currUser, {[id]: 'https://pokeapi.co/api/v2/pokemon/'+id});
	};

	return (
		<div className='container info-container'>
			<div className="info-div">
				<div className='poke-head'>
					<div className="poke-img">
						<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={id} />
					</div>
					<div className='name-fav-container'>
						<h1>{pokemon?.species.name}</h1>
						{ currUser  && id && <button className='fav-button' onClick={handleFavourites}>➕ add to favourites</button> }
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonInfo;