import { weekDays } from "../../constants"

function DropDownCalendarWeek() {
  return (
    <div className="drop-down-calendar__row">
      {weekDays.map((day, index) => (
        <div className="drop-down-calendar__day-name" key={index}>
          <span>{day}</span>
        </div>
      ))}
    </div>
  )
}

export default DropDownCalendarWeek
