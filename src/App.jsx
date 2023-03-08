import './App.css';
import ImgTemp from './assets/components/ImgTemp';
import Location from './assets/components/Location';
import Temperature from './assets/components/Temperature';

const App = () => {
  return (
    <div className="div__main">
      <Temperature />
      <div className="div__location-img">
        <Location />
        <ImgTemp />
      </div>
    </div>
  );
};

export default App;
