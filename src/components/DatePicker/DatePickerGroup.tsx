import { getAmountOfDays, getFirstWeekday, offsetDateMonth, setDateDay } from "date.helpers"
import { Dispatch } from "react"
import { capitalize, classWithModifiers, dateToMonthName } from "utils"

import { weekDays } from "../../constants"
import Icon from "../common/Icon"
import { DatePickerValue } from "./DatePicker.types"
import DatePickerDay from "./DatePickerDay"
import DatePickerMonthSelect from "./DatePickerMonthSelect"

interface DatePickerGroupProps {
  dates: DatePickerValue
  onDateChange: Dispatch<Date>

  cursorDate: Date
  onCursorDateChange: Dispatch<Date>

  targetDate: Date | null
  onTargetDateChange: Dispatch<Date>

  offset?: number
}

function DatePickerGroup(props: DatePickerGroupProps) {
  const cursorDate = offsetDateMonth(props.cursorDate, props.offset || 0)
  const onCursorDateChange = (date: Date) => props.onCursorDateChange(offsetDateMonth(date, -(props.offset || 0)))

  const monthName = dateToMonthName(cursorDate)
  const fullYear = cursorDate.getFullYear()
  return (
    <div className="date-picker__wrap date-picker__wrap--active">
      <div className="date-picker__month-wrap">
        <div className="date-picker__header">
          <div className="date-picker__title">
            <span className="date-picker__month">{capitalize(monthName)}</span>
            <span className="date-picker__year"> {fullYear}</span>
          </div>
          <div className="date-picker__month-control">
            <Icon name="arrow-filter" className={classWithModifiers("date-picker-arrow", "top")} />
            <Icon name="arrow-filter" className={classWithModifiers("date-picker-arrow", "bottom")} />
          </div>
          <DatePickerMonthSelect value={cursorDate} onChange={onCursorDateChange} />
        </div>
      </div>
      <div className="date-picker__dates">
        <div className="date-picker__row">
          {weekDays.map((day, index) => (
            <div className="date-picker__day-name" key={index}>
              <span>{day}</span>
            </div>
          ))}
        </div>
        <div className="date-picker__days-list" style={{ "--first-week-day": getFirstWeekday(cursorDate) }}>
          {[...Array(getAmountOfDays(cursorDate))].map((_, index) => {
            const date = setDateDay(cursorDate, index + 1)
            return (
              <DatePickerDay
                date={date}
                onDatePick={props.onDateChange}
                onDateEnter={props.onTargetDateChange}

                active={someDatesEqual(date, ...props.dates)}
                group={isInDatesInterval(date, props.dates, props.targetDate)}
                disabled={setDateDay(cursorDate, index + 2).getTime() < Date.now()}

                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DatePickerGroup


function isInDatesInterval(comparedDate: Date, dates: DatePickerValue, targetDate: Date | null) {
  const comparedTime = comparedDate.getTime()
  const time1 = dates[0]?.getTime() || NaN
  const time2 = dates[1]?.getTime() || NaN
  const targetTime = targetDate?.getTime() || NaN
  // Group when active
  if (comparedTime >= time1 && comparedTime <= time2) {
    return true
  }

  if (time2) return false
  // Group on hover
  if (comparedTime >= time1 && comparedTime <= targetTime) {
    return true
  }
  if (comparedTime <= time1 && comparedTime >= targetTime) {
    return true
  }

  return false
}

function someDatesEqual(comparedDate: Date, ...dates: (Date | null | undefined)[]) {
  return dates.some(date => (
    !!date
    && date.getDate() === comparedDate.getDate()
    && date.getMonth() === comparedDate.getMonth()
    && date.getFullYear() === comparedDate.getFullYear()
  ))
}
