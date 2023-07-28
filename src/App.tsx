import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import AboutLayout from './components/About/About';
import FooterLayout from './components/Footer/Footer';
import ContactLayout from './components/Contacts/Contacts';
import ErrorLayout from './components/ErrorPage/Error';
import PokemonInfo from './components/PokemonInfo/PokemonInfo';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import HeaderLayout from './components/Header/Header';
import { Provider } from 'react-redux';
import store from './utilities/Store/store';
import { useAppDispatch } from './utilities/Hooks/hooks';
import { addItem } from './utilities/Store/pokemonSlice';
import Results from './utilities/fetchTypes';
import SignInAndSignUp from './components/SignInAndSignUp/SignInAndSignUp';
import { UserContext, UserProvider } from './utilities/Contexts/User.context';
import Favourites from './components/Favourites/Favourites';

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
		<div className="global-container">
			<HeaderLayout />
			<Outlet />
			<FooterLayout />
		</div>
	);
};

const router = createBrowserRouter([
	{
		path:'/',
		element:<Applayout />,
		errorElement: <ErrorLayout />,
		children:[
			{
				path:'/',
				element: <BodyLayout />,
			},
			{
				path:'/about',
				element: <AboutLayout />,
			},
			{
				path:'/contacts',
				element: <ContactLayout />,
			},
			{
				path:'/signin',
				Component: () => {
					const { currUser } = useContext(UserContext);
					const navigate = useNavigate();
					useEffect(() => {
						if (currUser) {
							navigate('/');
						}
					}, [currUser]);
					return !currUser && <SignInAndSignUp />;
				}
			},
			{
				path:'/favourites',
				Component: () => {
					const { currUser } = useContext(UserContext);
					return currUser && <Favourites />;
				}
			},
			{
				path: '/pokemon/:id',
				element: <PokemonInfo />
			},
			{
				path: '/pokelister',
				element: <BodyLayout />
			},
			{
				path: '*',
				element: <ErrorLayout />,
			},
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}><UserProvider><RouterProvider router={router}/></UserProvider></Provider>);