import './assets/Header/styles.css';

const Header = () => {
    return(
            <div className='app-header'>
                <h1>DoStuff - Get out and do something.</h1>
                <div className='app-header-media'>
                    <img src='/images/Header/big_crowd.jpg'></img>
                    <img src='/images/Header/big_crowd.jpg'></img>
                    <img src='/images/Header/big_crowd.jpg'></img>
                    <img src='/images/Header/big_crowd.jpg'></img>
                </div>
            </div>
    );
};

export default Header;