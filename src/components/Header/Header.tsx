import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import { LOGO } from '../../utilities/constanats';
import Search from '../SearchBox/Search';
import { UserContext } from '../../utilities/Contexts/User.context';
import { signOutUser } from '../../utilities/Auth/firebase';

const HeaderLayout: React.FC = () => {
  const currLocation = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const { currUser } = useContext(UserContext);

  useEffect(() => {
    const navbar: HTMLElement | null = document.getElementById('nav-container');
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

  const signOutHandler = async () => {
    await signOutUser();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="left-header">
        <div className="logo-container">
          <Link to="/">
            <img src={LOGO} alt="logo" className="logo" />
          </Link>
        </div>
        <Link to="/">
          <div className="site-title">
            <h1 className="title-text">PokéLister</h1>
          </div>
        </Link>
      </div>
      <div className="navdiv">
        <div
          className={`search-container ${!searchToggle ? 'hidden-search' : ''}`}
        >
          <Search />
        </div>
        <div
          className="search-btn"
          onClick={() => setSearchToggle(!searchToggle)}
        >
          {searchToggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              id="close"
            >
              <path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path>
            </svg>
          ) : (
            <svg
              className="searchIcon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              id="search"
            >
              <path
                d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"
                fill="#6c0700"
              ></path>
            </svg>
          )}
          <span style={searchToggle ? { display: 'none' } : {}}>search</span>
        </div>
        <div
          id="nav-container"
          className={`navcontainer ${menuOpen ? 'mobile-menu-open' : ''}`}
        >
          <nav className="navbar">
            <div
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={handleMenuToggle}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <ul className="nav-list">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currLocation.pathname === '/' ? 'active' : ''
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currLocation.pathname === '/about' ? 'active' : ''
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currLocation.pathname === '/contacts' ? 'active' : ''
                  }`}
                  to="/contacts"
                >
                  Contacts
                </Link>
              </li>
              {!currUser ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link signin ${
                      currLocation.pathname === '/signin' ? 'active' : ''
                    }`}
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        currLocation.pathname === '/favourites' ? 'active' : ''
                      }`}
                      to="/favourites"
                    >
                      Favourites
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
