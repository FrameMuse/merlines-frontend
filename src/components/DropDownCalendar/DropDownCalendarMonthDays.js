import { useState } from "react"
import { useSelector } from "react-redux"
import DropDownCalendarItem from "./DropDownCalendarItem"

function getAmountOfDays(date) {
  const newDate = new Date(date)

  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + 1)
  newDate.setDate(0)

  return newDate.getDate()
}

function DropDownCalendarMonthDays({ date }) {
  const searchCalendar = useSelector(state => state.searchCalendar)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [enteredIndex, setEnteredIndex] = useState(-1)
  function shouldBeGrouped() {
    if (activeIndex < 0) return false
    if (searchCalendar.mode === "single") return false

    return true
  }
  function isGrouped(index) {
    if (!shouldBeGrouped()) return false

    if (enteredIndex === index) return true
    if (enteredIndex > index && activeIndex < index) return true
    if (activeIndex > index && enteredIndex < index) return true

    return false
  }
  return (
    <div className="drop-down-calendar__days-list">
      {[...Array(getAmountOfDays(date))].map((_, index) => (
        <DropDownCalendarItem
          day={index + 1}
          active={index === activeIndex}
          grouped={isGrouped(index)}
          onClick={() => setActiveIndex(index)}
          onPointerEnter={() => setEnteredIndex(index)}
          key={"item_" + index}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
