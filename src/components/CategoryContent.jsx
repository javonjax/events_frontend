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
      toast.error('Please enable location services to see local events.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        });
      setUseLocationData(false);
    }
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
              style={{ 'marginLeft': '0.5rem' }}
            >
              Search near your location
            </label>
          </>
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
