import '../assets/CategoryContent/styles.css';
import EventList from './EventList';
import { LocationContext } from './LocationContext';
import { useState, useContext } from 'react';
import { toast, Slide } from 'react-toastify';

const CategoryContent = ({ route }) => {
  
  const [useLocationData, setUseLocationData] = useState(false);
  const { location, requestLocation } = useContext(LocationContext);

  const onCheckBox = async () => {
    try {
      setUseLocationData((prev) => !prev);
      if (!location) {
        await requestLocation();
      }
    } catch (error) {
      toast.error('Please enable location services to see local events.');
      setUseLocationData(false);
    }
  };

  return (
    <>
      <div className="category-filters">
        {route.toLowerCase() !== 'local' && (
          <div className="use-location-checkbox">
            <input
              type="checkbox"
              id="location-checkbox"
              checked={useLocationData}
              onChange={onCheckBox}
            />
            <label
              htmlFor="location-checkbox"
            >
              Search near your location
            </label>
          </div>
        )}
        <select>
          <option>Show all</option>
        </select>
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
