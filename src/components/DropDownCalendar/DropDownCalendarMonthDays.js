import { useState } from "react"
import DropDownCalendarItem from "./DropDownCalendarItem"

function DropDownCalendarMonthDays() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [enteredIndex, setEnteredIndex] = useState(-1)
  return (
    <div className="drop-down-calendar__days-list">
      {[...Array(31)].map((_, index) => (
        <DropDownCalendarItem
          index={index + 1}
          active={index === activeIndex}
          grouped={activeIndex > 0 && ((enteredIndex > index && activeIndex < index) || (activeIndex > index && enteredIndex < index) || (index === enteredIndex))}
          onClick={() => setActiveIndex(index)}
          onPointerEnter={() => setEnteredIndex(index)}
          key={"item_" + index}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
