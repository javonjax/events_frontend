import { useQuery } from '@tanstack/react-query';
import '../assets/CategoryContent/styles.css';
import EventList from './EventList';
import { LocationContext } from './LocationContext';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';

const BACKEND_GENRES_API_URL = import.meta.env.VITE_BACKEND_GENRES_API_URL;

const CategoryContent = ({ route }) => {
  const [useLocationData, setUseLocationData] = useState(false);
  const { location, requestLocation } = useContext(LocationContext);

  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

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

  const fetchGenres = async () => {
    const res = await fetch(`${BACKEND_GENRES_API_URL}${route}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const { data: genres } = useQuery({
    queryKey: ['fetchGenres', route],
    queryFn: fetchGenres,
  });

  return (
    <>
      <div className="category-filters">
        <div className="filter-dropdowns-container">
          {genres?.length && (
            <div className="filter-dropdown">
              <label htmlFor="subcategory-select">Subcategory:</label>
              <select 
                name="subcategory-select"
                value={selectedGenre}
                onChange={handleGenreChange}>
                <option value="">Show all</option>
                {genres?.map((item) => (
                  <option 
                    key={item.id}
                    value={item.id}>
                      {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="filter-dropdown">
            <label>Start date:</label>
            <input type="date"></input>
          </div>
          <div className="filter-dropdown">
            <label>End date:</label>
            <input type="date"></input>
          </div>
        </div>
        {route.toLowerCase() !== 'local' && (
          <div className="use-location-checkbox">
            <input
              type="checkbox"
              id="location-checkbox"
              checked={useLocationData}
              onChange={onCheckBox}
            />
            <label htmlFor="location-checkbox">Search near your location</label>
          </div>
        )}
      </div>
      <EventList
        route={route}
        selectedGenre={selectedGenre}
        location={
          useLocationData || route.toLowerCase() === 'local' ? location : null
        }
      ></EventList>
    </>
  );
};

export default CategoryContent;
