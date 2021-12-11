// SCSS
import "./drop-down-calendar.scss"

import { Dispatch, MutableRefObject, useEffect, useReducer } from "react"
import { classWithModifiers } from "utils"

import DateCalendarContext from "./DropDownCalendarContext"
import DropDownCalendarMonth from "./DropDownCalendarMonth"
import DateCalendarReducer, { DateCalendarInitialState, DateCalendarState, updateDateCalendarHasGrouping } from "./DropDownCalendarReducer"
import DropDownCalendarSlider from "./DropDownCalendarSlider"


interface DropDownCalendarProps {
  hasGrouping?: boolean
  hasOffset?: boolean
  parentRef?: MutableRefObject<HTMLDivElement | null>

  isHidden: boolean
  setIsHidden: Dispatch<boolean>

  onChange: Dispatch<DateCalendarState>
}

function DropDownCalendar(props: DropDownCalendarProps) {
  const [state, dispatch] = useReducer(DateCalendarReducer, DateCalendarInitialState)

  useEffect(() => props.onChange(state), [state.dates])
  useEffect(() => dispatch(updateDateCalendarHasGrouping(props.hasGrouping)), [props.hasGrouping])


  const modifiers = []

  if (props.isHidden) modifiers.push("hidden")
  if (props.hasOffset) modifiers.push("offset")

  return (
    <div className={classWithModifiers("drop-down-calendar", ...modifiers)} ref={props.parentRef}>
      <DateCalendarContext.Provider value={[state, dispatch]}>
        <DropDownCalendarSlider />
        <div className="drop-down-calendar__container">
          <button onClick={() => props.setIsHidden(true)} className="drop-down-calendar__close-btn">Закрыть</button>
          <DropDownCalendarMonth />
          <DropDownCalendarMonth secondary />
        </div>
      </DateCalendarContext.Provider>
    </div>
  )
}

export default DropDownCalendar
