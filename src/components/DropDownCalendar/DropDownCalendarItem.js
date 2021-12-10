import { useDispatch, useSelector } from "react-redux"
import { classWithModifiers } from "utils"

import { updateSearchCalendarDates, updateSearchCalendarHoveredDate } from "./DropDownCalendarReducer"

/**
 *
 * @param {{date: Date}} param0
 * @returns
 */
function DropDownCalendarItem({ date }) {
  const dispatch = useDispatch()
  const searchCalendar = useSelector(state => state.searchCalendar)

  const dateNow = new Date
  const dateTime = date.getTime()
  const firstDateTime = searchCalendar.dates.first?.getTime()
  const secondDateTime = searchCalendar.dates.second?.getTime()
  const hoveredDateTime = searchCalendar.hoveredDate?.getTime()

  function onClick() {
    if (searchCalendar.mode === "double") {
      if (searchCalendar.dates.second == null) {
        dispatch(updateSearchCalendarDates({ second: date }))
        return
      }
    }

    dispatch(updateSearchCalendarDates({ first: date, second: null }))
  }

  function onPointerEnter() {
    if (searchCalendar.mode === "single") return false

    dispatch(updateSearchCalendarHoveredDate(date))
  }

  function shouldBeGrouped() {
    // Never group when mode is single
    if (searchCalendar.mode === "single") return false
    // Group when active
    if (dateTime >= firstDateTime && dateTime <= secondDateTime) {
      return true
    }

    if (secondDateTime) return false
    // Group on hover
    if (dateTime >= hoveredDateTime && dateTime <= firstDateTime) {
      return true
    }
    if (dateTime <= hoveredDateTime && dateTime >= firstDateTime) {
      return true
    }

    return false
  }

  const modifiers = []
  if ([firstDateTime, secondDateTime].includes(dateTime)) {
    modifiers.push("active")
  }
  if (shouldBeGrouped()) modifiers.push("group")
  if (dateNow.getTime() > date.getTime() && dateNow.getDate() > date.getDate()) {
    modifiers.push("disabled")
  }

  return (
    <div className={classWithModifiers("drop-down-calendar__day", ...modifiers)} onClick={onClick} onPointerEnter={onPointerEnter}>
      <span className="drop-down-calendar__day-nam">{date.getDate()}</span>
    </div>
  )
}

export default DropDownCalendarItem
