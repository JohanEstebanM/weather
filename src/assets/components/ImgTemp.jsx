import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getApiTemp } from '../utils/getApiTemp';
import { getCurrentPosition } from '../utils/getCurrentPosition';

const ImgTemp = () => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        return getApiTemp({ latitude, longitude });
      })
      .then((apiResults) => {
        const iconId = apiResults.weather[0].icon;
        setIcon(iconId);
      });
  }, []);

  const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await axios.get(
          `https://openweathermap.org/img/wn/${icon}@2x.png`,
        );
        setIconUrl(response.config.url);
      } catch (error) {
        console.log(error);
      }
    };

    if (icon) {
      fetchIcon();
    }
  }, [icon]);

  return (
    <div>
      {iconUrl ? (
        <div>
          <img src={iconUrl} alt="temperature" className="img__temperature" />
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default ImgTemp;
