import { offsetDateMonth, setDateMonth } from "date.helpers"
import { ChangeEvent, Dispatch, useCallback } from "react"

interface DatePickerMonthSelectProps {
  value: Date
  onChange: Dispatch<Date>
}



function DatePickerMonthSelect(props: DatePickerMonthSelectProps) {
  const getMonthList = useCallback(() => {
    return [...Array(12)].map((_, index) => {
      const date = setDateMonth(props.value, index)
      const name = date.toLocaleDateString("ru", { month: "long" })
      return { index, name, date }
    })
  }, [props.value, onChange])
  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    props.onChange(setDateMonth(props.value, +event.currentTarget.value))
  }
  return (
    <select className="date-picker-select" tabIndex={-1} value={props.value.getMonth()} onChange={onChange}>
      {getMonthList().map((month, index) => (
        <option
          value={month.index}
          children={month.name}
          disabled={offsetDateMonth(month.date, +1).getTime() < Date.now()}
          key={index}
        />
      ))}
    </select>
  )
}

export default DatePickerMonthSelect
