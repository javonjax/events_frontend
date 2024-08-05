import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import '../assets/EventInfo/styles.css';

const EventInfo = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});

    // Use the event info api to find information about a specific event by providing and id.
    const BACKEND_EVENT_INFO_API_URL = `http://localhost:3000/api/events`;

    useEffect(() => {
        /*
            Fetch data for an individual event from the backend API.
        */
        const fetchData = async () => {
            try{
                const res = await fetch(`${BACKEND_EVENT_INFO_API_URL}/${id}`);

                if(!res.ok){
                    throw new Error(`${res.status}: ${res.statusText}`);
                }

                const eventData = await res.json();
                setEvent(eventData);
                console.log(eventData);
            }
            catch (error) {
                console.log('Error fetching data from backend API:\n', error);
            }
        };
        fetchData();
    }, [])

    return(
        <div className="event-info">
            <div className="event-info-header">
                <div className="header-text">
                    <h1 className="event-name"> 
                        { event.name } 
                    </h1>
                    <h2>{ event.venue } - { event.location }</h2>
                    <h2 className="event-pricing">
                        { event.priceMin === event.priceMax ? event.priceMin
                                                            : event.priceMin + ' - ' + event.priceMax } 
                    </h2>
                    <p className="event-description-text">
                        { event.info }
                    </p>
                </div>

                <div className="header-img">
                    <img src={ event.image }></img>
                </div>
            </div>

            <div className="seatmap-img">
                <img src={ event.seatmap }></img>
            </div>
        </div>
    );
};

export default EventInfo;