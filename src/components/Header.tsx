import React, { useEffect } from 'react';
import { Link }from 'react-router-dom';


const HeaderLayout: React.FC = () => {
	useEffect(() => {
		const navbar:HTMLElement |null = document.getElementById('nav-container');
		const sticky = navbar?.offsetTop || 0;

		const handleScroll = (): void => {
			if (navbar && window.scrollY >= sticky) {
				navbar.classList.add('sticky');
			} else if (navbar) {
				navbar.classList.remove('sticky');
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<header className="header">
			<div className="navdiv">
				<div id="nav-container">
					<nav className="navbar">
						<ul className="nav-list">
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/about">About</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/contacts">Contacts</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default HeaderLayout;