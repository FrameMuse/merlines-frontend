import { Dispatch } from "react"
import { classWithModifiers } from "utils"

interface DatePickerDayProps {
  date: Date
  onDatePick: Dispatch<Date>
  onDateEnter: Dispatch<Date>

  active?: boolean
  group?: boolean
  disabled?: boolean
}

function DatePickerDay(props: DatePickerDayProps) {
  function onDatePick() {
    props.onDatePick(props.date)
  }

  function onDateEnter() {
    props.onDateEnter(props.date)
  }

  const modifiers: string[] = []
  if (props.active) modifiers.push("active")
  if (props.group) modifiers.push("group")
  if (props.disabled) modifiers.push("disabled")

  return (
    <button type="button" tabIndex={-1} className={classWithModifiers("date-picker__day", ...modifiers)} onClick={onDatePick} onPointerEnter={onDateEnter}>
      <span className="date-picker__day-nam">{props.date.getDate()}</span>
    </button>
  )
}

export default DatePickerDay
