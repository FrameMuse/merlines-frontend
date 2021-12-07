import { DateTime } from "luxon"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useLocation } from "react-router-dom"

import api from "../../../api/api"
import { monthNames } from "../../../constants"
import { selectAccessData } from "../../../reducers/accessDataSlice"
import { selectMainSearchParams } from "../../../reducers/mainSearchSlice"
import {
  clearPickedMonthData,
  selectPriceCalendar,
  setPickedMonthData
} from "../../../reducers/priceCalendarSlice"
import { selectRoutesData } from "../../../reducers/routesDataSlice"
import routes from "../../../routes"
import {
  capitalize,
  dateToMonthName,
  getDaysInterval
} from "../../../utils"
import Svg from "../../common/Svg"
import PriceCalendarDaysFilter from "./PriceCalendarDaysFilter"

function PriceCalendarDaysHeader({ pickedMonthName, setPickedMonthName }) {
  const dispatch = useDispatch()
  const priceCalendarData = useSelector(selectPriceCalendar)
  const mainSearchParams = useSelector(selectMainSearchParams)
  const accessData = useSelector(selectAccessData)
  const routesData = useSelector(selectRoutesData)
  const location = useLocation()
  const history = useHistory()

  const changeMonth = (monthArr, next, monthName) => {
    let current = monthArr.findIndex((item) => item === monthName)
    let index = next ? current + 1 : current - 1

    if (index > 11) {
      return monthArr[0]
    } else if (index < 0) {
      return monthArr[11]
    } else return monthArr[index]
  }

  const isCurrentDate =
    DateTime.now().toISO().slice(0, 7) ===
    priceCalendarData.pickedMonthData.currentMonthDate

  console.log("routes.priceCalendar.airDays", routes.priceCalendar.airDays)
  console.log("location.pathname", location.pathname)
  console.log("location.search", location.search)

  const pickMonth = async (evt) => {
    dispatch(clearPickedMonthData())

    const isNext = evt.currentTarget.classList.contains(
      "days__arrow-center--right"
    )
    const currentDate = DateTime.fromISO(
      priceCalendarData.pickedMonthData.currentMonthDate
    )
    const currentMonthDate = (
      isNext ? currentDate.plus({ month: 1 }) : currentDate.minus({ month: 1 })
    ).toISODate()
    const daysInterval = getDaysInterval(currentMonthDate)

    setPickedMonthName(changeMonth(monthNames, isNext, pickedMonthName))

    // const airSearchRoute = `air?date_group_by=day&origin=${mainSearchParams.route.api.from}&destination=${mainSearchParams.route.api.to}&start_date=${daysInterval.start_date}&end_date=${daysInterval.end_date}`;

    if (location.pathname.includes("air")) {
      history.push({
        pathname: location.pathname,
        search: location.search
      })
      // history.push({
      //   pathname: routes.priceCalendar.airDays,
      //   search: airSearchRoute.slice(3)
      // });
    }

    if (priceCalendarData.pickedMonthData.transport === "air") {
      try {
        const days = await api.getDays(
          priceCalendarData.pickedMonthData.transport,
          {
            origin: mainSearchParams.route.api.from,
            destination: mainSearchParams.route.api.to,
            ...daysInterval
          },
          accessData.loginToken
        )

        dispatch(
          setPickedMonthData({
            days: days.data.result,
            currentMonthDate: currentMonthDate.slice(0, 7),
            transport: priceCalendarData.pickedMonthData.transport,
            previousMonthDate: daysInterval.start_date.slice(0, 7),
            nextMonthDate: daysInterval.end_date.slice(0, 7),
            pickedMonthName: capitalize(dateToMonthName(currentMonthDate))
          })
        )
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const days = await api.getDays(
          priceCalendarData.pickedMonthData.transport,
          {
            origin: 21,
            ...daysInterval
          },
          accessData.loginToken
        )

        dispatch(
          setPickedMonthData({
            days: days.data.result,
            currentMonthDate: currentMonthDate.slice(0, 7),
            transport: priceCalendarData.pickedMonthData.transport,
            previousMonthDate: daysInterval.start_date.slice(0, 7),
            nextMonthDate: daysInterval.end_date.slice(0, 7),
            pickedMonthName: capitalize(dateToMonthName(currentMonthDate))
          })
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="days__header">
      <Link to={routesData.historyRoute}>
        <Svg
          svgClass="days__arrow"
          svgName="arrow-slider"
          svgWidth="16"
          svgHeight="16"
        />
      </Link>
      <div className="days__center">
        <Svg
          handleClick={!isCurrentDate ? pickMonth : undefined}
          svgClass="days__arrow-center days__arrow-center--left"
          svgName="arrow-open"
          svgWidth="10"
          svgHeight="10"
        />
        <span>{priceCalendarData.pickedMonthData.pickedMonthName}</span>
        <Svg
          handleClick={pickMonth}
          svgClass="days__arrow-center days__arrow-center--right"
          svgName="arrow-open"
          svgWidth="10"
          svgHeight="10"
        />
      </div>
      <PriceCalendarDaysFilter />
    </div>
  )
}

export default PriceCalendarDaysHeader
