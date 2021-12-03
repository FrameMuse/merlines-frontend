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
  function shouldBeGrouped() {
    if (searchCalendar.mode === "single") return false
    if (searchCalendar.dates.first == null) return false

    return true
  }
  function isActive(index) {
    const comparedDate = new Date(currentDate)
    comparedDate.setDate(index)

    if (Object.values(searchCalendar.dates).some(date => date?.getTime() === comparedDate.getTime())) {
      return true
    }

    return false
  }
  function isGrouped(index) {
    if (!shouldBeGrouped()) return false

    if (enteredIndex === index) return true
    // if (enteredIndex > index && activeIndex < index) return true
    // if (activeIndex > index && enteredIndex < index) return true

    return false
  }

  function updateDate(dayIndex) {
    const first = new Date(currentDate)
    first.setDate(dayIndex)

    dispatch(updateSearchCalendarDates({ first }))
  }
  console.log(searchCalendar.dates)
  return (
    <div className="drop-down-calendar__days-list">
      {[...Array(getAmountOfDays(currentDate))].map((_, index) => (
        <DropDownCalendarItem
          day={index + 1}
          active={isActive(index)}
          grouped={isGrouped(index)}
          onClick={() => updateDate(index)}
          onPointerEnter={() => setEnteredIndex(index)}
          key={"item_" + index}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
