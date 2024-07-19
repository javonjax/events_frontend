import '../assets/Navbar/styles.css';
import { useState } from 'react';

const Navbar = () => {
    const navLinks = ['Music', 'Sports','Food', 'Comedy'];

    const [activeLink, setActiveLink] = useState('Home');


    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return(
        <>
        <div className='container'>
            <a className='home-nav'>DoStuff.com</a>
            <div className='search'>
                <input type="text" placeholder="Search..."></input>
                <input type="submit" value="Search"></input>
            </div>
            <div className='links'>
                {navLinks.map(link => (
                    <a  
                        key={link}
                        className={activeLink === link ? 'active' : ''} 
                        onClick={() => handleNavClick(link)}
                    >
                    {link}
                    </a>
                    ))}
            </div>  
        </div>
        </>
    );
};

export default Navbar;