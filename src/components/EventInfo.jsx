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
    }, []);

    return(
        <div className="event-info">

            <div className="event-info-header">
                <div className="header-text">
                    <h1> 
                        { event.name } 
                    </h1>

                    {/* Conditionally render header elements. */}

                    { event.location ? <h2>{ event.location }</h2> 
                                     : null
                    }

                    { event.date && event.time ? <h2>{ event.date } - { event.time }</h2>
                                               : event.date ? <h2>{ event.date }</h2>
                                                            : event.time ? <h2>{ event.time }</h2>
                                                                         : null
                    }

                    { event.priceMin && event.priceMax ? event.priceMin === event.priceMax ? <h2>{ event.priceMin }</h2>
                                                                                           : <h2>{ event.priceMin} - { event.priceMax }</h2>
                                                       : event.priceMin ? <h2>{ event.priceMin }</h2>
                                                                        : event.priceMax ? <h2>{ event.priceMax }</h2>
                                                                                         : null
                    }

                </div>
                <div className="header-img">
                    <img src={ event.image }></img>
                </div>
            </div>
            
            <div className="event-info-body">
                { event.seatmap ? <div className="seatmap">
                                        <h2>{ event.venue }</h2> 
                                        <img src={ event.seatmap } alt='Venue Seatmap'></img>
                                  </div>
                                : null
                }

                <div className="event-sales-content">
                    { event.info ? <p className="event-description-text">
                                        { event.info }
                                   </p>
                                : null
                    }

                    { event.url ? <a className='event-ticket-link' href={ event.url }>Get tickets</a>
                                : null
                    }
                </div>
            </div>
        </div>
    );
};

export default EventInfo;