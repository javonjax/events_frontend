import '../../assets/Home/styles.css';

const Home = () => {
    const categories = ['Music', 'Sports', 'Food', 'Family', 'Comedy', 'Theatre'];


    return(
        <>
            <div className='homepage-header'>
                <h1>Find something to do.</h1>
                <div className='homepage-header-media'>
                    <img src='/images/big_crowd.jpg' className=''></img>
                    <img src='/images/crowd.jpg'></img>
                    <img src='/images/test.jpg'></img>
                    <img src='/images/test.jpg'></img>
                    <img src='/images/crowd.jpg'></img>
                    <img src='/images/big_crowd.jpg'></img>
                    <a className='media-overlay-button'>Find local events.</a>
                </div>
            </div>

            <div className='homepage-body'>
                <p>Popular</p>
                {categories.map(category => 
                        <a key={category} className='homepage-card'>
                            <img src='/images/crowd.jpg'></img>
                            <p>{category}</p>
                        </a>
                )}
            </div>

            <div>
                Footer
            </div>
        </>
    );
};

export default Home;