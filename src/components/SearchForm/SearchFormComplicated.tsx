// SCSS
import "./search-form.scss"

import { getGeoIp } from "api/actions/geo"
import ClientAPI from "api/client"
import DropDownCalendar from "components/DropDownCalendar/DropDownCalendar"
import { DateCalendarState } from "components/DropDownCalendar/DropDownCalendarReducer"
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useClickAway } from "react-use"
import { addSearchRoutes, updateSearchRoute } from "redux/reducers/search"
import { capitalize, classWithModifiers, createQuery } from "utils"

import { SearchFormPassengers } from "./SearchFormPassengers"
import { SearchFormRoute } from "./SearchFormRoute"

function SearchFormComplicated() {
  const dispatch = useDispatch()
  const history = useHistory()
  const search = useSelector(state => state.search)

  const [formError, setFormError] = useState(false)

  function addSearchRoute() {
    dispatch(addSearchRoutes({
      departurePoint: null,
      departureDate: null,
      arrivalPoint: null,
      returnDate: null
    }))
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (search.routes.some(route => {
      if (route.arrivalPoint == null) return true
      if (route.departureDate == null) return true
      if (route.departurePoint == null) return true

      return false
    })) {
      setFormError(true)
      return
    }

    const searchQuery = createQuery({
      ...search.passengers,
      travel_class: search.travelClass
    })

    const searchQueries = search.routes.map(route => createQuery({
      origin: route.departurePoint?.id,
      destination: route.arrivalPoint?.id,
      date: route.departureDate?.toISOString().slice(0, 10)
    }))

    history.push({
      pathname: "/search",
      search: "?" + searchQuery + "&" + searchQueries.join("&"),
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
    <form className={classWithModifiers("search-form", "complicated")} onSubmit={onSearchSubmit} autoComplete="off">
      <div className={classWithModifiers("search-form__inner", formError && "error")}>
        {search.routes.map((route, index) => (
          <div className="search-form__route" key={index}>
            <SearchFormRoute {...route} index={index} />
            <SearchFormDate routeIndex={index} />
          </div>
        ))}
        <div className="search-form__actions">
          <SearchFormPassengers />
          <button className="search-form__btn search-form__btn--add" type="button" disabled={search.routes.length >= 7} onClick={addSearchRoute}>
            {search.routes.length < 7 ? "+ Добавить маршрут" : "Максимум маршрутов"}
          </button>
          <button className="search-form__btn" type="submit">Найти</button>
        </div>
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
      <label className="search-form__group">
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

export default SearchFormComplicated
