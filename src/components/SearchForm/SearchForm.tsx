// SCSS
import "./form.scss"

import DropDownCalendar from "components/DropDownCalendar/DropDownCalendar"
import { updateSearchCalendarIsOpen, updateSearchCalendarMode } from "components/DropDownCalendar/DropDownCalendarReducer"
import DropDownPassengers from "components/DropDownPassengers/DropDownPassengers"
import { FocusEvent, FormEvent, KeyboardEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useClickAway } from "react-use"
import { updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers, pluralize } from "utils"

import { SearchRoute } from "../../redux/reducers/search"
import DropDown from "../DropDown/DropDown"
import { DropDownElementProps } from "../DropDown/DropDownItem"
import { texualizeDate } from "./SearchFormServices"

// TODO: Apply code splitting to functions
function SearchForm() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  const searchCalendar = useSelector(state => state.searchCalendar)
  // If calendar has offset, it will be placed under the second input (returnDateInput)
  const [hasCalendarOffset, setHasCalendarOffset] = useState(false)

  const calendarDropDownRef = useRef(null)

  const passengersRef = useRef<HTMLLabelElement | null>(null)
  const passengersDropDownRef = useRef<HTMLDivElement | null>(null)

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
  function onPassengersTabPressed(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return

    // TODO: hide passengers settings
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: If form fields are empty, set form error
    // TODO: Send request using history search
  }

  // Hide CalendarDropDown
  // useClickAway(calendarDropDownRef, (event) => {
  //   if (!searchCalendar.isOpen) return

  //   if (event.path.includes(departureDateInputRef.current?.parentElement))
  //     return
  //   if (event.path.includes(returnDateInputRef.current?.parentElement)) return

  //   dispatch(updateSearchCalendarIsOpen(false))
  // })
  // Hide PassengersDropDown
  useClickAway(passengersDropDownRef, (event) => {
    if (!passengersRef.current) return

    if (event.composedPath().includes(passengersRef.current)) return

    // TODO: hide passengers settings
  })

  return (
    <form className="form" onSubmit={onSearchSubmit} autoComplete="off">
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

        {search.routes.map((route, index) => (
          <SearchFormRoute {...route} index={index} key={index} />
        ))}
        <SearchFormPassengers />
        <input className="form__btn" type="submit" value="Найти" />
      </div>
      {/* {!searchResult && <OpenBooking />} */}
    </form>
  )
}

function SearchFormRoutesSwitchButton() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  function switchRoutes() {
    dispatch(updateSearchRoute(0, {
      arrivalPoint: search.routes[0].departurePoint,
      departurePoint: search.routes[0].arrivalPoint,
    }))
  }
  if (search.routes.length > 1) return null
  return <button onClick={switchRoutes} type="button" className="form__switch">Поменять местами</button>
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
    <>
      <label className="form__group form__group--date-dep">
        <input
          className="form__input form__input--departure-date"
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
    </>
  )
}

interface SearchFormRouteProps extends SearchRoute {
  index: number
}

function SearchFormRoute(props: SearchFormRouteProps) {
  const dispatch = useDispatch()

  const [departurePointOpen, setDeparturePointOpen] = useState(false)
  const [arrivalPointOpen, setArrivalPointOpen] = useState(false)

  function updateRouteData<K extends keyof SearchRoute = keyof SearchRoute>(key: K, value: SearchRoute[K]) {
    dispatch(updateSearchRoute(props.index, { [key]: value }))
  }

  function onSelectDeparturePoint(element: DropDownElementProps) {
    updateRouteData("departurePoint", element.title)
  }

  function onSelectArrivalPoint(element: DropDownElementProps) {
    updateRouteData("arrivalPoint", element.title)
  }

  function onChangeDeparturePoint(event: FormEvent<HTMLInputElement>) {
    setDeparturePointOpen(true)
    updateRouteData("departurePoint", event.currentTarget.value)
  }

  function onChangeArrivalPoint(event: FormEvent<HTMLInputElement>) {
    setArrivalPointOpen(true)
    updateRouteData("arrivalPoint", event.currentTarget.value)
  }


  const list = [{ tag: "WOW", title: "Boobs", iconName: "departures" }, { tag: "MEOW", title: "Cat", iconName: "destinations" }]

  return (
    <>
      <label className="form__group form__group--departure">
        <input
          className="form__input"
          autoComplete="off"
          placeholder="_"

          value={props.departurePoint}
          onChange={onChangeDeparturePoint}
        />
        <div className="form__label">{"откуда"}</div>
        <SearchFormRoutesSwitchButton />
        <DropDown list={list} isOpen={departurePointOpen} setIsOpen={setDeparturePointOpen} onSelect={onSelectDeparturePoint} />
      </label>
      <label className="form__group form__group--arrival">
        <input
          className="form__input"
          autoComplete="off"
          placeholder="_"

          value={props.arrivalPoint}
          onChange={onChangeArrivalPoint}
        />
        <div className="form__label">{"куда"}</div>
        <DropDown list={list} isOpen={arrivalPointOpen} setIsOpen={setArrivalPointOpen} onSelect={onSelectArrivalPoint} />
      </label>
      <SearchFormDates />
    </>
  )
}


function SearchFormPassengers() {
  const localization: any = {
    passengers: {
      plural: ["пассажир", "пассажира", "пассажиров"]
    },
    travelClasses: {
      economy: "эконом",
      business: "бизнес",
    }
  }
  const ll = localization

  const search = useSelector(state => state.search)
  const passengersCount = Object.values(search.passengers).reduce((result, next) => result + next, 0)
  const travelClass = ll.travelClasses[search.travelClass]

  const ref = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <label className="form__group form__group--passengers">
      <input
        className="form__input form__input--passenger"
        value={`${passengersCount} ${pluralize(passengersCount, ll.passengers.plural)}, ${travelClass}`}
        readOnly
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />
      <div className="form__label">пассажиры и класс</div>
      <DropDownPassengers hidden={!isOpen} parentRef={ref} />
    </label>
  )
}

export default SearchForm
