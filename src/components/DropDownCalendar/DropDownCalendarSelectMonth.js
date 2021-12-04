import { useCallback } from "react"

function DropDownCalendarSelectMonth({ onMonthIndexChange }) {
  const getMonthList = useCallback(() => {
    return [...Array(12)].map((_, index) => {
      const name = new Date(null, index).toLocaleDateString("ru", { month: "long" })
      return { index, name } // monthIndex, monthName
    })
  }, [onMonthIndexChange])
  return (
    <select onChange={event => onMonthIndexChange(event.currentTarget.value)} className="drop-down-calendar-select">
      {getMonthList().map((month, index) => (
        <option key={"month_" + index} value={month.index}>{month.name}</option>
      ))}
    </select>
  )
}

export default DropDownCalendarSelectMonth
