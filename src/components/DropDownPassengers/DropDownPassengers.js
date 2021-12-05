// SCSS
import "./passengers-list.scss"

import React from "react"

// ...
import { passengerClasses,passengerTypes } from "../../constants"
import DropDownPassengersClass from "./DropDownPassengersClass"
import DropDownPassengersItem from "./DropDownPassengersItem"

function DropDownPassengers({ parentRef, isPassengersOpen }) {
  return (
    <ul
      className={`passengers-list ${
        !isPassengersOpen ? "passengers-list--hidden" : ""
      }`}
      ref={parentRef}
    >
      <li className="passengers-list__item">
        {passengerTypes.map((passenger) => (
          <DropDownPassengersItem
            key={passenger.name}
            name={passenger.name}
            age={passenger.age}
            apiParam={passenger.apiParam}
          />
        ))}
      </li>
      <li className="passengers-list__item">
        {passengerClasses.map((passengerClass) => (
          <DropDownPassengersClass
            key={passengerClass.classId}
            classId={passengerClass.classId}
            classType={passengerClass.classType}
          />
        ))}
      </li>
    </ul>
  )
}

export default DropDownPassengers
