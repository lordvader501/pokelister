import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import AboutLayout from './components/About/About';
import FooterLayout from './components/Footer/Footer';
import ContactLayout from './components/Contacts/Contacts';
import ShimmerUI from './components/ShimmerUI';
import ErrorLayout from './components/ErrorPage/Error';
import PokemonInfo from './components/PokemonInfo/PokemonInfo';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HeaderLayout from './components/Header/Header';
import { Provider } from 'react-redux';
import store from './utilities/Store/store';
import { useAppDispatch } from './utilities/hooks';
import { addItem } from './utilities/Store/pokemonSlice';
import Results from './utilities/fetchTypes';

const Applayout: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1281');
				const data: Results = await response.json();
				dispatch(addItem(data.results));
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchPokemon();
	}, []);
	return (
		<React.Suspense fallback={<ShimmerUI />}>
			<HeaderLayout />
			<Outlet />
			<FooterLayout />
		</React.Suspense>
	);
};

const router = createBrowserRouter([
	{
		path:'/pokelister',
		element:<Applayout />,
		errorElement: <ErrorLayout />,
		children:[
			{
				path:'/pokelister',
				element: <BodyLayout />,
			},
			{
				path:'/pokelister/about',
				element: <AboutLayout />,
			},
			{
				path:'/pokelister/contacts',
				element: <ContactLayout />,
			},
			{
				path: '/pokelister/pokemon/:id',
				element: <PokemonInfo />
			},
			{
				path: '*',
				element: <ErrorLayout />,
			},
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}><RouterProvider router={router}/></Provider>);