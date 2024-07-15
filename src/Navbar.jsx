import './assets/Navbar/styles.css'

const Navbar = () => {
    return(
        <div className="topnav">
            <div className="topnav-links">
                <a className="active">Home</a> 
                <a>Music</a>
                <a>Comedy</a>
                <a>Food & Drink</a>
            </div>
            <div className="topnav-search">
                <input type="text" placeholder="Search..."></input>
                <input className='topnav-search-button'type="submit" value="Go"></input>
            </div>
        </div>
    );
}

export default Navbar;