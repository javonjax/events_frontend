import '../assets/Page/styles.css';
import { Link } from 'react-router-dom';

const Page = ({ route }) => {
    return(
        <>
        <div className="category-header">
            <img src='../../images/bar.jpg'></img>
            <div className='category-navlinks'>
                <Link
                    to={'/'}>

                    HOME

                </Link>

                <span> / </span>

                <Link
                    to={`/${route}`}>

                    {route.toUpperCase()}

                </Link>
            </div>
        </div>

        <div className='category-filters'>
            <form className='filter-location'>
                <select name='location'>
                    <option>All Music</option>
                </select>
            </form>

            <form className='filter-subcategory'>
                <select name='subcategory'>
                    <option>All Music</option>
                </select>
            </form>
        </div>
        </>
    )
}

export default Page;