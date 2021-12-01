import { useState } from 'react';
import Slider from '../Slider/Slider';

function PriceCalendarVacationSlider() {
  const [fromInterval, setFromInterval] = useState({});
  const [toInterval, setToInterval] = useState([]);

  return (
    <div className="range calendar__range">
      <h3 className="range__title">Продолжительность отпуска</h3>
      <div className="range__time">
        <span className="range__time-item">{`от ${fromInterval} дней`}</span>
        <span className="range__time-item">{`до ${toInterval} дней`}</span>
      </div>
      <Slider
        className="horizontal-slider"
        thumbClassName="horizontal-slider__thumb"
        trackClassName="horizontal-slider__track"
        defaultValue={[7, 14]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        pearling
        minDistance={1}
        interval={state => {
          setFromInterval(state[0]);
          setToInterval(state[1]);
        }}
      />
    </div>
  );
};

export default PriceCalendarVacationSlider;
