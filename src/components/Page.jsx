import '../assets/Page/styles.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Page = ({ route }) => {

    return(
        <>
        <div className="category-header">
            <img src='../../images/bar.jpg'></img>
            <div className='category-navlinks'>
                <Link
                    to={'/'}>

                    Home

                </Link>

                <span> / </span>

                <Link
                    to={`/${route}`}>

                    {route.charAt(0) + route.slice(1)}

                </Link>
            </div>
        </div>

        <div className='category-filters'>
            <form className='filter-location'>
                <select name='location'>
                    <option>All {route}</option>
                </select>
            </form>

            <form className='filter-subcategory' defaultValue={`All ${route} Event`}>
                <select name='subcategory'>
                    <option >All {route} Events</option>
                    <option>Cats</option>
                </select>
            </form>
        </div>

        <div className='category-content'>
            <div className='event-card'>
                hi
            </div>
        </div>
        </>
    )
}

export default Page;