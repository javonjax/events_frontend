import '../assets/Navbar/styles.css';
import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navLinks = ['Music', 'Sports', 'Food', 'Family', 'Arts'];
    const location = useLocation();
    const navbarLinksRef = useRef(null);
    const hamburgerMenuRef = useRef(null);
    const [activeLink, setActiveLink] = useState('Home');

    // Sets active style for the current location on the navbar.
    useEffect(() => {
        const currentPath = location.key;
        setActiveLink(currentPath);
    }, [location]);

    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    const handleHamburgerDisplay = () => {
        const navLinks = navbarLinksRef.current.className;
        const hamburgerIcon = hamburgerMenuRef.current.className;

        if (navLinks === 'navbar-links') {
            console.log('on');
            navbarLinksRef.current.className += ' responsive';
            hamburgerMenuRef.current.className += ' responsive';
        } 
        else {
            console.log('off');
            navbarLinksRef.current.className = 'navbar-links';
            hamburgerMenuRef.current.className = 'navbar-hamburger-menu';
        }
    };

    return(
        <>
        <div className='navbar-container'>

            <NavLink 
                to='/' 
                className='navbar-home' 
                onClick={() => handleNavClick('Home')}>

                DoStuff.com

            </NavLink>

            <div className='navbar-search'>
                <input type="text" placeholder="Search..."></input>
                <input type="submit" value="Search"></input>
            </div>

            <div className='navbar-quick-nav'>
                <button className='navbar-hamburger-menu' ref={hamburgerMenuRef} onClick={() => handleHamburgerDisplay()}>
                    <div className='burger-bar'></div>
                    <div className='burger-bar'></div>
                    <div className='burger-bar'></div>
                </button>

                <div className='navbar-links' ref={navbarLinksRef}>
                
                    {navLinks.map(link => 
                        <NavLink
                            to={`/${link.toLowerCase()}`}  
                            key={link}
                            className={activeLink === link ? 'active' : null}
                            onClick={() => handleNavClick(link)}>
                
                        {link}
                
                        </NavLink>
                    )}
                
                </div>
            </div>  
        </div>
        </>
    );
};

export default Navbar;