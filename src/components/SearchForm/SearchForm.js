// SCSS
import "./form.scss"
// ...
import { DateTime } from "luxon"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useClickAway } from "react-use"
import api from "../../api/api"
import { monthNamesDate } from "../../constants"
import useDebounce from "../../hooks/useDebounce"
import {
  setCalendarToInitial,
  setDateIntervalFrom,
  setIsDateInterval,
  setIsOneClick,
  setIsOpenCalendar
} from "../../reducers/dropDownCalendarSlice"
import {
  detectCityByGeoIp,
  setChangedInputFrom,
  setChangedInputTo,
  setDateFrom,
  setDateTo,
  setOneWay,
  setPassengersInfo,
  setPassengersInfoMini,
  setRouteFrom,
  setRouteTo
} from "../../reducers/mainSearchSlice"
import { createQuery, firstToUpperCase, pluralize } from "../../utils"
import OpenBooking from "../common/OpenBooking"
import DropDown from "../DropDown/DropDown"
import DropDownCalendar from "../DropDownCalendar/DropDownCalendar"
import DropDownPassengers from "../DropDownPassengers/DropDownPassengers"

function SearchForm({ searchResult }) {
  const history = useHistory()
  const dispatch = useDispatch()
  // If calendar has offset, it will be placed under the second input (returnDateInput)
  const [hasCalendarOffset, setHasCalendarOffset] = useState(false)

  const citiesInfoInputRef = useRef(null)

  const calendarDropDownRef = useRef(null)
  const toCitiesDropDownRef = useRef(null)
  const fromCitiesDropDownRef = useRef(null)

  const departureDateInputRef = useRef(null)
  const returnDateInputRef = useRef(null)

  const passengersInputRef = useRef(null)
  const passengersDropDownRef = useRef(null)

  const accessData = useSelector((state) => state.accessData)
  const mainSearchParams = useSelector((state) => state.mainSearchParams)
  const dropDownCalendar = useSelector((state) => state.dropDownCalendar)

  const [formError, setFormError] = useState(false)

  const [citiesInput, setCitiesInput] = useState({ from: "", to: "" })
  const citiesInputDebounced = useDebounce(citiesInput, 250)

  const [currentDirection, setCurrentDirection] = useState("from")
  const [currentCitiesData, setCurrentCitiesData] = useState({
    from: [],
    to: []
  })
  const [cachedCitiesData, setCachedCitiesData] = useState({
    from: {},
    to: {}
  })

  const [passengersAmount, setPassengersAmount] = useState(1)
  const [isPassengersOpen, setIsPassengersOpen] = useState(false)

  useEffect(() => {
    const dateFrom = sessionStorage.getItem("dateFrom")
    const cityApiFrom = sessionStorage.getItem("cityApiFrom")
    const cityFrontFrom = sessionStorage.getItem("cityFrontFrom")
    const isCityGeoIpError = sessionStorage.getItem("isCityGeoIpError")

    if (dateFrom) {
      dispatch(setDateFrom(DateTime.fromISO(dateFrom).toISODate()))
    }

    if (cityApiFrom && cityFrontFrom) {
      dispatch(
        setRouteFrom({ apiRoute: cityApiFrom, frontRoute: cityFrontFrom })
      )
    }

    if (!cityApiFrom && !cityFrontFrom && !isCityGeoIpError) {
      dispatch(detectCityByGeoIp())
    }
  }, [dispatch])

  useEffect(() => {
    const amount = mainSearchParams.passengers
    setPassengersAmount(
      amount.passengers_adults +
        amount.passengers_children +
        amount.passengers_infants
    )
  }, [mainSearchParams.passengers])

  useEffect(() => {
    dispatch(
      setPassengersInfo(
        `${passengersAmount} ${pluralize(passengersAmount, [
          "пассажир",
          "пассажира",
          "пассажиров"
        ])}, ${mainSearchParams.airClasses.economy ? "эконом" : "бизнес"}`
      )
    )
    dispatch(
      setPassengersInfoMini(
        `${passengersAmount} ${pluralize(passengersAmount, [
          "пассажир",
          "пассажира",
          "пассажиров"
        ])} / ${mainSearchParams.airClasses.economy ? "эконом" : "бизнес"}`
      )
    )
  }, [passengersAmount, mainSearchParams.airClasses, dispatch])

  // If there is cached data
  useEffect(() => {
    const city = citiesInput[currentDirection]

    if (!city) return
    if (!(city in cachedCitiesData[currentDirection])) return

    setCurrentCitiesData({
      ...currentCitiesData,
      [currentDirection]: cachedCitiesData[currentDirection][city] || []
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesInput])
  // If there isn't
  useEffect(() => {
    const city = citiesInputDebounced[currentDirection]

    if (!city) return
    if (city in cachedCitiesData[currentDirection]) return

    getCitiesData(city, currentDirection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesInputDebounced])

  /**
   *
   * @param {string} keyWord
   * @param {"from" | "to"} direction
   */
  function getCitiesData(keyWord, direction) {
    return api.getCities(keyWord, accessData.loginToken).then(({ data }) => {
      setCurrentCitiesData({ ...currentCitiesData, [direction]: data })
      setCachedCitiesData({
        ...cachedCitiesData,
        [direction]: {
          ...cachedCitiesData[direction],
          [keyWord]: data
        }
      })
    })
  }

  /**
   *
   * @param {*} event
   * @param {"from" | "to"} direction
   */
  function onCitiesChange(event, direction) {
    const value = event.currentTarget.value

    setCurrentDirection(direction)
    setCitiesInput({ ...citiesInput, [direction]: value })

    if (direction === "from") {
      dispatch(setRouteFrom({ apiRoute: "", frontRoute: value }))
    } else {
      dispatch(setRouteTo({ apiRoute: "", frontRoute: value }))
    }
  }

  function switchRoutes() {
    dispatch(
      setRouteFrom({
        apiRoute: mainSearchParams.route.api.to,
        frontRoute: mainSearchParams.route.front.to
      })
    )
    dispatch(
      setRouteTo({
        apiRoute: mainSearchParams.route.api.from,
        frontRoute: mainSearchParams.route.front.from
      })
    )
  }

  function chooseOneWay() {
    dispatch(setOneWay(true))
    dispatch(setDateTo())
    dispatch(setChangedInputTo(""))
    dispatch(setCalendarToInitial())

    setFormError(false)
  }

  function chooseTwoWays() {
    dispatch(setOneWay(false))
    setHasCalendarOffset(true)
    dispatch(setIsOpenCalendar(true))

    if (mainSearchParams.date.api.from) return
    const fromDate = DateTime.fromISO(mainSearchParams.date.api.from)

    dispatch(setIsOneClick(false))
    dispatch(setIsDateInterval(true))
    dispatch(setDateIntervalFrom(fromDate.toISO().slice(0, 10)))

    dispatch(
      setChangedInputFrom(
        `${fromDate.day} ${monthNamesDate[fromDate.month]}, ${firstToUpperCase(
          fromDate.weekdayShort
        )}`
      )
    )
  }

  function onDepartureDateFocus() {
    setHasCalendarOffset(false)
    dispatch(setIsOneClick(true))
    dispatch(setIsDateInterval(false))
    dispatch(setIsOpenCalendar(true))
  }
  function onReturnDateFocus() {
    dispatch(setOneWay(false))
    setHasCalendarOffset(true)
    dispatch(setIsOpenCalendar(true))

    const fromDate = DateTime.fromISO(mainSearchParams.date.api.from)

    if (mainSearchParams.date.api.from && !mainSearchParams.date.api.to) {
      dispatch(setIsOneClick(false))
      dispatch(setIsDateInterval(true))
      dispatch(setIsOpenCalendar(true))

      dispatch(setDateIntervalFrom(fromDate.toISO().slice(0, 10)))
      dispatch(
        setChangedInputFrom(
          `${fromDate.day} ${
            monthNamesDate[fromDate.month]
          }, ${firstToUpperCase(fromDate.weekdayShort)}`
        )
      )
    }
  }

  function onPassengersFocus() {
    setIsPassengersOpen(true)
    dispatch(setIsOpenCalendar(false))
  }
  function onPassengersTabPressed(event) {
    if (event.key !== "Tab") return

    setIsPassengersOpen(false)
  }

  function onSearchSubmit(event) {
    event.preventDefault()

    if (
      !mainSearchParams.route.api.from ||
      !mainSearchParams.route.api.to ||
      !mainSearchParams.date.front.from
    ) {
      setFormError(true)
      return
    }

    const requestQuery = createQuery({
      origin: mainSearchParams.route.api.from,
      destination: mainSearchParams.route.api.to,
      depart_date: mainSearchParams.date.api.from,
      return_date: mainSearchParams.date.api.to,
      transport: mainSearchParams.transport,
      one_way: mainSearchParams.one_way,

      ...mainSearchParams.passengers,
      travel_class: mainSearchParams.airClasses.economy ? "economy" : "business"
    })

    history.push({
      pathname: "/search-result",
      search: requestQuery
    })
  }

  // Close CalendarDropDown
  useClickAway(calendarDropDownRef, (event) => {
    if (!dropDownCalendar.isOpenCalendar) return

    if (event.path.includes(departureDateInputRef.current?.parentElement))
      return
    if (event.path.includes(returnDateInputRef.current?.parentElement)) return

    dispatch(setIsOpenCalendar(false))
  })
  // Close PassengersDropDown
  useClickAway(passengersDropDownRef, (event) => {
    if (!isPassengersOpen) return

    if (event.path.includes(passengersInputRef.current)) return

    setIsPassengersOpen(false)
  })

  return (
    <form className="form" onSubmit={onSearchSubmit}>
      <div className="form__nav">
        <div
          onClick={chooseTwoWays}
          className={`form__nav-btn ${
            !mainSearchParams.one_way ? "form__nav-btn--active" : ""
          }`}
        >
          Туда - обратно
        </div>
        <div
          onClick={chooseOneWay}
          className={`form__nav-btn ${
            mainSearchParams.one_way ? "form__nav-btn--active" : ""
          }`}
        >
          В одну сторону
        </div>
        <button
          onClick={(evt) => evt.preventDefault()}
          className="form__nav-btn"
        >
          Сложный маршрут
        </button>
      </div>
      <div className={`form__inner ${formError ? "form__inner--error" : ""}`}>
        <div className="form__group form__group--departure">
          <input
            onInput={(event) => onCitiesChange(event, "from")}
            value={mainSearchParams.route.front.from || ""}
            className="form__input"
            type="text"
            id="main-departure"
            placeholder="Откуда"
            autoComplete="off"
            tabIndex="1"
          />
          <label className="form__label" htmlFor="main-departure">
            откуда
          </label>
          <button onClick={switchRoutes} type="button" className="form__switch">
            Поменять местами
          </button>
          {currentCitiesData.from.length > 0 && (
            <DropDown
              nodeDropDown={fromCitiesDropDownRef}
              currentCities={currentCitiesData.from}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setCitiesInput}
              inputEl={citiesInfoInputRef}
              inputDirection={currentDirection}
              dateFromInput={departureDateInputRef}
            />
          )}
        </div>
        <div className="form__group form__group--arrival">
          <input
            onInput={(event) => onCitiesChange(event, "to")}
            value={mainSearchParams.route.front.to || ""}
            className="form__input form__input--arrival"
            type="text"
            id="main-arrival"
            placeholder="Куда"
            autoComplete="off"
            ref={citiesInfoInputRef}
            tabIndex="2"
            onFocus={() => dispatch(setIsOpenCalendar(false))}
          />
          <label
            className="form__label form__label--arrival"
            htmlFor="main-arrival"
          >
            куда
          </label>
          {currentCitiesData.to.length > 0 && (
            <DropDown
              nodeDropDown={toCitiesDropDownRef}
              currentCities={currentCitiesData.to}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setCitiesInput}
              inputEl={citiesInfoInputRef}
              inputDirection={currentDirection}
              dateFromInput={departureDateInputRef}
            />
          )}
        </div>
        <div className="form__group form__group--date-dep">
          <input
            id="date-departure"
            className="form__input"
            placeholder="Туда"
            value={
              mainSearchParams.date.front.from
                ? mainSearchParams.date.front.from
                : mainSearchParams.date.changedInput.from
            }
            readOnly
            tabIndex="3"
            ref={departureDateInputRef}
            onFocus={onDepartureDateFocus}
          />
          <label className="form__label" htmlFor="date-departure">
            туда
          </label>
          <DropDownCalendar
            parentRef={calendarDropDownRef}
            dateInputRef={returnDateInputRef}
            hasOffset={hasCalendarOffset}
            hidden={!dropDownCalendar.isOpenCalendar}
          />
        </div>
        <div className="form__group form__group--date-arr">
          <input
            id="date-arrival"
            className="form__input"
            placeholder="Дата обратно"
            ref={returnDateInputRef}
            value={
              mainSearchParams.date.front.to
                ? mainSearchParams.date.front.to
                : mainSearchParams.date.changedInput.to
            }
            readOnly
            tabIndex="4"
            onFocus={onReturnDateFocus}
          />
          <label className="form__label" htmlFor="date-arrival">
            обратно
          </label>
        </div>
        <div className="form__group form__group--passengers">
          <input
            className="form__input form__input--passenger"
            id="main-passenger"
            placeholder="Пассажиры и класс"
            value={mainSearchParams.passengersInfo}
            readOnly
            tabIndex="5"
            ref={passengersInputRef}
            onFocus={onPassengersFocus}
            onKeyDown={onPassengersTabPressed}
            // onBlur={onPassengersBlur}
          />
          <label className="form__label" htmlFor="main-passenger">
            Пассажиры и класс
          </label>
          <DropDownPassengers
            parentRef={passengersDropDownRef}
            isPassengersOpen={isPassengersOpen}
          />
        </div>
        <input className="form__btn" type="submit" value="Найти" tabIndex="6" />
      </div>
      {!searchResult && <OpenBooking />}
    </form>
  )
}

export default SearchForm
