import React from 'react';
import Pokemon from '../../utilities/PokeTypes';

const Card: React.FC<Pokemon> = ({ name, url }) => {
	return (
		<li className="pokemon-item">
			<div className='poke-img-container'>
				<img
					className="pokemon-image"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split('/')[6]}.png`}
					alt={name}
					style={{width:'100%', height:'100%'}}
				/>
			</div>
			<p style={{textAlign: 'center', width: '100%', whiteSpace: 'pre-line'}}>{name}</p>
		</li>
	);
};

export default Card;