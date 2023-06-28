import React from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import ErrorLayout from './components/Error';
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
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router}/>);