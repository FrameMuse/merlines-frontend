import React from "react"
import { useDispatch,useSelector } from "react-redux"

import {
  pickAirClass,
  selectMainSearchParams} from "../../reducers/mainSearchSlice"

function DropDownPassengersClass({ classId, classType }) {
  const dispatch = useDispatch()
  const mainSearchParams = useSelector(selectMainSearchParams)

  const pickClass = () => dispatch(pickAirClass({ type: classId }))

  return (
    <div className="passengers-list__checkbox">
      <input
        className="passengers-list__checkbox-input"
        type="checkbox"
        id={`passengers-list-${classId}`}
        onChange={pickClass}
        checked={mainSearchParams.airClasses[classId]}
      />
      <label
        className="passengers-list__checkbox-label"
        htmlFor={`passengers-list-${classId}`}
      >
        {classType}
      </label>
    </div>
  )
}

export default DropDownPassengersClass
