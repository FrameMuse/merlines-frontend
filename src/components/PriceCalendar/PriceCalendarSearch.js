import { useState, useRef, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { DateTime } from "luxon"
import { useSelector, useDispatch } from "react-redux"
import {
  selectPriceCalendar,
  clearPickedMonthData,
  setPickedMonthData
} from "../../reducers/priceCalendarSlice"
import {
  selectMainSearchParams,
  setRouteFrom,
  setRouteTo,
  setOneWay
} from "../../reducers/mainSearchSlice"
import {
  setPriceCalendarSearchRouteAir,
  setPriceCalendarSearchRouteBus
} from "../../reducers/routesDataSlice"
import { selectAccessData } from "../../reducers/accessDataSlice"
import api from "../../api/api"
import DropDown from "../DropDown/DropDown"
import useDebounce from "../../hooks/useDebounce"
import { dateToMonthName, firstToUpperCase } from "../../utils"
// import useFullRoute from '../../hooks/useFullRoute';
// import useQuery from '../../hooks/useQuery';

function PriceCalendarSearch({ transport, setPickedMonthName }) {
  const [inputValue, setInputValue] = useState("")
  const [currentCitiesData, setCurrentCitiesData] = useState("")
  console.log("currentCitiesData: 11 ", currentCitiesData)
  const [historyCitiesData, setHistoryCitiesData] = useState({
    from: [],
    to: []
  })
  const [inputDirection, setInputDirection] = useState("")
  const inputEl = useRef(null)
  const debouncedSearchInput = useDebounce(inputValue, 500)
  const dispatch = useDispatch()
  const mainSearchParams = useSelector(selectMainSearchParams)
  const accessData = useSelector(selectAccessData)
  const priceCalendarData = useSelector(selectPriceCalendar)
  // const routesData = useSelector(selectRoutesData);
  const history = useHistory()
  const location = useLocation()
  // const fullRoute = useFullRoute();
  // const query = useQuery();

  const getAirSearchParams = () => {
    const params = {
      origin: mainSearchParams.route.api.from,
      destination: mainSearchParams.route.api.to,
      start_date: DateTime.now().toISODate(),
      end_date: `${DateTime.local(
        DateTime.now().plus({ year: 1 }).year,
        DateTime.now().month,
        1
      ).toISODate()}`
    }

    return `air?date_group_by=month&origin=${params.origin}&destination=${params.destination}&start_date=${params.start_date}&end_date=${params.end_date}`
  }

  const getBusSearchParams = () => {
    const busSearchParams = {
      origin: 21,
      start_date: "2021-01-01",
      end_date: "2021-12-01"
    }

    return `bus?date_group_by=month&origin=${busSearchParams.origin}&start_date=${busSearchParams.start_date}&end_date=${busSearchParams.end_date}`
  }

  const getMonthData = async () => {
    // const monthDataParams = {
    //   origin: mainSearchParams.route.api.from,
    //   destination: mainSearchParams.route.api.to,
    //   start_date: DateTime.now().toISODate(),
    //   end_date: `${DateTime.local(DateTime.now().plus({ year: 1 }).year, DateTime.now().month, 1).toISODate()}`,
    // };

    // try {
    //   const air = await api.getMonths('air', monthDataParams);
    //   dispatch(setData({ transport: 'air', months: air.data.result }));

    //   const mockMonthPrice = (data, num) => {
    //     let newArr = data.map(ticket => ({ ...ticket }));
    //     newArr = newArr.map(month => {
    //       return { ...month, price: month.price + num };
    //     });
    //     return newArr;
    //   };

    //   const busDataParams = {
    //     origin: 21,
    //     start_date: '2021-01-01',
    //     end_date: '2021-12-01',
    //   };

    //   const bus = await api.getMonths('bus', busDataParams);
    //   dispatch(setData({ transport: 'bus', months: bus.data.result }));

    //   dispatch(setData({ transport: 'train', months: mockMonthPrice(air.data.result, 3) }));
    // } catch (error) {
    //   console.error(error);
    // }

    const airParams = getAirSearchParams()
    dispatch(setPriceCalendarSearchRouteAir(airParams))
    console.log("airParams", airParams)

    const busParams = getBusSearchParams()
    dispatch(setPriceCalendarSearchRouteBus(busParams))
    console.log("busParams", busParams.slice(3))

    if (location.pathname.includes("air")) {
      history.push({
        pathname: location.pathname,
        search: airParams.slice(3)
      })
    }

    if (location.pathname.includes("bus")) {
      history.push({
        pathname: location.pathname,
        search: busParams.slice(3)
      })
    }
  }

  const getCitiesData = async (word, direction) => {
    try {
      const cities = await api.getCities(word)

      setHistoryCitiesData({
        ...historyCitiesData,
        [direction]: [
          ...historyCitiesData[direction],
          {
            keyWord: word,
            citiesInfo: cities.data
          }
        ]
      })
      setCurrentCitiesData({
        [direction]: {
          keyWord: word,
          citiesInfo: cities.data
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getValue = (evt) => {
    setInputDirection(evt.target.dataset.direction)
    setInputValue({
      ...inputValue,
      [evt.target.dataset.direction]: evt.target.value
    })

    if (evt.target.dataset.direction === "from") {
      dispatch(setRouteFrom({ apiRoute: "", frontRoute: evt.target.value }))
    } else {
      dispatch(setRouteTo({ apiRoute: "", frontRoute: evt.target.value }))
    }
  }

  const getMonth = async () => {
    dispatch(clearPickedMonthData())
    setPickedMonthName(
      firstToUpperCase(dateToMonthName(priceCalendarData.monthDate))
    )

    try {
      const days = await api.getDays(
        // transport,
        "air",
        {
          origin: mainSearchParams.route.api.from,
          destination: mainSearchParams.route.api.to,
          ...priceCalendarData.daysInterval // идет запрос без даты, проверить что с датами
        },
        accessData.loginToken
      )

      dispatch(
        setPickedMonthData({
          days: days.data.result,
          currentMonthDate: priceCalendarData.currentMonthDate,
          transport: transport,
          previousMonthDate: priceCalendarData.daysInterval.start_date.slice(
            0,
            7
          ),
          nextMonthDate: priceCalendarData.daysInterval.end_date.slice(0, 7),
          pickedMonthName: firstToUpperCase(
            dateToMonthName(priceCalendarData.monthDate)
          )
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const search = (evt) => {
    evt.preventDefault()
    getMonthData()
    priceCalendarData.pickedMonthData.currentMonth && getMonth() // логика поиска при открытых днях
  }

  const changeRoutes = () => {
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

  useEffect(() => {
    if (debouncedSearchInput) {
      if (
        !historyCitiesData[inputDirection].find(
          (item) =>
            item.keyWord === inputValue[inputDirection].toLowerCase() ||
            !inputValue[inputDirection]
        )
      ) {
        getCitiesData(inputValue[inputDirection].toLowerCase(), inputDirection)
      } else {
        inputValue[inputDirection]
          ? setCurrentCitiesData({
              [inputDirection]: historyCitiesData[inputDirection].find(
                (item) =>
                  item.keyWord === inputValue[inputDirection].toLowerCase()
              )
            })
          : setCurrentCitiesData([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput])

  return (
    <form className="calendar-form" onSubmit={search}>
      <div className="calendar-form__header">
        <button
          onClick={() => dispatch(setOneWay(false))}
          className={`calendar-form__btn ${
            !mainSearchParams.one_way ? "calendar-form__btn--active" : ""
          }`}
          type="button"
        >
          Туда - обратно
        </button>
        <button
          onClick={() => dispatch(setOneWay(true))}
          className={`calendar-form__btn ${
            mainSearchParams.one_way ? "calendar-form__btn--active" : ""
          }`}
          type="button"
        >
          В одну сторону
        </button>
      </div>
      <div className="calendar-form__inner">
        <div className="calendar-form__group">
          <input
            onChange={getValue}
            // value={sessionStorage.getItem('cityFrontFrom')}
            value={mainSearchParams.route.front.from || ""}
            className="calendar-form__input"
            type="text"
            id="main-departure"
            placeholder="откуда"
            autoComplete="off"
            data-direction="from"
          />
          <label className="calendar-form__label" htmlFor="main-departure">
            откуда
          </label>
          <button
            type="button"
            onClick={changeRoutes}
            className="calendar-form__switch"
          >
            Поменять местами
          </button>
          {currentCitiesData.from?.citiesInfo && currentCitiesData.from && (
            <DropDown
              currentCities={currentCitiesData.from.citiesInfo}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setInputValue}
              inputEl={inputEl}
              inputDirection={inputDirection}
            />
          )}
        </div>
        <div className="calendar-form__group">
          <input
            onChange={getValue}
            value={mainSearchParams.route.front.to || ""}
            className="calendar-form__input calendar-form__input--arrival"
            type="text"
            id="main-arrival"
            placeholder="куда"
            autoComplete="off"
            ref={inputEl}
            data-direction="to"
          />
          <label
            className="calendar-form__label calendar-form__label--arrival"
            htmlFor="main-arrival"
          >
            куда
          </label>
          {currentCitiesData.to?.citiesInfo && currentCitiesData.to && (
            <DropDown
              currentCities={
                currentCitiesData.to && currentCitiesData.to.citiesInfo
              }
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setInputValue}
              inputDirection={inputDirection}
            />
          )}
        </div>
        <input className="calendar-form__submit" type="submit" value="Найти" />
      </div>
    </form>
  )
}

export default PriceCalendarSearch
