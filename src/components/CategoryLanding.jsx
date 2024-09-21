import '../assets/CategoryLanding/styles.css';
import Event from './Event';
import { Link } from 'react-router-dom';
import { LocationContext } from './LocationContext';
import { useState, useEffect, useContext } from 'react';


const CategoryLanding = ({ route }) => {
    // Ticketmaster API classification names that return more accurate results than keyword searches.
    const classifications = ['music', 'sports', 'food', 'family', 'arts&theater'];

    // Use the events API if there is a valid classification name.
    const BACKEND_EVENTS_API_URL = 'http://localhost:3000/api/events/';

    // Use the suggest API to find suggestions based on keywords, location, etc.
    const BACKEND_SEARCH_API_URL = 'http://localhost:3000/api/suggest/';

    const [data, setData] = useState([]);
    const [useLocation, setUseLocation] = useState(false);
    const [visibleEvents, setVisibleEvents] = useState(50);
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [locationFetched, setLocationFetched] = useState(false);
    const { location, error, requestLocation } = useContext(LocationContext);

    const getEventsData = (category) => {
        const eventData = data.find(item => item[0] === `${route.toLowerCase()}-${useLocation}`);
       
        return eventData ? eventData[1]
                         : [];
    }

    const fetchData = async (pageNum = null) => {
        setLoading(true);
        try {
            // Checks if there is an API classification name for the current route.
            const classificationName = classifications.find(item => item.includes(route.toLowerCase()));

            /* 
            Create a date string in the required format for API calls. 
            We are only looking for events that have not already occured.
            */
            const today = new Date().toJSON();
            const dateString = today.slice(0, -5) + 'Z';
             
            // Construct query params
            let queryParams;

            if(classificationName){
                queryParams = `classificationName=${classificationName}&sort=date,name,asc&startDateTime=${dateString}`;
                if(useLocation) {
                    queryParams += `&latlong=${location.latitude},${location.longitude}&radius=50`;
                }
            }
            else if(route.toLowerCase() === 'local'){
                queryParams = `latlong=${location.latitude},${location.longitude}&radius=50&sort=date,name,asc&startDateTime=${dateString}`;
                console.log('location: ', location.longitude);
            }
            else {
                queryParams = `sort=date,name,asc&startDateTime=${dateString}`;
                if(useLocation) {
                    queryParams += `&latlong=${location.latitude},${location.longitude}&radius=50`;
                }
            }

            if(pageNum) {
                queryParams += `&page=${pageNum}`;
            }

            // Fetch data from backend API.
            const res = await fetch(`${BACKEND_EVENTS_API_URL}?${queryParams}`);
            console.log(queryParams);

            if(!res.ok){
                setUseLocation(false);
                setVisibleEvents(50);
                throw new Error(`${res.status}: ${res.statusText}`);
            }

            const eventData = await res.json();
            // TODO: append location status to new data route
            const newData = [`${route.toLowerCase()}-${useLocation}`, eventData];
            console.log(newData[1], 'new data')
            if(newData[1].length < 50) {
                setHasMore(false);
                setVisibleEvents(newData[1].length);
            } else{
                setHasMore(true);
                setVisibleEvents(50);
            }

            setData(existingData => {
                // Check if route exists in state.
                const routeIndex = existingData.findIndex(item => item[0] === newData[0]);
                if(routeIndex !== -1) {
                    // Add new data to existing state for the route index.
                    console.log('adding to existing state')
                    const updatedData = [...existingData];
                    updatedData[routeIndex][1] = [...updatedData[routeIndex][1], ...newData[1]];
                    console.log(data)
                    return updatedData;
                } else {
                    // Create new state for this route.
                    const updatedData = [...existingData, newData];
                    return updatedData;
                }
            });
        } catch(error) {
            console.log('Error fetching data from backend API:\n', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (event) => {
        setUseLocation(!useLocation);
    }

    useEffect(() => {
        if(useLocation) {
            if(!location) {
                // Fetch location if we don't have it.
                const getLocation = async () => {
                    try {
                        const {latitude, longitude} = await requestLocation();
                        setLocationFetched(true);
                    } catch(error) {
                        console.error('Error getting location data:', error);
                        setLocationFetched(false);
                        return;
                    }
                };
                getLocation();
            } else {
                fetchData();
            }
        } else {
            fetchData();
        }
    }, [useLocation, location]);
    
    useEffect(() => {

        /*
            Fetch event data from the backend API.
        */
        if (!data.find(item => item[0] === `${route.toLowerCase()}-${useLocation}`)) {
            console.log('existing data not found for:', `${route.toLowerCase()}-${useLocation}` )
            fetchData();
        }
    

    }, [route]);

    let events = getEventsData(`${route.toLowerCase()}-${useLocation}`);
    console.log(`${route.toLowerCase()}-${useLocation}`, 'get events')
    console.log(data)
    console.log(events, 'events')

    return(
        <>
        <div className="category-header" style={{backgroundImage: `url('/images/${route.toLowerCase()}_header.jpg')`}}>
            
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
            {route.toLowerCase() === 'local' ? null
                                             : 
                <>
                <input
                    type='checkbox'
                    id='location-checkbox'
                    checked={useLocation}
                    onChange={handleCheckboxChange}
                >
                </input>
                <label for='location-checkbox'>Search near your location</label>
                </>
            }
        </div>

        <div className='category-content'>
            {events.slice(0, visibleEvents).map((event, index) => {
                
                return (
                    <Event
                        key={index}
                        event={event}
                        route={route} />
                );
                
            })}
            {loading && <p>Loading events...</p>}
        </div>
        </>
    );
};

export default CategoryLanding;
