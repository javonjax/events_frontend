import '../assets/Home/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { LocationContext } from './LocationContext';
import { useContext } from 'react';

const Home = () => {
  const { location, error, requestLocation } = useContext(LocationContext);
  const navigate = useNavigate();

  const categories = ['Popular', 'Music', 'Sports', 'Food', 'Family', 'Arts'];

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const { latitude, longitude } = await requestLocation();

      console.log(latitude, longitude);
      navigate('/local');
    } catch (error) {
      alert('Location data must be provided to find local events!');
      console.error('Error fetching location data:', error.message);
    }
  };

  return (
    <>
      <div className="homepage-header">
        <h1>Pick a category and find something to do.</h1>
        <div className="homepage-header-media">
          <img src="/images/crowd.jpg" className=""></img>
          <img src="/images/food.jpg"></img>
          <img src="/images/business.jpg"></img>
          <img src="/images/sports.jpg"></img>
          <img src="/images/bar.jpg"></img>
          <img src="/images/theater.jpg"></img>
          <Link
            className="media-overlay-button"
            to={'/local'}
            onClick={handleClick}
          >
            Find local events.
          </Link>
        </div>
      </div>
      <div className="homepage-body">
        {categories.map((category) => (
          <Link
            key={category}
            className="homepage-card"
            to={`/${category.toLowerCase()}`}
          >
            <img src={`/images/cards/${category.toLowerCase()}.jpg`}></img>
            <h2>{category}</h2>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
