import React from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import AboutLayout from './components/About/About';
import FooterLayout from './components/Footer/Footer';
import ContactLayout from './components/Contacts/Contacts';
import ShimmerUI from './components/ShimmerUI';
import ErrorLayout from './components/ErrorPage/Error';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HeaderLayout from './components/Header/Header';
import { Provider } from 'react-redux';
import store from './utilities/Store/store';

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
				path: '*',
				element: <ErrorLayout />,
			},
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router}/>);