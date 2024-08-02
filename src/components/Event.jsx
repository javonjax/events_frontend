import '../assets/Event/styles.css';

const Event = ({name, date, weekday, time, loc}) => {
    return(
        <div className='event-card'>
                <div className='event-date'>
                        {date}
                </div>
                <div className='event-info'>
                    <div className='event-time'>
                        {weekday} - {time}
                    </div>
                    <div className='event-name'>
                        {name}
                    </div>
                    <div className='event-location'>
                        {loc}
                    </div>
                </div>
                <div className='event-detail-nav'>
                    Info {`>`}
                </div>
            </div>
    );
};

export default Event;