import '../assets/Page/styles.css';
import Event from './Event';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// TODO: Rename this component.
const Page = ({ route }) => {

    return(
        <>
        <div className="category-header">
            <img src='../../images/bar.jpg'></img>
            <div className='category-navlinks'>
                <Link to={'/'}>

                    Home

                </Link>

                <span> / </span>

                <Link to={`/${route}`}>

                    {route}

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
            <Event
                name='Dance party'
                date='July 19'
                weekday='Mon'
                time='12:00 PM'
                loc='Tampa, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>

            <Event
                name='Moon landing'
                date='August 1'
                weekday='Wed'
                time='3:00 PM'
                loc='Jupiter, FL'>
            </Event>
        </div>
        </>
    );
};

export default Page;