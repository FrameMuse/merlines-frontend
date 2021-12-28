// SCSS
import "./search-form.scss"

import { getGeoIp } from "api/actions/geo"
import DropDownCalendar from "components/DropDownCalendar/DropDownCalendar"
import { DateCalendarState } from "components/DropDownCalendar/DropDownCalendarReducer"
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useClickAway } from "react-use"
import { updateSearchHasReturnDate } from "redux/reducers/search"
import { updateSearchRoute } from "redux/reducers/search"
import { capitalize, classWithModifiers, createQuery } from "utils"

import ClientAPI from "../../api/client"
import { SearchFormPassengers } from "./SearchFormPassengers"
import { SearchFormRoute } from "./SearchFormRoute"

function SearchForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const search = useSelector(state => state.search)

  const [formError, setFormError] = useState(false)

  // TODO: Find location by GeoIP

  function removeReturnDate() {
    dispatch(updateSearchRoute(0, { returnDate: null }))
    dispatch(updateSearchHasReturnDate(false))
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const route = search.routes[0]
    if (Object.values(route).some(value => !value)) {
      setFormError(true)
      return
    }

    const searchQuery = createQuery({
      origin: route.departurePoint?.code,
      destination: route.arrivalPoint?.code,
      depart_date: route.departureDate?.toISOString().slice(0, 10),
      return_date: route.departureDate?.toISOString().slice(0, 10),
      transport: "air",
      one_way: search.hasReturnDate,

      passengers_adults: search.passengers.adults,
      passengers_children: search.passengers.children,
      passengers_infants: search.passengers.babies,
      travel_class: search.travelClass
    })

    history.push({
      pathname: "/search-result",
      search: "?" + searchQuery,
    })

    console.log(searchQuery)
  }

  useEffect(() => {
    setFormError(false)
  }, [search])

  useEffect(() => {
    ClientAPI.query(getGeoIp).then(({ payload }) => {
      if (!payload) return
      dispatch(updateSearchRoute(0, {
        departurePoint: {
          code: payload.region,
          name: payload.city
        }
      }));
      (document.querySelector(".search-form__group--arrival .search-form__input") as any)?.focus()
    })


  }, [dispatch])

  return (
    <form className="search-form" onSubmit={onSearchSubmit} autoComplete="off">
      <div className="search-form__nav">
        <button type="button" className={classWithModifiers("search-form__nav-btn", search.hasReturnDate && "active")} onClick={() => dispatch(updateSearchHasReturnDate(true))}>
          Туда - обратно
        </button>
        <button type="button" className={classWithModifiers("search-form__nav-btn", !search.hasReturnDate && "active")} onClick={removeReturnDate}>
          В одну сторону
        </button>
        <button className="search-form__nav-btn">Сложный маршрут</button>
      </div>
      <div className={classWithModifiers("search-form__inner", formError && "error")}>
        {search.routes.map((route, index) => (
          <>
            <SearchFormRoute {...route} index={index} key={index} />
            <SearchFormDate routeIndex={index} withReturnDate={search.routes.length < 2} />
          </>
        ))}
        <SearchFormPassengers />
        <button className="search-form__btn">Найти</button>
      </div>
      {/* {!searchResult && <OpenBooking />} */}
    </form>
  )
}


interface SearchFormDatingProps {
  routeIndex: number
  withReturnDate?: boolean
}

function SearchFormDate(props: SearchFormDatingProps) {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  const searchRoute = useSelector(state => state.search.routes[props.routeIndex])

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [hasCalendarOffset, setHasCalendarOffset] = useState(false)

  const calendarRef = useRef<HTMLDivElement | null>(null)

  function onFocus() {
    setIsCalendarOpen(true)
    setHasCalendarOffset(false)
  }

  function onReturnDateFocus() {
    setIsCalendarOpen(true)
    setHasCalendarOffset(true)

    dispatch(updateSearchHasReturnDate(true))
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Tab") return

    setIsCalendarOpen(false)
  }

  function onCalendarStateChange(state: DateCalendarState) {
    dispatch(updateSearchRoute(props.routeIndex, {
      departureDate: state.dates.first,
      returnDate: state.dates.second
    }))
  }

  function texualizeDate(date?: Date | null) {
    if (date == null) return ""

    const day = date.getDate()
    const month = date.toLocaleDateString("ru", { month: "long" })
    const weekday = date.toLocaleDateString("ru", { weekday: "short" })

    return `${day} ${capitalize(month)}, ${capitalize(weekday)}`
  }

  useClickAway(calendarRef, () => setIsCalendarOpen(false))

  return (
    <>
      {/* Departure Date */}
      <label className="search-form__group search-form__group--date-dep">
        <input
          className="search-form__input"
          autoComplete="off"
          placeholder="_"
          readOnly
          value={texualizeDate(searchRoute.departureDate)}

          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
        <div className="search-form__placeholder">{"когда"}</div>
      </label>
      {/* Return Date */}
      <label className="search-form__group search-form__group--date-arr">
        <input
          className="search-form__input search-form__input--arrival-date"
          autoComplete="off"
          placeholder="_"
          readOnly
          value={texualizeDate(searchRoute.returnDate)}

          onFocus={onReturnDateFocus}
          onKeyDown={onKeyDown}
        />
        <div className="search-form__placeholder">{"обратно"}</div>
      </label>

      <DropDownCalendar
        hasGrouping={search.hasReturnDate}
        hasOffset={hasCalendarOffset}
        parentRef={calendarRef}

        isHidden={!isCalendarOpen}
        setIsHidden={setIsCalendarOpen}

        onChange={onCalendarStateChange}
      />
    </>
  )
}

export default SearchForm
