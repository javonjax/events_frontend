import '../assets/Navbar/styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // const navLinks = ['Music', 'Sports','Food', 'Comedy'];
    const navLinks = ['Music', 'Sports', 'Food', 'Family', 'Comedy', 'Theatre'];

    const [activeLink, setActiveLink] = useState('Home');

    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return(
        <>
        <div className='container'>
            <Link to='/' className='home-nav' onClick={() => handleNavClick('Home')}>
                DoStuff.com
            </Link>
            <div className='search'>
                <input type="text" placeholder="Search..."></input>
                <input type="submit" value="Search"></input>
            </div>
            <div className='links'>
                {navLinks.map(link => 
                    <Link
                        to={`/${link.toLowerCase()}`}  
                        key={link}
                        className={activeLink === link ? 'active' : ''} 
                        onClick={() => handleNavClick(link)}
                    >
                    {link}
                    </Link>
                )}
            </div>  
        </div>
        </>
    );
};

export default Navbar;