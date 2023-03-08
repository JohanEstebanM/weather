import React, { useState, useEffect } from 'react';
import { getApiTemp } from '../utils/getApiTemp';
import { getCurrentPosition } from '../utils/getCurrentPosition';

const InfoGeneral = () => {
  const [pressure, setpressure] = useState(null);
  const [humidity, sethumidity] = useState(null);
  const [windSpeed, setwindSpeed] = useState(null);

  useEffect(() => {
    getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        return getApiTemp({ latitude, longitude });
      })
      .then((apiResults) => {
        const pres = apiResults.main.pressure;
        const hum = apiResults.main.humidity;
        const Speed = apiResults.wind.speed;
        setpressure(pres);
        sethumidity(hum);
        setwindSpeed(Speed);
      });
  }, []);
  return (
    <div>
      {pressure && humidity && windSpeed ? (
        <div className="infoGeneral">
          <p>Presion: {pressure}hPa</p>
          <p>Humedad: {humidity}%</p>
          <p>Velocidad del viento: {windSpeed}m/s</p>
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default InfoGeneral;
