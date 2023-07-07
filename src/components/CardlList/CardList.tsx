import React from 'react';
import Card from './Card';
import Pokemon from '../../utilities/PokeTypes';
import './CardList.css';

interface CardListProps {
  currentPokemons: Pokemon[];
}

const CardList: React.FC<CardListProps> = ({currentPokemons}) => {
	return (
		<ul className="pokemon-list">
			{currentPokemons.map((pokemon: Pokemon) => (
				<Card name={pokemon.name} url={pokemon.url} key={pokemon.name}/>
			))}
		</ul>
	);
};

export default CardList;