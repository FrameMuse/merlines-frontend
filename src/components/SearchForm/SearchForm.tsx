// SCSS
import "./search-form.scss"

import Icon from "components/common/Icon"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSearchRoutes, resetSearchRoutes, updateSearch, updateSearchHasReturnDate, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import useLocalization from "../../plugins/localization/hook"
import { stringifySearchData } from "./SearchForm.utils"
import SearchFormDate from "./SearchFormDates"
import { SearchFormPassengers } from "./SearchFormPassengers"
import { SearchFormRoute } from "./SearchFormRoute"

function SearchForm() {
  const ll = useLocalization(ll => ll)
  const dispatch = useDispatch()
  const history = useHistory()
  const search = useSelector(state => state.search)

  const [formError, setFormError] = useState(false)

  function setReturnDate() {
    dispatch(updateSearchHasReturnDate(true))
    dispatch(updateSearch({ routes: search.routes.slice(0, 1) }))
  }
  function removeReturnDate() {
    dispatch(updateSearchHasReturnDate(false))
    dispatch(updateSearchRoute(0, { returnDate: null }))
    dispatch(updateSearch({ routes: search.routes.slice(0, 1) }))
  }

  function addSearchRoute() {
    dispatch(addSearchRoutes({
      origin: null,
      date: null,
      destination: null,
      returnDate: null
    }))
  }

  function removeSearchRoute(index1: number) {
    dispatch(updateSearch({ routes: search.routes.filter((_, index2) => index1 !== index2) }))
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
        <div className="search-form">
          <div className="search-form__nav">
            <button className={classWithModifiers("search-form__nav-btn", search.hasReturnDate && "active")} type="button" onClick={setReturnDate}>
              {ll.main.bothWays}
            </button>
            <button className={classWithModifiers("search-form__nav-btn", !search.hasReturnDate && "active")} type="button" onClick={removeReturnDate}>
              {ll.main.oneWay}
            </button>
            <button className="search-form__nav-btn" type="button" onClick={addSearchRoute}>
              {ll.main.difficultRoute}
            </button>
          </div>
          <div className={classWithModifiers("search-form__inner", formError && "error")}>
            <SearchFormRoute {...search.routes[0]} index={0} />
            <SearchFormDate routeIndex={0} />
            <SearchFormPassengers />
            <button className="search-form__btn" type="button" onClick={onSearch}>
              {ll.main.toFind}
            </button>
          </div>
        </div>
      )}
      {search.routes.length > 1 && (
        <div className={classWithModifiers("search-form", "complicated")}>
          <div className="search-form__nav">
            <button className="search-form__nav-btn" type="button" onClick={setReturnDate}>
              {ll.main.bothWays}
            </button>
            <button className="search-form__nav-btn" type="button" onClick={removeReturnDate}>
              {ll.main.oneWay}
            </button>
            <button className="search-form__nav-btn search-form__nav-btn--active" type="button" onClick={clearSearch}>
              {ll.main.difficultRoute}
            </button>
          </div>
          <div className={classWithModifiers("search-form__inner", formError && "error")}>
            {search.routes.map((route, index) => (
              <div className="search-form__route" key={index}>
                <SearchFormRoute {...route} index={index} />
                <SearchFormDate routeIndex={index} />
                <Icon className="search-form__icon" name="close" onClick={() => removeSearchRoute(index)} />
              </div>
            ))}
            <div className="search-form__actions">
              <SearchFormPassengers />
              <button className="search-form__btn search-form__btn--add" type="button" disabled={search.routes.length >= 7} onClick={addSearchRoute}>
                {search.routes.length < 7 ? `+ ${ll.main.addRoute}` : `${ll.main.maxRoutes}`}
              </button>
              <button className="search-form__btn" type="button" onClick={onSearch}>
                {ll.main.toFind}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {!searchResult && <OpenBooking />} */}
    </>
  )
}


export default SearchForm
