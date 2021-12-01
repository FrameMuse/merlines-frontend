import { useState } from 'react';
import Svg from './Svg';

function OpenBooking() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="checkbox form__checkbox">
      <input
        className="checkbox-input"
        type="checkbox"
        id="check"
        defaultChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        disabled={true}
      />
      <label className="checkbox-label" htmlFor="check">
        <Svg svgClass="checkbox-icon" svgName="checkbox" svgWidth="15" svgHeight="15" />
        Открыть Booking.com
      </label>
    </div>
  )
};

export default OpenBooking;
