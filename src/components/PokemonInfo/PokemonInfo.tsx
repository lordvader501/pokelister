import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PokemonInfoTypes from './PokemonInfoTypes';
import './PokemonInfo.scss';
import { addFavourites , removeFavourites , getFavourites} from '../../utilities/Auth/firebase';
import { UserContext } from '../../utilities/Contexts/User.context';

const PokemonInfo: React.FC = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState<PokemonInfoTypes>();
	const { currUser } = useContext(UserContext);
	const [currFav, setCurrFav] = useState({});

	useEffect(()=>{
		
		const fetchPokemonDetails = async () => {
			try {
				const fav = currUser && await getFavourites(currUser);
				if (fav) setCurrFav(fav);
				const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
				const data = await response.json();
				setPokemon(data);
				console.log(data);
			} catch (error) {
				console.log('Error: ', error);
			}
		};
		fetchPokemonDetails();
	},[currFav]);
	console.log(pokemon);
	
	const handleFavourites = async () => {
		if (currUser && id)
			await addFavourites(currUser, {[id]: 'https://pokeapi.co/api/v2/pokemon/'+id});
	};

	const handleRemove = async () => {
		if (currUser && id)
			await removeFavourites(currUser, id);
	};

	return (
		<div className='info-container'>
			<div className="info-div">
				<div className='poke-head'>
					<div className="poke-img">
						<img src={`https://github.com/lordvader501/pokelister/blob/test-white/src/assets/pokemons/shiny/${id}.png`} alt={id} loading='lazy'/>
					</div>
					<div className='name-fav-container'>
						<h1>{pokemon?.species.name}</h1>
						{ currUser && (id && !(id in currFav) ? (<button className='fav-button' onClick={handleFavourites}>➕ add to favourites</button>) :
							(<button className='fav-button danger' onClick={handleRemove}>➖ remove from Favourites</button>))
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonInfo;