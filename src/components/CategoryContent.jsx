import EventList from './EventList';
import { LocationContext } from './LocationContext';
import { useState, useContext } from 'react';

const CategoryContent = ({ route }) => {
  const [useLocationData, setUseLocationData] = useState(false);
  const { location, error, requestLocation } = useContext(LocationContext);

  const onCheckBox = () => {
    setUseLocationData((prev) => {
      if (!prev && !location) {
        requestLocation();
      }
      return !prev;
    });
  };

  return (
    <>
      <div className="category-filters">
        {route.toLowerCase() !== 'local' && (
          <>
            <input
              type="checkbox"
              id="location-checkbox"
              checked={useLocationData}
              onChange={onCheckBox}
            ></input>
            <label
              htmlFor="location-checkbox"
              style={{ 'margin-left': '0.5rem' }}
            >
              Search near your location
            </label>
          </>
        )}
      </div>
      <EventList
        location={
          useLocationData || route.toLowerCase() === 'local' ? location : null
        }
      ></EventList>
    </>
  );
};

export default CategoryContent;