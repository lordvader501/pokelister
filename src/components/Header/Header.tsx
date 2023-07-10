import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { LOGO } from '../../utilities/constanats';
import Search from '../SearchBox/Search';

const HeaderLayout: React.FC = () => {
	const currLocation = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

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

	const handleMenuToggle = (): void => {
		setMenuOpen(!menuOpen);
	};
	console.log(currLocation.pathname);
	return (
		<header className="header">
			<div className="logo-container">
				<Link to='/pokelister'>
					<img src={LOGO} alt="logo" className='logo'/>
				</Link>
			</div>
			<Link to='/pokelister'>
				<div className="site-title">
					<h1 className="title-text">PokéLister</h1>
				</div>
			</Link>
			<div className="search-container">
				<Search />
			</div>
			<div className='navdiv'>
				<div id='nav-container' className={`navcontainer ${menuOpen ? 'mobile-menu-open' : ''}`}>
					<nav className='navbar'>
						<div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
							<div className="bar1"></div>
							<div className="bar2"></div>
							<div className="bar3"></div>
						</div>
						<ul className="nav-list">
							<li className="nav-item">
								<Link className={`nav-link ${(currLocation.pathname === '/pokelister') ? 'active':''}`} to="/pokelister">Home</Link>
							</li>
							<li className="nav-item">
								<Link className={`nav-link ${(currLocation.pathname === '/pokelister/about') ? 'active':''}`} to="/pokelister/about">About</Link>
							</li>
							<li className="nav-item">
								<Link className={`nav-link ${(currLocation.pathname === '/pokelister/contacts') ? 'active':''}`} to="/pokelister/contacts">Contacts</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default HeaderLayout;
