import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const requestLocation = () => {
        return new Promise((resolve, reject) => {

            const handleSuccess = (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                resolve({ latitude, longitude });
            };

            const handleError = (error) => {
                setError(error.message);
                reject(error);
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
            }
            else {
                setError('Geolocation is not supported by this browser.');
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };

    return(
        <LocationContext.Provider value={{ location, error, requestLocation }}>
            { children }
        </LocationContext.Provider>
    );
};