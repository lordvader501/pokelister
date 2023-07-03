import React from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import AboutLayout from './components/About';
import FooterLayout from './components/Footer';
import ContactLayout from './components/Contacts';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HeaderLayout from './components/Header';

const Applayout: React.FC = () => {
	return (
		<>
			<HeaderLayout />
			<Outlet />
			<FooterLayout />
		</>
	);
};
const router = createBrowserRouter([
	{
		path:'/pokelister/',
		element:<Applayout />,
		errorElement: <Applayout />,
		children:[
			{
				path:'/pokelister/',
				element: <BodyLayout />,
			},
			{
				path:'/about',
				element: <AboutLayout />,
			},
			{
				path:'/contacts',
				element: <ContactLayout />,
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.Suspense><RouterProvider router={router}/></React.Suspense>);