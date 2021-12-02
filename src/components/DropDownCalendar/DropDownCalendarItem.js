import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DateTime } from "luxon"

import {
  selectMainSearchParams,
  setDateFrom,
  setDateTo,
  reverseDate,
  setChangedInputFrom
} from "reducers/mainSearchSlice"

import {
  selectDropDownCalendar,
  setIsOpenCalendar,
  setIsOneClick,
  setDateIntervalFrom,
  setDateIntervalTo,
  setIsDateInterval
} from "reducers/dropDownCalendarSlice"

import { monthNamesDate } from "../../constants"
import { classWithModifiers, firstToUpperCase, isPreviousDay } from "utils"

function DropDownCalendarItem({ index, active, grouped, onClick, onPointerEnter }) {
  const modifiers = []
  if (active) modifiers.push("group", "active")
  if (grouped) modifiers.push("group")

  return (
    <div className={classWithModifiers("drop-down-calendar__day", ...modifiers)} onClick={onClick} onPointerEnter={onPointerEnter}>
      <span className="drop-down-calendar__day-nam">{index}</span>
    </div>
  )
}

export default DropDownCalendarItem
