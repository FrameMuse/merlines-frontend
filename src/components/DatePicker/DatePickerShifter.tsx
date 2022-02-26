import { offsetDateMonth } from "date.helpers"
import { Dispatch } from "react"
import { classWithModifiers } from "utils"

import Icon from "../common/Icon"

interface DatePickerShifterProps {
  value: Date
  onChange: Dispatch<Date>
}

function DatePickerShifter(props: DatePickerShifterProps) {
  function shift(by: number) {
    props.onChange(offsetDateMonth(props.value, by))
  }

  const isValueOlder = props.value.getTime() < Date.now()
  return (
    <div className="date-picker__control">
      <button onClick={() => shift(-1)} type="button" tabIndex={-1} className={classWithModifiers("date-picker__control-btn", "prev")} disabled={isValueOlder}>
        <Icon className="date-picker__control-icon" name="arrow-filter" />
      </button>
      <button onClick={() => shift(+1)} type="button" tabIndex={-1} className={classWithModifiers("date-picker__control-btn", "next")}>
        <Icon className="date-picker__control-icon" name="arrow-filter" />
      </button>
    </div>
  )
}

export default DatePickerShifter
