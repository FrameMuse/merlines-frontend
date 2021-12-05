// SCSS
import "./form.scss"

// ...
import { updateSearchCalendarIsOpen, updateSearchCalendarMode } from "components/DropDownCalendar/DropDownCalendarReducer"
import useDebounce from "hooks/useDebounce"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useClickAway } from "react-use"
import { classWithModifiers } from "utils"

import OpenBooking from "../common/OpenBooking"
import DropDown from "../DropDown/DropDown"
import DropDownCalendar from "../DropDownCalendar/DropDownCalendar"

// TODO: Apply code splitting to functions
function SearchForm({ searchResult }) {
  const dispatch = useDispatch()
  const searchCalendar = useSelector(state => state.searchCalendar)
  // If calendar has offset, it will be placed under the second input (returnDateInput)
  const [hasCalendarOffset, setHasCalendarOffset] = useState(false)

  const citiesInfoInputRef = useRef(null)

  const calendarDropDownRef = useRef(null)
  const toCitiesDropDownRef = useRef(null)
  const fromCitiesDropDownRef = useRef(null)

  const departureDateInputRef = useRef(null)
  const returnDateInputRef = useRef(null)

  const passengersInputRef = useRef(null)
  // const passengersDropDownRef = useRef(null)

  // BUG: #15 Refactor redux 'SearchForm' reducer

  const [formError, setFormError] = useState(false)

  const [citiesInput, setCitiesInput] = useState({ from: "", to: "" })
  const citiesInputDebounced = useDebounce(citiesInput, 250)

  const [currentDirection, setCurrentDirection] = useState("from")
  const [currentCitiesData, setCurrentCitiesData] = useState({ from: [], to: [] })
  const [cachedCitiesData, setCachedCitiesData] = useState({ from: {}, to: {} })

  // TODO: Find location by GeoIP

  // TODO: Set passengers
  // TODO: Pluralize passenger word

  // If there is cached data
  useEffect(() => {
    const city = citiesInput[currentDirection]

    if (!city) return
    if (!(city in cachedCitiesData[currentDirection])) return

    setCurrentCitiesData({
      ...currentCitiesData,
      [currentDirection]: cachedCitiesData[currentDirection][city] || []
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesInput])
  // If there isn't
  useEffect(() => {
    const city = citiesInputDebounced[currentDirection]

    if (!city) return
    if (city in cachedCitiesData[currentDirection]) return

    getCitiesData(city, currentDirection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesInputDebounced])

  /**
   *
   * @param {string} keyWord
   * @param {"from" | "to"} direction
   */
  function getCitiesData(keyWord, direction) {
    // ISSUE: #16 Refactor api actions
  }

  /**
   *
   * @param {*} event
   * @param {"from" | "to"} direction
   */
  function onCitiesChange(event, direction) {
    const value = event.currentTarget.value

    setCurrentDirection(direction)
    setCitiesInput({ ...citiesInput, [direction]: value })

    // TODO: Dispatch form data
  }

  function switchRoutes() {
    // TODO: Make switchable routes
  }

  function chooseOneWay() {
    dispatch(updateSearchCalendarMode("single"))
  }

  function chooseTwoWays() {
    setHasCalendarOffset(true)
    dispatch(updateSearchCalendarMode("double"))
    dispatch(updateSearchCalendarIsOpen(true))
  }

  function onDepartureDateFocus() {
    setHasCalendarOffset(false)
  }
  function onReturnDateFocus() {
    setHasCalendarOffset(true)
    dispatch(updateSearchCalendarIsOpen(true))
  }

  function onPassengersFocus() {
    // TODO: show passengers settings
    dispatch(updateSearchCalendarIsOpen(false))
  }
  function onPassengersTabPressed(event) {
    if (event.key !== "Tab") return

    // TODO: hide passengers settings
  }

  function onSearchSubmit(event) {
    event.preventDefault()

    // TODO: If form fields are empty, set form error
    // TODO: Send request using history search
  }

  // Hide CalendarDropDown
  useClickAway(calendarDropDownRef, (event) => {
    if (!searchCalendar.isOpen) return

    if (event.path.includes(departureDateInputRef.current?.parentElement))
      return
    if (event.path.includes(returnDateInputRef.current?.parentElement)) return

    dispatch(updateSearchCalendarIsOpen(false))
  })
  // Hide PassengersDropDown
  // useClickAway(passengersDropDownRef, (event) => {
  //   if (!isPassengersOpen) return

  //   if (event.path.includes(passengersInputRef.current)) return

  //   // TODO: hide passengers settings
  // })

  return (
    <form className="form" onSubmit={onSearchSubmit}>
      <div className="form__nav">
        <div className={classWithModifiers("form__nav-btn", searchCalendar.mode === "double" && "active")} onClick={chooseTwoWays}>
          Туда - обратно
        </div>
        <div className={classWithModifiers("form__nav-btn", searchCalendar.mode === "single" && "active")} onClick={chooseOneWay}>
          В одну сторону
        </div>
        <button className="form__nav-btn" onClick={(evt) => evt.preventDefault()}>Сложный маршрут</button>
      </div>
      <div className={classWithModifiers("form__inner", formError && "error")}>
        <div className="form__group form__group--departure">
          <input
            onInput={(event) => onCitiesChange(event, "from")}
            value={888}
            className="form__input"
            type="text"
            id="main-departure"
            placeholder="Откуда"
            autoComplete="off"
            tabIndex="1"
          />
          <label className="form__label">откуда</label>
          <button onClick={switchRoutes} type="button" className="form__switch">Поменять местами</button>
          {currentCitiesData.from.length > 0 && (
            <DropDown
              nodeDropDown={fromCitiesDropDownRef}
              currentCities={currentCitiesData.from}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setCitiesInput}
              inputEl={citiesInfoInputRef}
              inputDirection={currentDirection}
            />
          )}
        </div>
        <div className="form__group form__group--arrival">
          <input
            onInput={(event) => onCitiesChange(event, "to")}
            value={888}
            className="form__input form__input--arrival"
            type="text"
            id="main-arrival"
            placeholder="Куда"
            autoComplete="off"
            ref={citiesInfoInputRef}
            tabIndex="2"
            onFocus={() => dispatch(updateSearchCalendarIsOpen(false))}
          />
          <label className="form__label form__label--arrival">куда</label>
          {currentCitiesData.to.length > 0 && (
            <DropDown
              nodeDropDown={toCitiesDropDownRef}
              currentCities={currentCitiesData.to}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setCitiesInput}
              inputEl={citiesInfoInputRef}
              inputDirection={currentDirection}
              dateFromInput={departureDateInputRef}
            />
          )}
        </div>
        <div className="form__group form__group--date-dep">
          <input
            className="form__input"
            value={888}
            readOnly
            tabIndex="3"
            ref={departureDateInputRef}
            onFocus={onDepartureDateFocus}
          />
          <label className="form__label">туда</label>
        </div>
        <div className="form__group form__group--date-arr">
          <input
            className="form__input"
            ref={returnDateInputRef}
            value={888}
            readOnly
            tabIndex="4"
            onFocus={onReturnDateFocus}
          />
          <label className="form__label">обратно</label>
        </div>
        <div className="form__group form__group--passengers">
          <input
            className="form__input form__input--passenger"
            placeholder="Пассажиры и класс"
            value={888}
            readOnly
            tabIndex="5"
            ref={passengersInputRef}
            onFocus={onPassengersFocus}
            onKeyDown={onPassengersTabPressed}
          />
          <label className="form__label">Пассажиры и класс</label>
          {/* BUG #14 */}
          {/* <DropDownPassengers parentRef={passengersDropDownRef} isPassengersOpen={isPassengersOpen} /> */}
        </div>
        <input className="form__btn" type="submit" value="Найти" tabIndex="6" />
        <DropDownCalendar parentRef={calendarDropDownRef} hasOffset={hasCalendarOffset} />
      </div>
      {!searchResult && <OpenBooking />}
    </form>
  )
}

export default SearchForm
