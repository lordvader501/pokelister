import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ErrorLayout = () => {
	const location = useLocation();
	const { error } = location.state || {};

	return (
		<div className='container'>
			{error ? (
				<>
          Error: {error.status} {error.statusText}
				</>
			) : (
				<>An unknown error occurred.</>
			)}
			<Link to='/pokelister'>
				<button>Home</button>
			</Link>
		</div>
	);
};

export default ErrorLayout;
