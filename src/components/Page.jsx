import '../assets/Page/styles.css';
import Event from './Event';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// TODO: Rename this component.
const Page = ({ route }) => {
    // Ticketmaster API classification names that return more accurate results than keyword searches.
    const classifications = ['music', 'sports', 'food', 'family', 'arts&theater'];

    // Use the events API if there is a valid classification name.
    const BACKEND_EVENTS_API_URL = 'http://localhost:3000/api/events/';

    // Use the suggest API to find suggestions based on keywords, location, etc.
    const BACKEND_SEARCH_API_URL = 'http://localhost:3000/api/suggest/';

    const [data, setData] = useState([]);
    
    // TODO: cache data?
    useEffect(() => {

        const fetchData = async () => {
            // Reset data upon visiting a new category.
            setData([]);

            try {
                // Check if there is an API classification name for the current route.
                const classificationName = classifications.find(item => item.includes(route.toLowerCase()));

                // Only retrieve events that have not already occurred.
                const today = new Date().toJSON();

                // Removes the decimal so the datestring can be passed to the API.
                 const dateString = today.slice(0, -5) + 'Z';
                 
                // Query params are manually constructed here to avoid issues with automatic encoding.
                const queryParams = classificationName
                                    ? `classificationName=${classificationName}&sort=date,name,asc&startDateTime=${dateString}`
                                    : `keyword=${route}&sort=date,name,asc&startDateTime=${dateString}`;


                const res = await fetch(`${BACKEND_EVENTS_API_URL}?${queryParams}`);

                if(!res.ok){
                    throw new Error(`${res.status}: ${res.statusText}`);
                }

                const eventData = await res.json();

                setData(data => [...data, ...eventData]);
            }
            catch(error) {
                console.log('Error fetching data from backend API:\n', error);
            }
        };

        fetchData();

    }, [route]);

    

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
            {data.map((event, index) => {
                
                return (
                    <Event
                        key={index}
                        event={event}
                        route={route} />
                );
                
            })}
        </div>
        </>
    );
};

export default Page;
