// SCSS
import "./search-form.scss"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSearchRoutes, resetSearchRoutes, updateSearchHasReturnDate, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import { stringifySearchData } from "./SearchForm.utils"
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
      origin: null,
      date: null,
      destination: null,
      returnDate: null
    }))
  }

  function clearSearch() {
    dispatch(resetSearchRoutes)
  }

  function onSearch() {
    const route = search.routes[0]
    if (route.destination == null) {
      return setFormError(true)
    }
    if (route.origin == null) {
      return setFormError(true)
    }
    if (route.date == null) {
      return setFormError(true)
    }

    history.push({ pathname: stringifySearchData(search) })
  }

  useEffect(() => setFormError(false), [search])

  return (
    <>
      {search.routes.length === 1 && (
        <form className="search-form" autoComplete="off">
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
            <SearchFormRoute {...search.routes[0]} index={0} />
            <SearchFormDate routeIndex={0} />
            <SearchFormPassengers />
            <button className="search-form__btn" type="button" onClick={onSearch}>Найти</button>
          </div>
        </form>
      )}
      {search.routes.length > 1 && (
        <form className={classWithModifiers("search-form", "complicated")} autoComplete="off">
          <div className="search-form__nav">
            <button className="search-form__nav-btn" type="button" onClick={clearSearch}>Простой маршрут</button>
          </div>
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
              <button className="search-form__btn" type="button" onClick={onSearch}>Найти</button>
            </div>
          </div>
        </form>
      )}
      {/* {!searchResult && <OpenBooking />} */}
    </>
  )
}


export default SearchForm
