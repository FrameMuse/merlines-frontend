import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DropDownCalendarItem from "./DropDownCalendarItem"
import { updateSearchCalendarDates } from "./DropDownCalendarReducer"

function getAmountOfDays(date) {
  const newDate = new Date(date)

  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + 1)
  newDate.setDate(0)

  return newDate.getDate()
}

function DropDownCalendarMonthDays({ currentDate }) {
  const dispatch = useDispatch()
  const searchCalendar = useSelector(state => state.searchCalendar)
  const [enteredIndex, setEnteredIndex] = useState(-1)
  function getCurrentDateWithDay(dayIndex) {
    const date = new Date(currentDate)
    date.setDate(dayIndex)

    return date
  }

  function shouldDayBeGrouped() {
    if (searchCalendar.mode === "single") return false
    if (searchCalendar.dates.first == null) return false

    return true
  }
  function isDayActive(dayIndex) {
    const thisDate = getCurrentDateWithDay(dayIndex)
    // Comparing by getTime because the rest of the data is the same
    if (Object.values(searchCalendar.dates).some(date => date?.getTime() === thisDate.getTime())) {
      return true
    }

    return false
  }
  function isDayGrouped(dayIndex) {
    if (!shouldDayBeGrouped()) return false

    if (enteredIndex === dayIndex) return true

    const thisDate = getCurrentDateWithDay(dayIndex)
    const firstDate = searchCalendar.dates.first
    const secondDate = searchCalendar.dates.second

    if (thisDate.getTime() >= firstDate?.getTime() && thisDate.getTime() <= secondDate?.getTime()) {
      return true
    }

    return false
  }

  function onDayClick(dayIndex) {
    const newDate = getCurrentDateWithDay(dayIndex)

    if (searchCalendar.dates.second == null) {
      dispatch(updateSearchCalendarDates({ second: newDate }))
      return
    }

    dispatch(updateSearchCalendarDates({ first: newDate, second: null }))
  }
  return (
    <div className="drop-down-calendar__days-list">
      {[...Array(getAmountOfDays(currentDate))].map((_, dayIndex) => (
        <DropDownCalendarItem
          day={dayIndex + 1}
          active={isDayActive(dayIndex)}
          grouped={isDayGrouped(dayIndex)}
          onClick={() => onDayClick(dayIndex)}
          onPointerEnter={() => setEnteredIndex(dayIndex)}
          onPointerLeave={() => setEnteredIndex(-1)}
          key={"item_" + dayIndex}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
