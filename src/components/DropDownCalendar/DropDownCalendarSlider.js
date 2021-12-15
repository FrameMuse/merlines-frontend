import { useContext, useEffect } from "react"
import { classWithModifiers } from "utils"

import Icon from "../common/Icon"
import DateCalendarContext from "./DropDownCalendarContext"
import { updateDateCalendarCursorDate } from "./DropDownCalendarReducer"

function DropDownCalendarSlider() {
  const [state, dispatch] = useContext(DateCalendarContext)
  const isCursorDatePast = state.cursorDate.getTime() < Date.now()

  const modifiers = ["prev"]
  if (isCursorDatePast) modifiers.push("disabled")

  function prev() {
    if (isCursorDatePast) return

    const newDate = new Date(state.cursorDate)
    newDate.setMonth(newDate.getMonth() - 1)

    dispatch(updateDateCalendarCursorDate(newDate))
  }

  function next() {
    const newDate = new Date(state.cursorDate)
    newDate.setMonth(newDate.getMonth() + 1)

    dispatch(updateDateCalendarCursorDate(newDate))
  }

  useEffect(() => {
    state
  }, [state])

  return (
    <div className="drop-down-calendar__control">
      <button onClick={prev} type="button" tabIndex="-1" className={classWithModifiers("drop-down-calendar__control-btn", ...modifiers)}>
        <Icon
          className="drop-down-calendar__control-icon"
          name="arrow-filter"
          width="10"
          height="10"
        />
      </button>
      <button onClick={next} type="button" tabIndex="-1" className="drop-down-calendar__control-btn drop-down-calendar__control-btn--next">
        <Icon
          className="drop-down-calendar__control-icon"
          name="arrow-filter"
          width="10"
          height="10"
        />
      </button>
    </div>
  )
}

export default DropDownCalendarSlider
