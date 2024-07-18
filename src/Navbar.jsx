import './assets/Navbar/styles.css';
import { useState } from 'react';

const Navbar = () => {
    const navLinks = ['Home', 'Music', 'Comedy', 'Food & Drink'];

    const [activeLink, setActiveLink] = useState('Home');


    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return(
        <>
        <div className='container'>
            <div className='links'>
                <p>DoStuff.com</p>
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
            <div className='search'>
                <input type="text" placeholder="Search..."></input>
                <input type="submit" value="Go"></input>
            </div>
        </div>
        </>
    );
};

export default Navbar;