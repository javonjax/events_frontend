import '../assets/CategoryLanding/styles.css';
import Event from './Event';
import CategoryHeader from './CategoryHeader';
import CategoryContent from './CategoryContent';
import { Alert } from 'react-bootstrap';
import { LocationContext } from './LocationContext';
import { useState, useEffect, useContext } from 'react';

const CategoryLanding = ({ route }) => {
  // Ticketmaster API classification names that return more accurate results than keyword searches.
  const classifications = ['music', 'sports', 'food', 'family', 'arts'];

  // Use the events API if there is a valid classification name.
  const BACKEND_EVENTS_API_URL = 'http://localhost:3000/api/events/';

  // Use the suggest API to find suggestions based on keywords, location, etc.
  const BACKEND_SEARCH_API_URL = 'http://localhost:3000/api/suggest/';

  const [data, setData] = useState({});
  const [useLocation, setUseLocation] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(25);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { location, error, requestLocation } = useContext(LocationContext);

  // const getEventsData = (category) => {

  //     const eventData = data?.find(item => item[0] === `${route.toLowerCase()}-${useLocation}`) || [];
  //     return eventData?.[1] || [];

  // };

  const fetchData = async (locationData = null) => {
    setLoading(true);
    console.log('fetching');
    try {
      // Checks if there is an API classification name for the current route.
      const classificationName = classifications.find((item) =>
        item.includes(route.toLowerCase()),
      );

      /* 
            Create a date string in the required format for API calls. 
            We are only looking for events that have not already occured.
            */
      const today = new Date().toJSON();
      const dateString = today.slice(0, -5) + 'Z';

      // Construct query params
      let queryParams = '';

      if (classificationName) {
        queryParams = `classificationName=${classificationName}&sort=date,name,asc&startDateTime=${dateString}`;
      } else if (route.toLowerCase() === 'local') {
        queryParams = `latlong=${location.latitude},${location.longitude}&radius=50&sort=date,name,asc&startDateTime=${dateString}`;
        console.log('location: ', location.longitude);
      } else {
        queryParams = `sort=date,name,asc&startDateTime=${dateString}`;
      }

      // if(pageNum) {
      //     queryParams += `&page=${pageNum}`;
      // }

      if (useLocation && location && route.toLowerCase() !== 'local') {
        queryParams += `&latlong=${location.latitude},${location.longitude}&radius=50`;
      }

      if (locationData) {
        queryParams += `&latlong=${locationData.latitude},${locationData.longitude}&radius=50`;
      }

      // Fetch data from backend API.
      const res = await fetch(`${BACKEND_EVENTS_API_URL}?${queryParams}`);
      console.log(queryParams);

      if (!res.ok) {
        setUseLocation(false);
        setVisibleEvents(25);
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      const eventData = await res.json();
      console.log(eventData, 'event data in fetch');
      const newData = [`${route.toLowerCase()}-${useLocation}`, eventData];
      console.log(newData[0], newData[1].length, 'new data');
      // if(newData[1].length < 25) {
      //     setHasMore(false);
      //     setVisibleEvents(newData[1].length);
      // } else{
      //     setHasMore(true);
      //     setVisibleEvents(25);
      // }

      // Cache the events that show on inital page load.
      setData((prevData) => ({ ...prevData, [newData[0]]: newData[1] }));
      // if(data) {
      //     setData(existingData => {
      //         const
      //         if(routeIndex === -1) {
      //             // Create new state for this route.
      //             const updatedData = [...existingData, newData];
      //             return updatedData;
      //         }
      //     });
      // } else {
      //     setData([newData]);
      // }

      // return newData[1];
      // setData(existingData => {
      //     const safeData = existingData || null;
      //     // Check if route exists in state.
      //     const routeIndex = safeData.findIndex(item => item[0] === newData[0]);
      //     console.log(newData[0], routeIndex)
      //     if(routeIndex === -1) {
      //         // Create new state for this route.
      //         const updatedData = [...safeData, newData];
      //         return updatedData;
      //     }
      //     // if(routeIndex !== -1) {
      //     //     // Add new data to existing state for the route index.
      //     //     console.log('adding to existing state')
      //     //     const updatedData = [...existingData];
      //     //     updatedData[routeIndex][1] = [...updatedData[routeIndex][1], ...newData[1]];
      //     //     return updatedData;
      //     // } else {
      //     //     // Create new state for this route.
      //     //     const updatedData = [...existingData, newData];
      //     //     return updatedData;
      //     // }
      // });
    } catch (error) {
      setErrorMessage('No events found near your location.');
      console.log('Error fetching data from backend API:\n', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setUseLocation((prev) => !prev);
  };
  // TODO: data state is not updated before we call fetch data so the error message pops up
  // useEffect(() => {
  //     setErrorMessage('');
  //     if(useLocation && !location){
  //         const getLocationData = () => {
  //             try {
  //                 requestLocation()
  //                     .then((locationData) => {
  //                         console.log('got location data',locationData);
  //                         fetchData(locationData);
  //                     })
  //             } catch(error) {
  //                 console.error('Error getting location data:', error);
  //             }
  //         };

  //         getLocationData();
  //     } else {
  //         fetchData();
  //     }
  // }, [useLocation, route]);

  // useEffect(() => {
  //     if(useLocation && !location){
  //         requestLocation()
  //             .then(() => fetchData())
  //             .catch((error) => {
  //                 console.error('Error getting location data:', error);
  //                 setErrorMessage('Location access denied. Please enable location services to find events near you.');
  //             });
  //     } else {
  //         fetchData();
  //     }
  // }, [useLocation, location, route]);

  // useEffect(() => {
  //     console.log('location effect')
  //     if(useLocation) {
  //         if(!location) {
  //             // Fetch location if we don't have it.
  //             const getLocation = async () => {
  //                 try {
  //                     const {latitude, longitude} = await requestLocation();
  //                 } catch(error) {
  //                     console.error('Error getting location data:', error);
  //                     return;
  //                 }
  //             };
  //             getLocation();
  //         } else {
  //             if (!data.find(item => item[0] === `${route.toLowerCase()}-${useLocation}`)) {
  //                 fetchData();
  //             } else {
  //                 events = getEventsData(`${route.toLowerCase()}-${useLocation}`);
  //                 setVisibleEvents(25);
  //             }
  //         }
  //     } else {
  //         if (!data.find(item => item[0] === `${route.toLowerCase()}-${useLocation}`)) {
  //             fetchData();
  //         } else {
  //             events = getEventsData(`${route.toLowerCase()}-${useLocation}`);
  //             setVisibleEvents(25);
  //         }
  //     }
  // }, [useLocation, location]);

  // useEffect(() => {
  //     /*
  //         Fetch event data from the backend API if it is not found in state.
  //     */
  //     setErrorMessage('');
  //     console.log('route change effects')
  //     if (!data.find(item => item[0] === `${route.toLowerCase()}-${useLocation}`)) {
  //         console.log('existing data not found for:', `${route.toLowerCase()}-${useLocation}` )
  //         fetchData();
  //     } else {
  //         console.log('data found')
  //         events = getEventsData(`${route.toLowerCase()}-${useLocation}`);
  //     }
  // }, [route]);

  // let events = '';
  // if(data){
  //     events = getEventsData(`${route.toLowerCase()}-${useLocation}`);
  // } else {
  //     events = fetchData();
  //     console.log(events)
  // }

  let events = [];
  useEffect(() => {
    const getData = async () => {
      events = await fetchData();
      setVisibleEvents(25);
    };

    getData();
  }, [route]);

  console.log(data);
  return (
    <>
      <CategoryHeader></CategoryHeader>
      <CategoryContent route={route}></CategoryContent>
      {/* <div className="category-filters">
        {route.toLowerCase() === 'local' ? null : (
          <>
            <input
              type="checkbox"
              id="location-checkbox"
              checked={useLocation}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor="location-checkbox">Search near your location</label>
          </>
        )}
      </div>
      {errorMessage && (
        <Alert variant="warning" className="no-events-near-alert">
          <strong>{errorMessage}</strong>
        </Alert>
      )}

      <div className="category-content">
        {data?.[`${route.toLowerCase()}-${useLocation}`]
          ?.slice(0, visibleEvents)
          .map((event, index) => {
            return <Event key={index} event={event} route={route} />;
          })}
        {loading && <p>Loading events...</p>}
      </div>
      {hasMore && <button>Hello</button>} */}
    </>
  );
};

export default CategoryLanding;
