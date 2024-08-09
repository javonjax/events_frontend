import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const requestLocation = () => {
        setLoading(true); 
        const handleSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setLoading(false);
        };

        const handleError = (error) => {
            setError(error.message);
            setLoading(false);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        }
        else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }

    };

    return(
        <LocationContext.Provider value={{ location, error, requestLocation, loading }}>
            { children }
        </LocationContext.Provider>
    );
};