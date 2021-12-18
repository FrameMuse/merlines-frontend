// SCSS
import "./passengers-list.scss"

// import { useEffect, useRef, useState } from "react"
// import { useClickAway } from "react-use"
import { classWithModifiers } from "utils"

import DropDownPassengersItem from "./DropDownPassengersItem"
import DropDownPassengersTravelClass from "./DropDownPassengersTravelClass"

function DropDownPassengers() {
  return (
    <div className="passengers-list">
      <div className="passengers-list__item">
        <DropDownPassengersItem name="adults" />
        <DropDownPassengersItem name="children" />
        <DropDownPassengersItem name="babies" />
      </div>
      <div className="passengers-list__item">
        <DropDownPassengersTravelClass name="economy" />
        <DropDownPassengersTravelClass name="business" />
      </div>
    </div>
  )
}

export default DropDownPassengers
