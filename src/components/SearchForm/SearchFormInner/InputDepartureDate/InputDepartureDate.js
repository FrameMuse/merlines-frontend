import DropDownCalendar from "../../../DropDownCalendar/DropDownCalendar"
import React, { useEffect, useRef, useState } from "react"
import { setIsOpenCalendar } from "../../../../reducers/dropDownCalendarSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectMainSearchParams } from "../../../../reducers/mainSearchSlice"

const InputDepartureDate = ({ dateFromInputRef, dateToInputRef }) => {
  const dispatch = useDispatch()

  const [currentDepartureDate, setCurrentDepartureDate] = useState("")

  const mainSearchParams = useSelector(selectMainSearchParams)
  const { date } = useSelector(selectMainSearchParams)

  useEffect(() => {
    const handleOverlayClose = (evt) => {
      const eventTargetClosest = !!evt.target.closest(
        ".form__group.form__group--date-dep"
      )
      const isCalendarDisplayed = !document.querySelector(
        ".drop-down-calendar.block-hidden"
      )
      if (!eventTargetClosest && isCalendarDisplayed) {
        openCalendar()
      }
    }
    document.addEventListener("click", handleOverlayClose)
    return () => {
      document.removeEventListener("click", handleOverlayClose)
    }
  })

  useEffect(() => {
    const {
      front: { to, from }
    } = date
    setCurrentDepartureDate(from)
  }, [date])

  const openCalendar = () => {
    dispatch(setIsOpenCalendar())
  }

  return (
    <div className="form__group form__group--date-dep">
      <input
        onClick={openCalendar}
        className="form__input"
        id="date-departure"
        placeholder="Туда"
        value={currentDepartureDate || mainSearchParams.date.changedInput.from}
        readOnly
        tabIndex="3"
        ref={dateFromInputRef}
        onFocus={openCalendar}
      />
      <label className="form__label" htmlFor="date-departure">
        туда
      </label>
      <DropDownCalendar dateToInputRef={dateToInputRef} />
    </div>
  )
}

export default InputDepartureDate
