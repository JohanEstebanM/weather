import React, { useState, useEffect } from 'react';
import { getApiTemp } from '../utils/getApiTemp';
import { getCurrentPosition } from '../utils/getCurrentPosition';
import InfoGeneral from './InfoGeneral';

const Temperature = () => {
  const [temperature, setTemperature] = useState(null);
  const [scale, setScale] = useState('Celsius');
  let displayTemperature;
  let color = 'orange';

  useEffect(() => {
    getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        return getApiTemp({ latitude, longitude });
      })
      .then((apiResults) => {
        const temp = apiResults.main.temp;
        setTemperature(temp);
      });
  }, []);

  if (temperature !== null) {
    if (scale === 'Celsius') {
      displayTemperature = `${(temperature - 273.15).toFixed(2)}°C`;
    } else if (scale === 'Fahrenheit') {
      displayTemperature = `${((temperature - 273.15) * 1.8 + 32).toFixed(2)}°F`;
    } else {
      displayTemperature = `${temperature.toFixed(2)}K`;
    }
  }

  const handleScaleChange = () => {
    if (scale === 'Celsius') {
      setScale('Fahrenheit');
    } else if (scale === 'Fahrenheit') {
      setScale('Kelvin');
    } else {
      setScale('Celsius');
    }
  };

  if (temperature < 289.15) {
    color = 'radial-gradient(circle,rgba(147, 247, 255, 1) 50%,rgba(70, 95, 255,1)100%)';
  } else if (temperature < 299.15) {
    color = 'radial-gradient(circle,rgba(251, 206, 177, 1) 50%,rgba(255, 127,0,1)100%)';
  } else {
    color = 'radial-gradient(circle,rgba(255, 185, 162, 1) 50%,rgba(255, 72, 75,1)100%)';
  }
  return (
    <div>
      {displayTemperature ? (
        <div className="temperature">
          <p>{displayTemperature}</p>
          <InfoGeneral />
          <button onClick={handleScaleChange} className="button__scale">
            Cambiar escala
          </button>
          <style>{`:root { --bg-color: ${color}; }`}</style>
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default Temperature;
