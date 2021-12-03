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

  function shouldBeGrouped() {
    if (searchCalendar.mode === "single") return false
    if (searchCalendar.dates.first == null) return false

    return true
  }
  function isItemActive(index) {
    const thisDate = getCurrentDateWithDay(index)
    // Comparing by getTime because the rest of the data is the same
    if (Object.values(searchCalendar.dates).some(date => date?.getTime() === thisDate.getTime())) {
      return true
    }

    return false
  }
  function isItemGrouped(index) {
    if (!shouldBeGrouped()) return false

    if (enteredIndex === index) return true

    const thisDate = getCurrentDateWithDay(index)
    const firstDate = searchCalendar.dates.first
    const secondDate = searchCalendar.dates.second

    if (thisDate.getTime() >= firstDate?.getTime() && thisDate.getTime() <= secondDate?.getTime()) {
      return true
    }

    return false
  }

  function onDayClick(dayIndex) {
    const newDate = getCurrentDateWithDay(dayIndex)

    if (searchCalendar.dates.first == null) {
      dispatch(updateSearchCalendarDates({ first: newDate, second: null }))
      return
    }

    if (searchCalendar.dates.second == null) {
      dispatch(updateSearchCalendarDates({ second: newDate }))
      return
    }

    dispatch(updateSearchCalendarDates({ first: null }))
  }
  return (
    <div className="drop-down-calendar__days-list">
      {[...Array(getAmountOfDays(currentDate))].map((_, index) => (
        <DropDownCalendarItem
          day={index + 1}
          active={isItemActive(index)}
          grouped={isItemGrouped(index)}
          onClick={() => onDayClick(index)}
          onPointerEnter={() => setEnteredIndex(index)}
          onPointerLeave={() => setEnteredIndex(-1)}
          key={"item_" + index}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
