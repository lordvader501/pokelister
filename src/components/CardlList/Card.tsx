import React from 'react';
import Pokemon from '../../utilities/PokeTypes';

const Card: React.FC<Pokemon> = ({ name, url }) => {
	return (
		<li className="pokemon-item">
			<div className='poke-img-container'>
				<img
					className="pokemon-image"
					src={`https://img.pokemondb.net/sprites/home/normal/2x/${name}.jpg`}
					alt={name}
					style={{width:'100%', height:'100%', mixBlendMode: 'darken'}}
					loading='lazy'
					key={url.split('/')[6]}
				/>
			</div>
			<p style={{textAlign: 'center', width: '100%', whiteSpace: 'pre-line'}}>{name}</p>
		</li>
	);
};

export default Card;