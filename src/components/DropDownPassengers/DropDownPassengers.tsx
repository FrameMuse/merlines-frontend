// SCSS
import "./passengers-list.scss"

import DropDownPassengersItem from "./DropDownPassengersItem"
import DropDownPassengersTravelClass from "./DropDownPassengersTravelClass"

function DropDownPassengers() {
  return (
    <div className="passengers-list">
      <div className="passengers-list__item">
        <DropDownPassengersItem name="adults" />
        <DropDownPassengersItem name="children" />
        <DropDownPassengersItem name="infants" />
      </div>
      <div className="passengers-list__item">
        <DropDownPassengersTravelClass name={1} />
        <DropDownPassengersTravelClass name={2} />
      </div>
    </div>
  )
}

export default DropDownPassengers
