import { useCallback } from "react"

function DropDownCalendarSelectMonth({ currentDate, onMonthIndexChange }) {
  const getMonthList = useCallback(() => {
    return [...Array(12)].map((_, index) => {
      const date = new Date(currentDate)
      date.setMonth(index)
      const name = date.toLocaleDateString("ru", { month: "long" })
      return { index, name, date } // monthIndex, monthName
    })
  }, [currentDate, onMonthIndexChange])
  return (
    <select className="drop-down-calendar-select" value={currentDate.getMonth()} onChange={event => onMonthIndexChange(event.currentTarget.value)}>
      {getMonthList().map((month, index) => (
        <option
          value={month.index}
          children={month.name}
          disabled={month.date.getTime() < Date.now()}
          key={"month_" + index}
        />
      ))}
    </select>
  )
}

export default DropDownCalendarSelectMonth
