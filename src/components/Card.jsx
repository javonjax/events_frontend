import '../assets/Card/styles.css';
import { Link } from 'react-router-dom';

const Card = ({ category }) => {
  return (
    <Link
        className="homepage-card"
        to={`/${category.toLowerCase()}`}
    >
        <img 
          src={`/images/cards/${category.toLowerCase()}.jpg`} 
          alt={`${category || 'Category'} card`}></img>
        <h2>{category}</h2>
    </Link>
  );
};

export default Card;
