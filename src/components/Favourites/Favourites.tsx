import React ,{useState, useEffect, useContext} from 'react';
import { getFavourites } from '../../utilities/Auth/firebase';
import { UserContext } from '../../utilities/Contexts/User.context';
import Pokemon from '../../utilities/PokeTypes';
import CardList from '../CardlList/CardList';
import ShimmerUI from '../ShimmerUI';

const Favourites: React.FC = () => {
	const [favourites,setFavourites] = useState<Pokemon[]>([]);
	const { currUser } = useContext(UserContext);
	const [isEmpty, setIsEmpty] = useState(true);

	useEffect(() => {
		const getFav = async () => {
			try {
				const fav = currUser && await getFavourites(currUser);
				if (fav){
					const urls = Object.values(fav);
					const responses = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
					const pokemonDetails:Pokemon[] = responses.map((data, index) => ({
						name: data.name,
						url: urls[index],
					}));
					if (pokemonDetails.length !== 0) {
						setFavourites(pokemonDetails);
						setIsEmpty(false);
					}
					else {
						setIsEmpty(true);
					}
				}
			} catch (error) {
				console.error('Error fetching Pokemon data:', error);
			}
			console.log(favourites);
		};
		getFav();
		const timer = setTimeout(() => {
			setIsEmpty(false);
		}, 1000);
		return () => { clearTimeout(timer);};
	}, []);
	console.log(favourites);
	return (
		<div className='container'>
			{isEmpty ? <ShimmerUI /> 
				: (
					<>
						<h1>Favourites</h1>
						{(favourites.length) ?
							<CardList currentPokemons={favourites} />
							: (
								<h3>⚠️ User currently doesn&apos;t have any favourites browse home and find which pokemon you like add add it to your favourites</h3>
							)
						}
					</>
				)
			}
		</div>
	);
};

export default Favourites;