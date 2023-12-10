import React, { useEffect, useState } from 'react';

interface Position {
  latitude: number;
  longitude: number;
}

const Geolocation: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('Getting location...');

  useEffect(() => {
    const successHandler = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ latitude, longitude });
      setStatus('Geolocation captured successfully!');
      setLoading(false);
    };

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message);
      setStatus('Failed to capture geolocation.');
      setLoading(false);
    };

    // Options for geolocation (optional)
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // Use the Geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );
  }, []);

  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      {loading ? (
        <p>{status}</p>
      ) : (
        <>
          {position ? (
            <p>
              Latitude: {position.latitude}, Longitude: {position.longitude}
            </p>
          ) : (
            <p>Error: {error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Geolocation;
