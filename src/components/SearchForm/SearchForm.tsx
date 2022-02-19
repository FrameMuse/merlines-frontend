// SCSS
import "./search-form.scss"

import { getGeoIpAir } from "api/actions/geo"
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSearchRoutes, updateSearchHasReturnDate, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import ClientAPI from "../../api/client"
import { stringifyPassengers, stringifyRoutes } from "./SearchForm.utils"
import SearchFormDate from "./SearchFormDates"
import { SearchFormPassengers } from "./SearchFormPassengers"
import { SearchFormRoute } from "./SearchFormRoute"

function SearchForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const search = useSelector(state => state.search)

  const [formError, setFormError] = useState(false)

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

    const route = search.routes[0]
    if (route.arrivalPoint == null) {
      return setFormError(true)
    }
    if (route.departurePoint == null) {
      return setFormError(true)
    }
    if (route.departureDate == null) {
      return setFormError(true)
    }

    // const searchQuery1 = createQuery({
    //   origin: route.departurePoint.id,
    //   destination: route.arrivalPoint.id,
    //   date: route.departureDate.toISOString().slice(0, 10),
    // })

    // const searchQuery2 = createQuery({
    //   origin: route.arrivalPoint.id,
    //   destination: route.departurePoint.id,
    //   date: route.returnDate?.toISOString().slice(0, 10),
    // })

    // const searchQuery = createQuery({
    //   travel_class: search.travelClass,
    //   ...search.passengers
    // })

    const ROUTES = stringifyRoutes(search.routes)
    const PASSENGERS = stringifyPassengers(search.passengers)
    const CLASS = search.travelClass === 1 ? "" : search.travelClass

    history.push({
      pathname: "/search/" + ROUTES + (PASSENGERS && ("/" + PASSENGERS)) + (CLASS && "/C" + CLASS)
    })
  }

  useEffect(() => setFormError(false), [search])
  useEffect(() => {
    ClientAPI.query(getGeoIpAir).then(({ payload }) => {
      if (!payload) return
      dispatch(updateSearchRoute(0, {
        departurePoint: payload
      }));
      (document.querySelector(".search-form__group--arrival .search-form__input") as any)?.focus()
    })


  }, [dispatch])

  return (
    <form className={classWithModifiers("search-form", search.routes.length > 1 && "complicated")} onSubmit={onSearch} autoComplete="off">
      <div className="search-form__nav">
        <button className={classWithModifiers("search-form__nav-btn", search.hasReturnDate && "active")} type="button" onClick={setReturnDate}>
          Туда - обратно
        </button>
        <button className={classWithModifiers("search-form__nav-btn", !search.hasReturnDate && "active")} type="button" onClick={removeReturnDate}>
          В одну сторону
        </button>
        <button className="search-form__nav-btn" type="button" onClick={addSearchRoute}>Сложный маршрут</button>
      </div>
      {search.routes.length === 1 && (
        <div className={classWithModifiers("search-form__inner", formError && "error")}>
          <SearchFormRoute {...search.routes[0]} index={0} />
          <SearchFormDate routeIndex={0} />
          <SearchFormPassengers />
          <button className="search-form__btn" type="submit">Найти</button>
        </div>
      )}
      {search.routes.length > 1 && (
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
      )}
      {/* {!searchResult && <OpenBooking />} */}
    </form>
  )
}


export default SearchForm
