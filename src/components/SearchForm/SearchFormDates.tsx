import DatePicker from "components/DatePicker/DatePicker"
import { DatePickerValue } from "components/DatePicker/DatePicker.types"
import { KeyboardEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useClickAway } from "react-use"
import { updateSearchHasReturnDate, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import useLocalization from "../../plugins/localization/hook"
import { humanizeDate } from "./SearchForm.utils"

interface SearchFormDatingProps {
  routeIndex: number
}

function SearchFormDate(props: SearchFormDatingProps) {
  const dispatch = useDispatch()
  const ll = useLocalization(ll => ll)

  const search = useSelector(state => state.search)
  const searchRoute = search.routes[props.routeIndex]

  const [isDatePickerHidden, setIsDatePickerHidden] = useState(true)
  const [hasCalendarOffset, setHasCalendarOffset] = useState(false)

  const datesRef = useRef<HTMLDivElement | null>(null)

  function onFocus() {
    setIsDatePickerHidden(false)
    setHasCalendarOffset(false)
  }

  function onReturnDateFocus() {
    setIsDatePickerHidden(false)
    setHasCalendarOffset(true)

    dispatch(updateSearchHasReturnDate(true))
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Tab")
      return

    setIsDatePickerHidden(true)
  }

  function onDatesChange(value: DatePickerValue) {
    dispatch(updateSearchRoute(props.routeIndex, {
      date: value[0],
      returnDate: value[1]
    }))
  }

  useClickAway(datesRef, () => setIsDatePickerHidden(true))

  return (
    <>
      {/* Departure Date */}
      <label className="search-form__group search-form__group--date-dep">
        <input
          className="search-form__input"
          autoComplete="off"
          placeholder="_"
          readOnly
          value={humanizeDate(searchRoute.date)}

          onFocus={onFocus}
          onKeyDown={onKeyDown} />
        <div className="search-form__placeholder">{ll.main.when}</div>
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
          <div className="search-form__placeholder">{ll.main.back}</div>
        </label>
      )}

      <div className={classWithModifiers("search-form__dates", hasCalendarOffset && "offset", isDatePickerHidden && "hidden")} ref={datesRef}>
        <button className="search-form__dates-close" type="button" onClick={() => setIsDatePickerHidden(true)}>Закрыть</button>
        <DatePicker
          value={[searchRoute.date, searchRoute.returnDate]}
          onChange={onDatesChange}
          ranged={search.hasReturnDate && search.routes.length === 1} />
      </div>
    </>
  )
}

export default SearchFormDate
