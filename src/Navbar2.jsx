import './assets/Navbar2/styles.css';

const Navbar2 = () => {
    return(
        <>
        <div className='container'>
            <div className='links'>
                <p>DoStuff.com</p>
                <a className='active'>Home</a>  
                <a>Music</a>
                <a>Comedy</a>
                <a>Food & Drink</a>
            </div>  
            <div className='search'>
                <input type="text" placeholder="Search..."></input>
                <input type="submit" value="Go"></input>
            </div>
        </div>
        </>
    );
}

export default Navbar2;