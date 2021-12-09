import DropDownCalendarItem from "./DropDownCalendarItem"

const weekdays = [null, "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getAmountOfDays(date) {
  const newDate = new Date(date)

  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + 1)
  newDate.setDate(0)

  return newDate.getDate()
}

function getFirstWeekday(date) {
  const newDate = new Date(date)
  newDate.setDate(1)

  const weekday = newDate.toLocaleDateString("en", { weekday: "short" })
  return weekdays.indexOf(weekday)
}

function DropDownCalendarMonthDays({ currentDate }) {
  function getCurrentDateWithDay(dayIndex) {
    const date = new Date(currentDate)
    date.setDate(dayIndex)

    return date
  }

  return (
    <div className="drop-down-calendar__days-list" style={{ "--first-week-day": getFirstWeekday(currentDate) }}>
      {[...Array(getAmountOfDays(currentDate))].map((_, dayIndex) => (
        <DropDownCalendarItem
          date={getCurrentDateWithDay(dayIndex + 1)}
          key={"item_" + dayIndex}
        />
      ))}
    </div>
  )
}

export default DropDownCalendarMonthDays
