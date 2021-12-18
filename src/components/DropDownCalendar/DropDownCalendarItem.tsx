import { useContext } from "react"
import { classWithModifiers } from "utils"

import DateCalendarContext from "./DropDownCalendarContext"
import { updateDateCalendarDates, updateDateCalendarHoveredDate } from "./DropDownCalendarReducer"


interface DropDownCalendarItemProps {
  date: Date
}

function DropDownCalendarItem(props: DropDownCalendarItemProps) {
  const [state, dispatch] = useContext(DateCalendarContext)

  const dateNow = new Date
  const dateTime = props.date.getTime()
  const firstDateTime = state.dates.first.getTime()
  const secondDateTime = state.dates.second?.getTime() || NaN
  const hoveredDateTime = state.hoveredDate?.getTime() || NaN

  function onClick() {
    if (state.hasGrouping && state.dates.second === null) {
      dispatch(updateDateCalendarDates({ ...state.dates, second: props.date }))
      return
    }

    dispatch(updateDateCalendarDates({ first: props.date, second: null }))
  }

  function onPointerEnter() {
    if (!state.hasGrouping) return

    dispatch(updateDateCalendarHoveredDate(props.date))
  }

  function shouldBeGrouped() {
    // Only when grouping
    if (!state.hasGrouping) return false
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
  if (dateNow.getTime() > props.date.getTime() && dateNow.getDate() > props.date.getDate()) {
    modifiers.push("disabled")
  }

  return (
    <div className={classWithModifiers("drop-down-calendar__day", ...modifiers)} onClick={onClick} onPointerEnter={onPointerEnter}>
      <span className="drop-down-calendar__day-nam">{props.date.getDate()}</span>
    </div>
  )
}

export default DropDownCalendarItem
