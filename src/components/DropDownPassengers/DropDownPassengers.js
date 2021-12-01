import { passengerTypes, passengerClasses } from '../../constants';
import DropDownPassengersItem from './DropDownPassengersItem';
import DropDownPassengersClass from './DropDownPassengersClass';
import React from "react";
import './passengers-list.scss'

function DropDownPassengers({ isPassengersOpen }) {
  return (
    <ul className={`passengers-list ${!isPassengersOpen ? "block-hidden" : ""}`}>
      <li className="passengers-list__item">
        {passengerTypes.map(passenger =>
          <DropDownPassengersItem key={passenger.name} name={passenger.name} age={passenger.age}
            apiParam={passenger.apiParam} />)}
      </li>
      <li className="passengers-list__item">
        {passengerClasses.map(passengerClass =>
          <DropDownPassengersClass key={passengerClass.classId} classId={passengerClass.classId}
            classType={passengerClass.classType} />)}
      </li>
    </ul>
  )
};

export default DropDownPassengers;
