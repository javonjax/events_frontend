import '../assets/Home/styles.css';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { LocationContext } from './LocationContext';
import { useContext } from 'react';
import { ImTicket } from 'react-icons/im';

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
        <h1>Welcome to <ImTicket role="img" title="Ticket icon"/>Doozy</h1>
        <h2>Pick a category and find something to do.</h2>
        <div className="homepage-header-media">
          <img src="/images/crowd.jpg" alt="Concert crowd"></img>
          <img src="/images/food.jpg" alt="Street market"></img>
          <img src="/images/business.jpg" alt="Business seminar"></img>
          <img src="/images/sports.jpg" alt="Kick boxing match"></img>
          <img src="/images/bar.jpg" alt="Sports bar"></img>
          <img src="/images/theater.jpg" alt="Outside a theatre"></img>
          <Link
            className="media-overlay-button"
            to={'/local'}
            onClick={handleClick}
          >
            Find events near you
          </Link>
        </div>
      </div>
      <div className="homepage-body">
        <div className="cards-container">
          {categories.map((category) => (
            <Card 
              key={`${category}-card`}
              category={category}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
