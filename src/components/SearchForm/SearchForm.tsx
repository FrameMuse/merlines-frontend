// SCSS
import "./search-form.scss"

import { getGeoIp } from "api/actions/geo"
import DropDownCalendar from "components/DropDownCalendar/DropDownCalendar"
import { DateCalendarState } from "components/DropDownCalendar/DropDownCalendarReducer"
import { FormEvent, Fragment, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useClickAway } from "react-use"
import { addSearchRoutes, updateSearchHasReturnDate, updateSearchRoute } from "redux/reducers/search"
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

  function setReturnDate() {
    dispatch(updateSearchHasReturnDate(true))
  }
  function removeReturnDate() {
    dispatch(updateSearchHasReturnDate(false))
    dispatch(updateSearchRoute(0, { returnDate: null }))
  }

  function addSearchRoute() {
    dispatch(addSearchRoutes({
      departurePoint: null,
      departureDate: null,
      arrivalPoint: null,
      returnDate: null
    }))
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const route = search.routes[0] // No complicated for now


    if (route.arrivalPoint == null) {
      setFormError(true)
      return
    }

    if (route.departurePoint == null) {
      setFormError(true)
      return
    }

    if (route.departureDate == null) {
      setFormError(true)
      return
    }

    const searchQuery = createQuery({
      origin: route.departurePoint.id,
      destination: route.arrivalPoint.id,
      date: route.departureDate.toISOString().slice(0, 10),
      // return_date: route.departureDate?.toISOString().slice(0, 10),
      // transport: "air",
      travel_class: search.travelClass
      // ...search.passengers
    })

    history.push({
      pathname: "/search",
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
      // dispatch(updateSearchRoute(0, {
      //   departurePoint: {
      //     code: payload.region,
      //     name: payload.city
      //   }
      // }));
      (document.querySelector(".search-form__group--arrival .search-form__input") as any)?.focus()
    })


  }, [dispatch])

  return (
    <form className="search-form" onSubmit={onSearch} autoComplete="off">
      <div className="search-form__nav">
        <button className={classWithModifiers("search-form__nav-btn", search.hasReturnDate && "active")} type="button" onClick={setReturnDate}>
          Туда - обратно
        </button>
        <button className={classWithModifiers("search-form__nav-btn", !search.hasReturnDate && "active")} type="button" onClick={removeReturnDate}>
          В одну сторону
        </button>
        <button className="search-form__nav-btn" type="button" onClick={addSearchRoute}>Сложный маршрут</button>
      </div>
      <div className={classWithModifiers("search-form__inner", formError && "error")}>
        {search.routes.map((route, index) => (
          <Fragment key={index}>
            <SearchFormRoute {...route} index={index} />
            <SearchFormDate routeIndex={index} />
          </Fragment>
        ))}
        <SearchFormPassengers />
        <button className="search-form__btn" type="submit">Найти</button>
      </div>
      {/* {!searchResult && <OpenBooking />} */}
    </form>
  )
}


interface SearchFormDatingProps {
  routeIndex: number
}

function SearchFormDate(props: SearchFormDatingProps) {
  const dispatch = useDispatch()

  const search = useSelector(state => state.search)
  const searchRoute = search.routes[props.routeIndex]

  const [isCalendarHidden, setIsCalendarHidden] = useState(true)
  const [hasCalendarOffset, setHasCalendarOffset] = useState(false)

  const calendarRef = useRef<HTMLDivElement | null>(null)

  function onFocus() {
    setIsCalendarHidden(false)
    setHasCalendarOffset(false)
  }

  function onReturnDateFocus() {
    setIsCalendarHidden(false)
    setHasCalendarOffset(true)

    dispatch(updateSearchHasReturnDate(true))
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Tab") return

    setIsCalendarHidden(true)
  }

  function onCalendarStateChange(state: DateCalendarState) {
    dispatch(updateSearchRoute(props.routeIndex, {
      departureDate: state.dates.first,
      returnDate: state.dates.second
    }))
  }

  function textualizeDate(date?: Date | null) {
    if (date == null) return ""

    const day = date.getDate()
    const month = date.toLocaleDateString("ru", { month: "long" })
    const weekday = date.toLocaleDateString("ru", { weekday: "short" })

    return `${day} ${capitalize(month)}, ${capitalize(weekday)}`
  }

  useClickAway(calendarRef, () => setIsCalendarHidden(true))

  return (
    <>
      {/* Departure Date */}
      <label className="search-form__group search-form__group--date-dep">
        <input
          className="search-form__input"
          autoComplete="off"
          placeholder="_"
          readOnly
          value={textualizeDate(searchRoute.departureDate)}

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
          value={textualizeDate(searchRoute.returnDate)}

          onFocus={onReturnDateFocus}
          onKeyDown={onKeyDown}
        />
        <div className="search-form__placeholder">{"обратно"}</div>
      </label>

      <DropDownCalendar
        single={search.routes.length > 1}

        hasGrouping={search.hasReturnDate && search.routes.length < 2}
        hasOffset={hasCalendarOffset}
        parentRef={calendarRef}

        isHidden={isCalendarHidden}
        setIsHidden={setIsCalendarHidden}

        onChange={onCalendarStateChange}
      />
    </>
  )
}

export default SearchForm
