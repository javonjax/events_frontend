import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CategoryHeader = () => {
  let route = useLocation().pathname.slice(1);
  return (
    <div
      className="category-header"
      style={{
        backgroundImage: `url('/images/${route}_header.jpg')`,
      }}
    >
      <div className="category-navlinks">
        <Link to={'/'}>Home</Link>
        <span> / </span>
        <Link to={`/${route}`}>
          {route.charAt(0).toUpperCase() + route.slice(1)}
        </Link>
      </div>
    </div>
  );
};

export default CategoryHeader;
