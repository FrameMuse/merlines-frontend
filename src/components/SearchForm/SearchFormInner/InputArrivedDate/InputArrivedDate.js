import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectMainSearchParams } from "../../../../reducers/mainSearchSlice"

const InputArrivedDate = () => {
  const dispatch = useDispatch()

  const dateToInput = useRef(null)
  const dateFromInput = useRef(null)

  const [currentArrivedDate, setCurrentArrivedDate] = useState("")

  const mainSearchParams = useSelector(selectMainSearchParams)
  const { date } = useSelector(selectMainSearchParams)

  useEffect(() => {
    const {
      front: { to }
    } = date
    console.log("date.front.from", to)
    setCurrentArrivedDate(to)
  }, [date])

  return (
    <div className="form__group form__group--date-arr">
      <input
        className="form__input"
        id="date-arrival"
        placeholder="Дата обратно"
        ref={dateToInput}
        value={currentArrivedDate || mainSearchParams.date.changedInput.to}
        readOnly
        tabIndex="4"
      />
      <label className="form__label" htmlFor="date-arrival">
        обратно
      </label>
      {/* FIXME: создать и добавить DropDownCalendar */}
    </div>
  )
}

export default InputArrivedDate
