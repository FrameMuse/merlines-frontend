import "./DatePicker.scss"

import { Dispatch, MutableRefObject, useEffect, useState } from "react"

import { DatePickerValue } from "./DatePicker.types"
import DatePickerGroup from "./DatePickerGroup"
import DatePickerShifter from "./DatePickerShifter"

interface DatePickerProps {
  parentRef?: MutableRefObject<HTMLDivElement | null>

  value?: DatePickerValue
  onChange?: Dispatch<DatePickerValue>

  ranged?: boolean
}

function DatePicker(props: DatePickerProps) {
  const [dates, setDates] = useState<DatePickerValue>(props.value || [null, null])

  const [cursorDate, setCursorDate] = useState<Date>(new Date)
  const [targetDate, setTargetDate] = useState<Date | null>(null)

  function updateDates(date: Date) {
    if (props.ranged) {
      const [date1, date2] = props.value || dates

      if (date1 && date2) {
        return setDates([date, null])
      }
      if (date1) {
        if (date1.getTime() > date.getTime()) {
          return setDates([date, date1])
        }
        return setDates([date1, date])
      }
    }

    setDates([date, null])
  }

  function updateTargetDate(date: Date) {
    if (!props.ranged) return
    setTargetDate(date)
  }

  useEffect(() => props.onChange?.(dates), [dates])
  return (
    <div className="date-picker" ref={props.parentRef}>
      <DatePickerShifter value={cursorDate} onChange={setCursorDate} />
      <div className="date-picker__container">
        <DatePickerGroup
          dates={props.value || dates} onDateChange={updateDates}
          cursorDate={cursorDate} onCursorDateChange={setCursorDate}
          targetDate={targetDate} onTargetDateChange={updateTargetDate}
        />
        <DatePickerGroup
          dates={props.value || dates} onDateChange={updateDates}
          cursorDate={cursorDate} onCursorDateChange={setCursorDate}
          targetDate={targetDate} onTargetDateChange={updateTargetDate}

          offset={+1}
        />
      </div>
    </div>
  )
}

export default DatePicker
