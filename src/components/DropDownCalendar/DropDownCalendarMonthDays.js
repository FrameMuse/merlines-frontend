import DropDownCalendarItem from "./DropDownCalendarItem"

function getAmountOfDays(date) {
  const newDate = new Date(date)

  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + 1)
  newDate.setDate(0)

  return newDate.getDate()
}

function DropDownCalendarMonthDays({ currentDate }) {
  function getCurrentDateWithDay(dayIndex) {
    const date = new Date(currentDate)
    date.setDate(dayIndex)

    return date
  }
  return (
    <div className="drop-down-calendar__days-list">
      {[...Array(getAmountOfDays(currentDate))].map((_, dayIndex) => (
        <DropDownCalendarItem
          date={getCurrentDateWithDay(dayIndex)}
          key={"item_" + dayIndex}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
