import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Event from './Event';
import '../assets/EventList/styles.css';

const BACKEND_EVENTS_API_URL = 'http://localhost:3000/api/events/';

const EventList = ({ location }) => {
  // Route name is used as a dependency for the TanStack query.
  let route = useLocation().pathname.slice(1);

  const fetchEvents = async () => {
    const today = new Date().toJSON();
    const todayDateString = today.slice(0, -5) + 'Z';
    console.log(todayDateString);

    // Construct query params.
    let queryParams = `sort=date,name,asc&startDateTime=${todayDateString}`;
    const classifications = ['music', 'sports', 'food', 'family', 'arts'];
    if (classifications.includes(route)) {
      queryParams += `&classificationName=${route}`;
    }

    if (location) {
      queryParams += `&latlong=${location.latitude},${location.longitude}&radius=50`;
    }

    // Fetch data from backend API.
    const res = await fetch(`${BACKEND_EVENTS_API_URL}?${queryParams}`);

    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    const eventData = await res.json();

    return eventData;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchEvents', route, location],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <p className="events-pending">Loading events...</p>;
  }

  if (error) {
    return <p className="events-pending">No events found near you...</p>;
  }

  // Render an event component for each event returned from the backend API.
  return (
    <>
      <div className="category-content">
        {data?.map((event) => (
          <Event key={event.id} event={event} route={route}></Event>
        ))}
      </div>
    </>
  );
};

export default EventList;
