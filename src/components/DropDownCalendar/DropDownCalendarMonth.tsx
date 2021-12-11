import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { capitalize } from "utils"

import Svg from "../common/Svg"
import DateCalendarContext from "./DropDownCalendarContext"
import DropDownCalendarMonthDays from "./DropDownCalendarMonthDays"
import { updateDateCalendarCursorDate } from "./DropDownCalendarReducer"
import DropDownCalendarSelectMonth from "./DropDownCalendarSelectMonth"
import DropDownCalendarWeek from "./DropDownCalendarWeek"

interface DropDownCalendarMonthProps {
  secondary?: boolean
}

function DropDownCalendarMonth(props: DropDownCalendarMonthProps) {
  const [state, dispatch] = useContext(DateCalendarContext)
  const cursorDate = new Date(state.cursorDate)
  if (props.secondary) {
    cursorDate.setMonth(cursorDate.getMonth() + 1)
  }
  const monthName = cursorDate.toLocaleDateString("ru", { month: "long" })
  const fullYear = cursorDate.getFullYear()

  function monthUpdate(monthIndex: number) {
    const newDate = new Date(cursorDate)
    newDate.setMonth(props.secondary ? (monthIndex - 1) : monthIndex)

    dispatch(updateDateCalendarCursorDate(newDate))
  }

  return (
    <div className="drop-down-calendar__wrap drop-down-calendar__wrap--active">
      <div className="drop-down-calendar__month-wrap">
        <div className="drop-down-calendar__header">
          <div className="drop-down-calendar__title">
            <span className="drop-down-calendar__month">{capitalize(monthName)}</span>
            <span className="drop-down-calendar__year"> {fullYear}</span>
          </div>

          <div className="drop-down-calendar__month-control">
            <Svg
              svgClass="drop-down-calendar-arrow drop-down-calendar-arrow--top"
              svgName="arrow-filter"
              svgWidth="8"
              svgHeight="7"
            />
            <Svg
              svgClass="drop-down-calendar-arrow drop-down-calendar-arrow--bottom"
              svgName="arrow-filter"
              svgWidth="8"
              svgHeight="7"
            />
          </div>
          <DropDownCalendarSelectMonth currentDate={cursorDate} onMonthIndexChange={monthUpdate} />
        </div>
      </div>
      <div className="drop-down-calendar__dates">
        <DropDownCalendarWeek />
        <DropDownCalendarMonthDays currentDate={cursorDate} />
      </div>
    </div>
  )
}

export default DropDownCalendarMonth
