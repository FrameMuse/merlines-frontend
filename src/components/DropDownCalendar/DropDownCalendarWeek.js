import { weekDays } from "../../constants"
import DropDownCalendarWeekDay from "./DropDownCalendarWeekDay"

function DropDownCalendarWeek() {
  return (
    <div className="drop-down-calendar__row">
      {weekDays.map((day, index) => (
        <DropDownCalendarWeekDay key={index} day={day} />
      ))}
    </div>
  )
}

export default DropDownCalendarWeek
