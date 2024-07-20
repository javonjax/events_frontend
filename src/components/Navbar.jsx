import '../assets/Navbar/styles.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navLinks = ['Music', 'Sports', 'Food', 'Family', 'Theater'];

    const [activeLink, setActiveLink] = useState('Home');

    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return(
        <>
        <div className='container'>
            <NavLink to='/' className='home-nav' onClick={() => handleNavClick('Home')}>
                DoStuff.com
            </NavLink>
            <div className='search'>
                <input type="text" placeholder="Search..."></input>
                <input type="submit" value="Search"></input>
            </div>
            <div className='links'>
                {navLinks.map(link => 
                    <NavLink
                        to={`/${link.toLowerCase()}`}  
                        key={link}
                        className={activeLink === link ? 'active' : ''}
                        onClick={() => handleNavClick(link)}
                    >
                    {link}
                    </NavLink>
                )}
            </div>  
        </div>
        </>
    );
};

export default Navbar;