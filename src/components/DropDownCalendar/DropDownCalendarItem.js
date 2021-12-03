import { classWithModifiers } from "utils"

function DropDownCalendarItem({ day, active, grouped, onClick, onPointerEnter, onPointerLeave }) {
  const modifiers = []
  if (active) modifiers.push("group", "active")
  if (grouped) modifiers.push("group")

  return (
    <div className={classWithModifiers("drop-down-calendar__day", ...modifiers)} onClick={onClick} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <span className="drop-down-calendar__day-nam">{day}</span>
    </div>
  )
}

export default DropDownCalendarItem
