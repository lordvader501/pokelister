import React from 'react';
import ReactDOM from 'react-dom/client';
import BodyLayout from './components/Body';
import HeaderLayout from './components/Header';

const Applayout: React.FC = () => {
	return (
		<>
			<HeaderLayout />
			<BodyLayout />
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Applayout />);