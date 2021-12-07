import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { classWithModifiers } from "utils"

import Svg from "../common/Svg"
import { updateSearchCalendarCursorDate } from "./DropDownCalendarReducer"

function DropDownCalendarSlider() {
  const dispatch = useDispatch()
  const searchCalendar = useSelector(state => state.searchCalendar)
  const isCursorDatePast = searchCalendar.cursorDate.getTime() < Date.now()

  const modifiers = ["prev"]
  if (isCursorDatePast) modifiers.push("disabled")

  function prev() {
    if (isCursorDatePast) return

    const newDate = new Date(searchCalendar.cursorDate)
    newDate.setMonth(newDate.getMonth() - 1)

    dispatch(updateSearchCalendarCursorDate(newDate))
  }

  function next() {
    const newDate = new Date(searchCalendar.cursorDate)
    newDate.setMonth(newDate.getMonth() + 1)

    dispatch(updateSearchCalendarCursorDate(newDate))
  }

  useEffect(() => {
    searchCalendar
  }, [searchCalendar])

  return (
    <div className="drop-down-calendar__control">
      <button onClick={prev} tabIndex="-1" className={classWithModifiers("drop-down-calendar__control-btn", ...modifiers)}>
        <Svg
          svgClass="drop-down-calendar__control-icon"
          svgName="arrow-filter"
          svgWidth="10"
          svgHeight="10"
        />
      </button>
      <button onClick={next} tabIndex="-1" className="drop-down-calendar__control-btn drop-down-calendar__control-btn--next">
        <Svg
          svgClass="drop-down-calendar__control-icon"
          svgName="arrow-filter"
          svgWidth="10"
          svgHeight="10"
        />
      </button>
    </div>
  )
}

export default DropDownCalendarSlider
