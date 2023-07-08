import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonInfo.css';

const PokemonInfo: React.FC = () => {
	const { id } = useParams();
	useEffect(()=>{
		fetch('https://pokeapi.co/api/v2/pokemon/'+id)
			.then(req => req.json()).then(req => console.log(req));
	},[]);
	return (
		<div className='container'></div>
	);
};

export default PokemonInfo;