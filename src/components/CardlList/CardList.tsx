import React from 'react';
import Card from './Card';
import Pokemon from '../../utilities/PokeTypes';
import './CardList.css';
// import { Link } from 'react-router-dom';

interface CardListProps {
  currentPokemons: Pokemon[];
}

const CardList: React.FC<CardListProps> = ({currentPokemons}) => {
	return (
		<ul className="pokemon-list">
			{currentPokemons.map((pokemon: Pokemon) => (
				<a href={'/pokelister/pokemon/'+pokemon.url.split('/')[6]} key={pokemon.name}><Card name={pokemon.name} url={pokemon.url} /></a>
			))}
		</ul>
	);
};

export default CardList;