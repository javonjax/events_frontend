import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import Event from './Event';
import '../assets/EventList/styles.css';

const BACKEND_EVENTS_API_URL = 'http://localhost:3000/api/events/';

const EventList = ({ location }) => {
  // Route name is used as a dependency for the TanStack query.
  let route = useLocation().pathname.slice(1);

  // List of event objects visible on the page.
  const [visibleEvents, setVisibleEvents] = useState([]); 
  // Number of visible events.
  const [numVisible, setNumVisible] = useState(null);  
  // Tracks if there are more events available to display from the current data.
  const [hasMore, setHasMore] = useState(null);
  // Tracks the next page of data to fetch from the API.
  const [page, setPage] = useState(0);
  // For handling errors with fetchNextPage.
  const [nextPageError, setNextPageError] = useState(null);
  // The Ticketmaster API only supports retrieving up to the 1000th item (max 200 items per page, the 5th page is the last).
  const MAX_PAGES = 4; 

  // Fetch initial events.
  const fetchEvents = async ({ pageParam }) => {
    const today = new Date().toJSON();
    const todayDateString = today.slice(0, -5) + 'Z';
    console.log(todayDateString);
    console.log(pageParam)

    // Construct query params.
    let queryParams = `sort=date,name,asc&startDateTime=${todayDateString}`;

    const classifications = ['music', 'sports', 'food', 'family', 'arts'];
    if (classifications.includes(route)) {
      queryParams += `&classificationName=${route}`;
    }

    if (location) {
      queryParams += `&latlong=${location.latitude},${location.longitude}&radius=50`;
    }

    if (pageParam <= MAX_PAGES) {
      queryParams += `&page=${pageParam}`
    }
    
    console.log(queryParams)
    // Fetch data from backend API.
    const res = await fetch(`${BACKEND_EVENTS_API_URL}?${queryParams}`);

    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    const eventData = await res.json();
    console.log('fetched', eventData.events)
    console.log('more', eventData.nextPage)
    
    // When the initial data is fetched, set the appropriate amount of visible events.
    if (pageParam === 0) {
      if (eventData.events.length <= 10) {
        setNumVisible(eventData.length);
      } else {
        setNumVisible(10);
      }
    }

    // Set hasMore based on how many events are fetched
    if (eventData.events.length <= 10) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    console.log('length', eventData.events.length);
    return eventData;
  };

  const { 
      data, 
      error, 
      isLoading, 
      isFetching, 
      hasNextPage, 
      fetchNextPage, 
      isFetchingNextPage,
      isFetchNextPageError 
    } = useInfiniteQuery({
    queryKey: ['fetchEvents', route, location],
    queryFn: fetchEvents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const handleGetNextPage = async () => {
    if (!isFetching) {  
      // If !hasMore the button is already disabled.
      const numAvailable = data?.pages.flatMap((page) => page.events).length;
      console.log('initial num available', numAvailable)
      if (numAvailable > numVisible + 10) {
        // If we have more than enough events, display them and leave hasMore unchanged.
        setNumVisible(prev => prev + 10);
      } else if (numAvailable === numVisible + 10) {
        // If we have exactly enough, display them and fetch more. hasMore will be set in the queryFn.
        setNumVisible(prev => prev + 10);
        if (!isFetchingNextPage) {
          fetchNextPage();
        }
      } else {
        // If we have less than enough, check if there is a next page, and await the results.
        if (hasNextPage) {
          if (!isFetchingNextPage) {
            await fetchNextPage();
            setNumVisible(prev => prev + 10); 
          }
        } else{
          // If there are no more pages, display the remaining available events and set hasMore to false.
          setNumVisible(numAvailable);
          setHasMore(false);
        }
      }
    }
  };

  // Set the visible events.
  useEffect(() => {
    if (data) {
      console.log(numVisible, 'visible')
      console.log(data?.pages.flatMap((page) => page.events))
      const dataMap = data?.pages.flatMap((page) => page.events);
      setVisibleEvents([...dataMap.slice(0, numVisible)]);
    }
  }, [data, numVisible]);

  useEffect(() => setHasMore(false), [isFetchNextPageError]);

  if (isLoading) {
    return <p id='initial-fetch-loading' className="events-pending">Finding events...</p>;
  }

  if (error && !isFetchNextPageError) {
    return <p id='initial-fetch-error'className="events-pending">No events found...</p>;
  }

  // Render an event component for each event returned from the backend API.
  return (
    <>
      <div className="category-content">
        {visibleEvents?.map((event) => (
          <Event key={event.id} event={event} route={route}></Event>
        ))}
        {isFetching && <p className="events-pending">Loading events...</p>}
        <button 
          className={
            !hasMore || data?.pages.flatMap((page) => page.events).length <= 10 
            ? "hidden" : "load-more-events"
          }
          onClick={handleGetNextPage} 
        >Get more</button>
      </div>
    </>
  );
};

export default EventList;
