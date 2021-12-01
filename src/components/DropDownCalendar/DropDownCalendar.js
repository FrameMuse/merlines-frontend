// SCSS
import './drop-down-calendar.scss'
// ...
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DateTime } from 'luxon'

import {
  setIsOpenCalendar,
  setTwoMonthsPlus,
  setTwoMonthsMinus,
  setTwoMonthsIntervals,
  setTwoMonthsCurrent,
  setTwoMonthsNext,
} from '../../reducers/dropDownCalendarSlice'

import DropDownCalendarSlider from './DropDownCalendarSlider'
import DropDownCalendarMonth from './DropDownCalendarMonth'
import DropDownCalendarSelectMonth from './DropDownCalendarSelectMonth'
import { classWithModifiers } from '../../utils'

/**
 * 
 * @param {{
 *  parentRef: React.MutableRefObject<HTMLElement>
 *  dateInputRef: React.MutableRefObject<HTMLInputElement>
 *  hasOffset?: boolean
 *  hidden?: boolean
 * }} props 
 * @returns 
 */
function DropDownCalendar(props) {
  const dispatch = useDispatch()
  const [isCurrent, setIsCurrent] = useState(true)

  // const mainSearchParams = useSelector(state => state.mainSearchParams)
  const { twoMonthsDates, twoMonthsIntervals } = useSelector(state => state.dropDownCalendar)

  useEffect(() => {
    dispatch(setTwoMonthsIntervals())
    setIsCurrent(DateTime.now().month === twoMonthsDates.current.month)
  }, [dispatch, twoMonthsDates])

  // Close Calendar on 'Escape' key
  useEffect(() => {
    function escapeCloseEvent(event) {
      if (event.key === "Escape") {
        dispatch(setIsOpenCalendar(false))
      }
    }

    window.addEventListener("keydown", escapeCloseEvent)
    return () => window.removeEventListener("keydown", escapeCloseEvent)
  }, [dispatch])

  const modifiers = []

  if (props.hasOffset) modifiers.push("offset")
  if (props.hidden) modifiers.push("hidden")

  return (
    <div
      ref={props.parentRef}
      className={classWithModifiers("drop-down-calendar", ...modifiers)}
    >
      <DropDownCalendarSlider
        clickPrev={() => dispatch(setTwoMonthsMinus())}
        clickNext={() => dispatch(setTwoMonthsPlus())}
        isCurrent={isCurrent}
      />
      <div className="drop-down-calendar__container">
        <button
          onClick={() => dispatch(setIsOpenCalendar())}
          className="drop-down-calendar__close-btn"
          type="button"
        >
          закрыть
        </button>
        {/* <div className="drop-down-calendar__form">
          <div className="form__group form__group--date-dep">
            <input
              className="form__input"
              type="text"
              id="date-departure"
              value={
                mainSearchParams.date.front.from
                  ? mainSearchParams.date.front.from
                  : mainSearchParams.date.changedInput.from
              }
              readOnly
              placeholder="Дата отправления"
            />
            <label className="form__label" htmlFor="date-departure">
              дата отправления
            </label>
          </div>
          <div className="form__group form__group--date-arr">
            <input
              className="form__input"
              type="text"
              id="date-arrival"
              value={
                mainSearchParams.date.front.to
                  ? mainSearchParams.date.front.to
                  : mainSearchParams.date.changedInput.to
              }
              readOnly
              placeholder="Дата обратно"
            />
            <label className="form__label" htmlFor="date-arrival">
              обратно
            </label>
          </div>
        </div> */}
        <DropDownCalendarMonth
          dateToInput={props.dateInputRef}
          monthName={
            twoMonthsDates.current.reconfigure({ locale: 'ru' }).monthLong
          }
          year={twoMonthsDates.current.year}
          days={twoMonthsIntervals.current}
          currentMonth={twoMonthsDates.current}
        >
          <DropDownCalendarSelectMonth
            dispatch={(e) => dispatch(setTwoMonthsCurrent(e.target.value))}
          />
        </DropDownCalendarMonth>
        <DropDownCalendarMonth
          dateToInput={props.dateInputRef}
          monthName={
            twoMonthsDates.next.reconfigure({ locale: 'ru' }).monthLong
          }
          year={twoMonthsDates.next.year}
          days={twoMonthsIntervals.next}
          currentMonth={twoMonthsDates.next}
        >
          <DropDownCalendarSelectMonth
            dispatch={(e) => dispatch(setTwoMonthsNext(e.target.value))}
          />
        </DropDownCalendarMonth>
      </div>
    </div>
  )
}

export default DropDownCalendar
