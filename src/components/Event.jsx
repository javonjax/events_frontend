import '../assets/Event/styles.css';
import { Link } from 'react-router-dom';

const Event = ({ event, route }) => {
  const [dayOfWeek, monthDay] = event.date.split(',');

  return (
    <div className="event-card">
      <div className="event-date">
        <h2>{monthDay.trim()} </h2>
      </div>
      <div className="event-details">
        <div className="event-time">
          {dayOfWeek.trim()} - {event.time}
        </div>
        <div className="event-name">{event.name}</div>
        <div className="event-location">{event.location}</div>
      </div>
      <Link
        className="event-info-nav"
        to={`/${route.toLowerCase()}/${event.id}`}>
        Info
      </Link>
    </div>
  );
};

export default Event;
