// SCSS
import "./form.scss"

import DropDownCalendar from "components/DropDownCalendar/DropDownCalendar"
import { updateSearchCalendarIsOpen, updateSearchCalendarMode } from "components/DropDownCalendar/DropDownCalendarReducer"
import { FormEvent, KeyboardEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useClickAway } from "react-use"
import { addSearchRoutes } from "redux/reducers/search"
import { capitalize, classWithModifiers } from "utils"

import { SearchFormPassengers } from "./SearchFormPassengers"
import { SearchFormRoute } from "./SearchFormRoute"

// TODO: Apply code splitting to functions
function SearchForm() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  const searchCalendar = useSelector(state => state.searchCalendar)
  // If calendar has offset, it will be placed under the second input (returnDateInput)

  const [formError, setFormError] = useState(false)

  const [citiesInput, setCitiesInput] = useState({ from: "", to: "" })

  // TODO: Find location by GeoIP

  function getCitiesData(keyWord: string, direction: "from" | "to") {
    // ISSUE: #16 Refactor api actions
  }

  function onCitiesChange(event: FormEvent<HTMLInputElement>, direction: "from" | "to") {
    const value = event.currentTarget.value

    setCitiesInput({ ...citiesInput, [direction]: value })

    // TODO: Dispatch form data
  }

  function chooseOneWay() {
    dispatch(updateSearchCalendarMode("single"))
  }

  function chooseTwoWays() {
    dispatch(updateSearchCalendarMode("double"))
  }

  function addRoute() {
    dispatch(addSearchRoutes({
      arrivalPoint: "",
      departurePoint: "",
      departureDate: search.routes.slice(-1)[0].departureDate
    }))
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: If form fields are empty, set form error
    // TODO: Send request using history search
    console.log(search)
  }

  return (
    <form className="form" onSubmit={onSearchSubmit} autoComplete="off">
      <div className="form__nav">
        <div className={classWithModifiers("form__nav-btn", searchCalendar.mode === "double" && "active")} onClick={chooseTwoWays}>
          Туда - обратно
        </div>
        <div className={classWithModifiers("form__nav-btn", searchCalendar.mode === "single" && "active")} onClick={chooseOneWay}>
          В одну сторону
        </div>
        <button className="form__nav-btn" onClick={addRoute}>Сложный маршрут</button>
      </div>
      <div className={classWithModifiers("form__inner", formError && "error")}>
        {search.routes.map((route, index) => (
          <SearchFormRoute {...route} index={index} key={index} />
        ))}
        <SearchFormDates />
        <SearchFormPassengers />
        <input className="form__btn" type="submit" value="Найти" />
      </div>
      {/* {!searchResult && <OpenBooking />} */}
    </form>
  )
}

function SearchFormDates() {
  const dispatch = useDispatch()

  const search = useSelector(state => state.search)
  const searchCalendar = useSelector(state => state.searchCalendar)

  const calendarRef = useRef<HTMLElement | null>(null)

  const [hasOffset, setHasOffset] = useState(false)

  function openCalendar() {
    dispatch(updateSearchCalendarIsOpen(true))
  }

  function onDateKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Tab") return
    dispatch(updateSearchCalendarIsOpen(false))
  }

  function onDepartureDateClick() {
    openCalendar()
    setHasOffset(false)
  }

  function onArrivalDateClick() {
    openCalendar()
    setHasOffset(false)
    dispatch(updateSearchCalendarMode("double"))
  }

  function texualizeDate(date?: Date | null) {
    if (date == null) return ""

    const day = date.getDate()
    const month = date.toLocaleDateString("ru", { month: "long" })
    const weekday = date.toLocaleDateString("ru", { weekday: "short" })

    return `${day} ${capitalize(month)}, ${capitalize(weekday)}`
  }

  useClickAway(calendarRef, () => dispatch(updateSearchCalendarIsOpen(false)))

  return (
    <div className="form__section">
      <label className="form__group">
        <input
          className="form__input"
          autoComplete="off"
          placeholder="_"
          readOnly
          value={texualizeDate(searchCalendar.dates.first)}

          onFocus={onDepartureDateClick}
          onKeyDown={onDateKeyDown}
        />
        <div className="form__label">{"туда"}</div>
        <DropDownCalendar hasOffset={hasOffset} parentRef={calendarRef} />
      </label>
      {search.routes.length < 2 && (
        <label className="form__group form__group--date-arr">
          <input
            className="form__input form__input--arrival-date"
            autoComplete="off"
            placeholder="_"
            readOnly
            value={texualizeDate(searchCalendar.dates.second)}

            onFocus={onArrivalDateClick}
            onKeyDown={onDateKeyDown}
          />
          <div className="form__label">{"обратно"}</div>
        </label>
      )}
    </div>
  )
}

export default SearchForm
