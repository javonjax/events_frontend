import '../assets/Home/styles.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = ['Popular', 'Music', 'Sports', 'Food', 'Family', 'Theater'];


    return(
        <>
            <div className='homepage-header'>
                <h1>Find something to do.</h1>
                <div className='homepage-header-media'>
                    <img src='/images/crowd.jpg' className=''></img>
                    <img src='/images/food.jpg'></img>
                    <img src='/images/business.jpg'></img>
                    <img src='/images/sports.jpg'></img>
                    <img src='/images/bar.jpg'></img>
                    <img src='/images/theater.jpg'></img>
                    <a className='media-overlay-button'>Find local events.</a>
                </div>
            </div>

            <div className='homepage-body'>
                {categories.map(category => 
                        <Link 
                            key={category} 
                            className='homepage-card' 
                            to={`/${category.toLowerCase()}`}
                        >
                            <img src={`/images/cards/${category.toLowerCase()}.jpg`}></img>
                            <p>{category}</p>
                        </Link>
                )}
            </div>
        </>
    );
};

export default Home;