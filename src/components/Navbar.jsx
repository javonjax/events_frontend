import '../assets/Navbar/styles.css';
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navLinks = ['Home', 'Music', 'Sports', 'Food', 'Family', 'Arts'];
  const [activeLink, setActiveLink] = useState('Home');
  const route = useLocation();
  const navbarLinksRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const accountsDropdownRef = useRef(null);
  const accountsLinksRef = useRef(null);

  // Add event listener to close dropdown menus when the navbar is mounted.
  useEffect(() => {
    const handleCloseDropdowns = (e) => {
      const elem = e.target;
      if(!elem.closest('.navbar-hamburger-menu')) {
        if (navbarLinksRef.current) {
          navbarLinksRef.current.className = 'navbar-links';
        }
        hamburgerMenuRef.current.className = 'navbar-hamburger-menu';
      }

      if(!elem.closest('.accounts-dropdown-button')) {
        accountsDropdownRef.current.className = 'accounts-dropdown-button';
        accountsLinksRef.current.className = 'accounts-dropdown-links';
      }
    };

    window.addEventListener('click', handleCloseDropdowns);
  }, []);

  const handleHamburgerMenuDisplay = () => {
    const navLinks = navbarLinksRef.current.className;
    const hamburgerIcon = hamburgerMenuRef.current.className;

    // Set appropriate styling when the hamburger menu is opened and reset it when closed.
    if (navLinks === 'navbar-links') {
      console.log('on');
      navbarLinksRef.current.className += ' responsive';
      hamburgerMenuRef.current.className += ' responsive';
    } else {
      console.log('off');
      navbarLinksRef.current.className = 'navbar-links';
      hamburgerMenuRef.current.className = 'navbar-hamburger-menu';
    }
  };

  const handleAccountDropdownDisplay = () => {
    const accountsMenu = accountsDropdownRef.current.className;

    // Set appropriate styling when the dropdown menu is opened and reset it when closed.
    if (accountsMenu === 'accounts-dropdown-button') {
      accountsDropdownRef.current.className += ' responsive';
      accountsLinksRef.current.className += ' responsive';
    } else {
      accountsDropdownRef.current.className = 'accounts-dropdown-button';
      accountsLinksRef.current.className = 'accounts-dropdown-links';
    }
  };

  // const handleCloseDropdown = (e) => {
  //   if(!e.target.closest('.navbar-hamburger-menu')) {
  //     console.log('doesnt match')
  //     navbarLinksRef.current.className = 'navbar-links';
  //     hamburgerMenuRef.current.className = 'navbar-hamburger-menu';
  //   }
  // };

  return (
    <>
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-home">
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
        <div className="navbar-quick-nav">
          <button
            className="navbar-hamburger-menu"
            ref={hamburgerMenuRef}
            onClick={() => handleHamburgerMenuDisplay()}
          >
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
          </button>
          <div className="navbar-links" ref={navbarLinksRef}>
            {navLinks.map((link) => {
              let destination = link.toLowerCase();
              if (link === 'Home') {
                destination = '/';
              }
              return (
                <NavLink to={destination} key={link}>
                  {link}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..."></input>
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="navbar-accounts">
          <button
            ref={accountsDropdownRef}
            className="accounts-dropdown-button"
            onClick={handleAccountDropdownDisplay}
          >
            <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} />
          </button>
          <div className="accounts-dropdown-links" ref={accountsLinksRef}>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
