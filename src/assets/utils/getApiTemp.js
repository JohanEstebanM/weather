import axios from 'axios';

export const getApiTemp = async (position) => {
  const lat = position.latitude;
  const lon = position.longitude;

  try {
    const results = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6f40377e150d1ad6f8954561e83aa2f3`,
    );
    const apiResults = results.data;
    return apiResults;
  } catch (error) {
    console.log(error);
  }
};
