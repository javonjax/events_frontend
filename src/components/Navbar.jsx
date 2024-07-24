import '../assets/Navbar/styles.css';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navLinks = ['Music', 'Sports', 'Food', 'Family', 'Theater'];
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('Home');

    // Sets active style for the current location on the navbar.
    useEffect(() => {
        const currentPath = location.key;
        setActiveLink(currentPath);
    }, [location]);

    const handleNavClick = (link) => {
        setActiveLink(link);
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

            <div className='navbar-links'>

                {navLinks.map(link => 
                    <NavLink
                        to={`/${link.toLowerCase()}`}  
                        key={link}
                        className={activeLink === link ? 'active' : ''}
                        onClick={() => handleNavClick(link)}>

                    {link}

                    </NavLink>
                )}

            </div>  
        </div>
        </>
    );
};

export default Navbar;