import { useState, useEffect } from 'react';

export const defaultLocation = {
  latitude: 37.562,
  longitude: 126.947,
};

export interface ILocation {
  latitude: number;
  longitude: number;
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 30,
  maximumAge: 1000 * 3600 * 24,
};

export const useGeoLocation = () => {
  const options = geolocationOptions;
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState('');

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
    setLocation(defaultLocation);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      setLocation(defaultLocation);
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};
