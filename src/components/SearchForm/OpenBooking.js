import { useState } from "react"

import Icon from "./Icon"

function OpenBooking() {
  const [isChecked, setIsChecked] = useState(false)

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
        <Icon
          className="checkbox-icon"
          name="checkbox"
          width="15"
          height="15"
        />
        Открыть Booking.com
      </label>
    </div>
  )
}

export default OpenBooking
