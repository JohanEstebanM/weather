import React, { useState, useEffect } from 'react';
import { getApiTemp } from '../utils/getApiTemp';
import { getCurrentPosition } from '../utils/getCurrentPosition';

const Location = () => {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        return getApiTemp({ latitude, longitude });
      })
      .then((apiResults) => {
        const cityApi = apiResults.name;
        const countryApi = apiResults.sys.country;
        setCity(cityApi);
        setCountry(countryApi);
      });
  }, []);
  return (
    <div>
      {city && country ? (
        <div>
          <p>
            {city}, {country}
          </p>
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default Location;
