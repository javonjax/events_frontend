import '../assets/Home/styles.css';

const Home = () => {
    return(
        <>
            <div className='homepage-header'>
                <h1>Find something to do.</h1>
                <div className='homepage-header-media'>
                    <img src='/images/Header/big_crowd.jpg' className=''></img>
                    <img src='/images/Header/crowd.jpg'></img>
                    <img src='/images/Header/test.jpg'></img>
                    <img src='/images/Header/test.jpg'></img>
                    <img src='/images/Header/crowd.jpg'></img>
                    <img src='/images/Header/big_crowd.jpg'></img>
                    <a className='media-overlay-button'>Find local events.</a>
                </div>
            </div>

            <div className='homepage-body'>
                <div className='homepage-card'>
                    <img src='/images/Header/crowd.jpg'></img>
                </div>
                <div className='homepage-card'></div>
                <div className='homepage-card'></div>
                <div className='homepage-card'></div>
                <div className='homepage-card'></div>
                <div className='homepage-card'></div>
                <div className='homepage-card'></div>
                <div className='homepage-card'></div>
            </div>

            <div>
                Footer
            </div>
        </>
    );
};

export default Home;