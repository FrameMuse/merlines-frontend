import { useDispatch,useSelector } from "react-redux"
import { Link, useHistory,useLocation } from "react-router-dom"

import api from "../../api/api"
import useFullRoute from "../../hooks/useFullRoute"
import { selectMainSearchParams } from "../../reducers/mainSearchSlice"
import {
  clearPickedMonthData,
  setCurrentMonthDate,
  setDaysInterval,
  setMonthDate,
  setPickedMonthData} from "../../reducers/priceCalendarSlice"
import { setHistoryRoute } from "../../reducers/routesDataSlice"
import routes from "../../routes"
import { dateToMonthName, firstToUpperCase,getDaysInterval } from "../../utils"

function PriceCalendarMonth(props) {
  const { transport, monthDate, price, betterPrice, setPickedMonthName } = props
  const dispatch = useDispatch()
  const mainSearchParams = useSelector(selectMainSearchParams)
  // const accessData = useSelector(selectAccessData);
  // const priceCalendarData = useSelector(selectPriceCalendar);
  const fullRoute = useFullRoute()
  const location = useLocation()
  const history = useHistory()

  const getMonth = async (evt) => {
    // console.log('click getMonth');
    dispatch(setHistoryRoute(fullRoute))
    dispatch(clearPickedMonthData())
    dispatch(setMonthDate(monthDate))
    const currentMonthDate =
      evt.currentTarget.querySelector(".calendar__month").dataset.date
    dispatch(setCurrentMonthDate(currentMonthDate))
    const daysInterval = getDaysInterval(currentMonthDate)
    // console.log('daysInterval', daysInterval);
    setPickedMonthName(firstToUpperCase(dateToMonthName(monthDate)))
    dispatch(setDaysInterval(daysInterval))

    const params = {
      origin: mainSearchParams.route.api.from,
      destination: mainSearchParams.route.api.to,
      start_date: daysInterval.start_date,
      end_date: daysInterval.end_date
    }

    const airSearchRoute = `air?date_group_by=day&origin=${params.origin}&destination=${params.destination}&start_date=${params.start_date}&end_date=${params.end_date}`

    if (location.pathname.includes("air")) {
      // console.log('is redirect???');
      history.push({
        // pathname: location.pathname,
        pathname:
          location.pathname === "/price-calendar/air"
            ? routes.priceCalendar.airDays
            : routes.landing.airDays,
        search: airSearchRoute.slice(3)
      })
    }

    // try {
    //   const days = await api.getDays(
    //     transport,
    //     {
    //       origin: mainSearchParams.route.api.from,
    //       destination: mainSearchParams.route.api.to,
    //       ...daysInterval,
    //     },
    //     accessData.loginToken
    //   );

    //   dispatch(setPickedMonthData({
    //     days: days.data.result,
    //     currentMonthDate: currentMonthDate,
    //     transport: transport,
    //     previousMonthDate: daysInterval.start_date.slice(0, 7),
    //     nextMonthDate: daysInterval.end_date.slice(0, 7),
    //     pickedMonthName: firstToUpperCase(dateToMonthName(monthDate))
    //   }));
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const getMonthDays = (evt) => getMonth(evt, transport, monthDate)

  const getMonthBus = async (evt) => {
    dispatch(setHistoryRoute(fullRoute))
    dispatch(clearPickedMonthData())
    dispatch(setMonthDate(monthDate))
    const currentMonthDate =
      evt.currentTarget.querySelector(".calendar__month").dataset.date
    dispatch(setCurrentMonthDate(currentMonthDate))
    const daysInterval = getDaysInterval(currentMonthDate)
    setPickedMonthName(firstToUpperCase(dateToMonthName(monthDate)))
    dispatch(setDaysInterval(daysInterval))

    try {
      const days = await api.getDays(transport, {
        origin: 21,
        ...daysInterval
      })

      if (days) {
        dispatch(
          setPickedMonthData({
            days: days.data.result,
            currentMonthDate: currentMonthDate,
            transport: transport,
            previousMonthDate: daysInterval.start_date.slice(0, 7),
            nextMonthDate: daysInterval.end_date.slice(0, 7),
            pickedMonthName: firstToUpperCase(dateToMonthName(monthDate))
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getMonthDaysBus = (evt) => getMonthBus(evt, transport, monthDate)
  console.log(location.pathname)

  return (
    <>
      {price ? (
        <>
          {betterPrice === price ? (
            <li
              onClick={
                location.pathname.includes("air")
                  ? getMonthDays
                  : getMonthDaysBus
              }
              className="calendar__item calendar__item--best"
            >
              <Link
                to={`/price-calendar/${transport}/days`}
                className="calendar__item-link"
              >
                <span className="calendar__month" data-date={monthDate}>
                  {dateToMonthName(monthDate)}
                </span>
                <span className="calendar__price">
                  {price ? `от ${price.toLocaleString()} ₽` : "нет данных"}
                </span>
                <span className="calendar__text">лучшая цена</span>
              </Link>
            </li>
          ) : (
            <li
              onClick={
                location.pathname.includes("air")
                  ? getMonthDays
                  : getMonthDaysBus
              }
              className="calendar__item"
            >
              <Link
                to={`/price-calendar/${transport}/days`}
                className="calendar__item-link"
              >
                <span className="calendar__month" data-date={monthDate}>
                  {dateToMonthName(monthDate)}
                </span>
                <span className="calendar__price">
                  {price ? `от ${price.toLocaleString()} ₽` : "нет данных"}
                </span>
              </Link>
            </li>
          )}
        </>
      ) : (
        <li className="calendar__item">
          <Link to="#" className="calendar__item-link">
            <span className="calendar__month" data-date={monthDate}>
              {dateToMonthName(monthDate)}
            </span>
            <span className="calendar__price">
              {price ? `от ${price.toLocaleString()} ₽` : "нет данных"}
            </span>
          </Link>
        </li>
      )}
    </>
  )
}

export default PriceCalendarMonth
