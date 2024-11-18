import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdPricetag } from 'react-icons/io';
import { ImTicket } from "react-icons/im";
import '../assets/EventInfo/styles.css';

// The event info API returns information about an event based on the id passed as a param.
const BACKEND_EVENT_INFO_API_URL = `http://localhost:3000/api/events`;

const EventInfo = () => {
  // Id is used as a dependency for the TanStack query and is passed to the backend API.
  const { route, id } = useParams();

  const fetchEvent = async () => {
    const res = await fetch(`${BACKEND_EVENT_INFO_API_URL}/${id}`);

    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    const eventData = await res.json();

    return eventData;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchEvent', id],
    queryFn: fetchEvent,
  });

  if (isLoading) {
    return <p>Loading event info...</p>;
  }

  return (
    <div className="event-info">
      <div className="event-info-header">
        <div className="header-text">
          <h1>{data?.name}</h1>
          {data?.location && (
            <h2>
              <FaLocationDot /> {data?.location}
            </h2>
          )}
          {data?.date && data?.time && (
            <h2>
              <FaCalendar /> {data?.date} - {data?.time}
            </h2>
          )}

          {data?.priceMin && data?.priceMax ? (
            data?.priceMin === data?.priceMax ? (
              <h2>
                <IoMdPricetag /> {data?.priceMin}
              </h2>
            ) : (
              <h2>
                <IoMdPricetag /> {data?.priceMin} - {data?.priceMax}
              </h2>
            )
          ) : data?.priceMin ? (
            <h2>
              <IoMdPricetag /> {data?.priceMin}
            </h2>
          ) : data?.priceMax ? (
            <h2>
              <IoMdPricetag /> {data?.priceMax}
            </h2>
          ) : null}
        </div>
        <div className="header-img">
          {data?.image && <img src={data?.image} alt="Attraction Image"></img>}
        </div>
      </div>
      <div className="event-info-body">
        {data?.info && <p className="event-description-text">{data?.info}</p>}
        {data?.url && (
          <a className="event-ticket-link" href={data?.url}>
            <ImTicket />Get Tickets
          </a>
        )}
        {data?.seatmap && (
          <div className="seatmap">
            <h2>{data?.venue}</h2>
            {data?.address && <p>{data.address}</p>}
            {data?.seatmap && <img src={data?.seatmap} alt="Venue Seatmap"></img>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventInfo;
