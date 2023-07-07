import React from 'react';
import Pokemon from '../../utilities/PokeTypes';

const Card: React.FC<Pokemon> = ({ name, url }) => {
	return (
		<li className="pokemon-item">
			<img
				className="pokemon-image"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split('/')[6]}.png`}
				alt={name}
			/>
			{name}
		</li>
	);
};

export default Card;