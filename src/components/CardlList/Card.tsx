import React, { useEffect } from 'react';
import Pokemon from '../../utilities/PokeTypes';
import { typeslogo, noImg } from '../../utilities/constanats';

const Card: React.FC<Pokemon> = ({ name, url }) => {
  const [types, setTypes] = React.useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTypes(data.types.map((type: any) => type.type.name));
      } catch (error) {
        console.log('Error: ', error);
      }
    })();
  }, []);
  return (
    <li className="pokemon-item">
      <div className="poke-img-container">
        <img
          className="pokemon-image"
          src={`https://img.pokemondb.net/sprites/home/normal/2x/${name}.jpg`}
          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split('/')[6]}.png`}
          // src={`https://raw.githubusercontent.com/lordvader501/pokelister/test-white/src/assets/pokemons/shiny/${url.split('/')[6]}.png`}
          alt={name}
          style={{ width: '100%', height: '100%', mixBlendMode: 'darken' }}
          onError={(event) => {
            (event.target as HTMLImageElement).src = noImg;
            (event.target as HTMLImageElement).style.height = '178px';
            (
              event as React.SyntheticEvent<HTMLImageElement, Event>
            ).currentTarget.onerror = null;
          }}
        />
      </div>
      <p style={{ textAlign: 'center', width: '100%', whiteSpace: 'pre-line' }}>
        {url.split('/')[6]}. {name}
      </p>
      <div className="poke-types">
        {types.map((type: string) => {
          if (type === 'grass')
            return (
              <img
                key={type}
                src={typeslogo.grass}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'poison')
            return (
              <img
                key={type}
                src={typeslogo.poison}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'fire')
            return (
              <img
                key={type}
                src={typeslogo.fire}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'water')
            return (
              <img
                key={type}
                src={typeslogo.water}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'bug')
            return (
              <img
                key={type}
                src={typeslogo.bug}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'normal')
            return (
              <img
                key={type}
                src={typeslogo.normal}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'electric')
            return (
              <img
                key={type}
                src={typeslogo.electric}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'ground')
            return (
              <img
                key={type}
                src={typeslogo.ground}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'fairy')
            return (
              <img
                key={type}
                src={typeslogo.fairy}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'fighting')
            return (
              <img
                key={type}
                src={typeslogo.fighting}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'psychic')
            return (
              <img
                key={type}
                src={typeslogo.psychic}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'rock')
            return (
              <img
                key={type}
                src={typeslogo.rock}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'steel')
            return (
              <img
                key={type}
                src={typeslogo.steel}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'ice')
            return (
              <img
                key={type}
                src={typeslogo.ice}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'ghost')
            return (
              <img
                key={type}
                src={typeslogo.ghost}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'dragon')
            return (
              <img
                key={type}
                src={typeslogo.dragon}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'dark')
            return (
              <img
                key={type}
                src={typeslogo.dark}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          if (type === 'flying')
            return (
              <img
                key={type}
                src={typeslogo.flying}
                alt={type}
                style={{ width: '30px' }}
              />
            );
          return null;
        })}
      </div>
    </li>
  );
};

export default Card;
