import React from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import AboutLayout from './components/About';
import FooterLayout from './components/Footer';
import ContactLayout from './components/Contacts';
import ShimmerUI from './components/ShimmerUI';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HeaderLayout from './components/Header';
import { Provider } from 'react-redux';
import store from './utilities/store';

const Applayout: React.FC = () => {
	return (
		<Provider store={store}>
			<React.Suspense fallback={<ShimmerUI />}>
				<HeaderLayout />
				<Outlet />
				<FooterLayout />
			</React.Suspense>
		</Provider>
	);
};

const router = createBrowserRouter([
	{
		path:'/pokelister',
		element:<Applayout />,
		errorElement: <Applayout />,
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
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router}/>);