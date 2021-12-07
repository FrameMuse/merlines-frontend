// SCSS
import "./drop-down-calendar.scss"

// ...
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { classWithModifiers } from "../../utils"
import DropDownCalendarMonth from "./DropDownCalendarMonth"
import { updateSearchCalendarIsOpen } from "./DropDownCalendarReducer"
import DropDownCalendarSlider from "./DropDownCalendarSlider"

function DropDownCalendar({ parentRef, hasOffset }) {
  const dispatch = useDispatch()
  const searchCalendar = useSelector(state => state.searchCalendar)
  // Close Calendar on 'Escape' key
  useEffect(() => {
    function escapeCloseEvent(event) {
      if (event.key === "Escape") {
        dispatch(updateSearchCalendarIsOpen(false))
      }
    }

    window.addEventListener("keydown", escapeCloseEvent)
    return () => window.removeEventListener("keydown", escapeCloseEvent)
  }, [dispatch])

  const modifiers = []

  if (hasOffset) modifiers.push("offset")
  if (!searchCalendar.isOpen) modifiers.push("hidden")

  return (
    <div className={classWithModifiers("drop-down-calendar", ...modifiers)} ref={parentRef}>
      <DropDownCalendarSlider />
      <div className="drop-down-calendar__container">
        <button onClick={() => dispatch(updateSearchCalendarIsOpen(false))} className="drop-down-calendar__close-btn">Закрыть</button>
        <DropDownCalendarMonth />
        <DropDownCalendarMonth secondary />
      </div>
    </div>
  )
}

export default DropDownCalendar
