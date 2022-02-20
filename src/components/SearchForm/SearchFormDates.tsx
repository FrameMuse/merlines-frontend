import DatePicker from "components/DatePicker/DatePicker"
import { DatePickerValue } from "components/DatePicker/DatePicker.types"
import { KeyboardEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useClickAway } from "react-use"
import { updateSearchHasReturnDate, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import { humanizeDate } from "./SearchForm.utils"

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
    if (event.key !== "Tab")
      return

    setIsCalendarHidden(true)
  }

  function onDatesChange(value: DatePickerValue) {
    dispatch(updateSearchRoute(props.routeIndex, {
      departureDate: value[0],
      returnDate: value[1]
    }))
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
          value={humanizeDate(searchRoute.departureDate)}

          onFocus={onFocus}
          onKeyDown={onKeyDown} />
        <div className="search-form__placeholder">{"когда"}</div>
      </label>
      {/* Return Date */}
      {search.routes.length === 1 && (
        <label className="search-form__group search-form__group--date-arr">
          <input
            className="search-form__input search-form__input--arrival-date"
            autoComplete="off"
            placeholder="_"
            readOnly
            value={humanizeDate(searchRoute.returnDate)}

            onFocus={onReturnDateFocus}
            onKeyDown={onKeyDown} />
          <div className="search-form__placeholder">{"обратно"}</div>
        </label>
      )}

      <div className={classWithModifiers("search-form__dates", hasCalendarOffset && "offset", isCalendarHidden && "hidden")}>
        <DatePicker
          value={[searchRoute.departureDate, searchRoute.returnDate]}
          onChange={onDatesChange}
          ranged={search.hasReturnDate && search.routes.length === 1}
          parentRef={calendarRef} />
      </div>
    </>
  )
}

export default SearchFormDate
