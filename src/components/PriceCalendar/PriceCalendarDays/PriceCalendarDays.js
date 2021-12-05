import "./days.scss"

import { DateTime } from "luxon"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

import api from "../../../api/api"
import { weekDays } from "../../../constants"
// import useFullRoute from '../../../hooks/useFullRoute';
import useQuery from "../../../hooks/useQuery"
import { setRouteFrom, setRouteTo } from "../../../reducers/mainSearchSlice"
import { setPickedMonthData } from "../../../reducers/priceCalendarSlice"
import parseParamsFromRoute from "../../../services/parseParamsFromRoute"
import { dateToMonthName, firstToUpperCase } from "../../../utils"
import PriceCalendarDaysHeader from "./PriceCalendarDaysHeader"
import PriceCalendarDaysList from "./PriceCalendarDaysList"

function PriceCalendarDays({ pickedMonthName, setPickedMonthName }) {
  const location = useLocation()
  // const fullRoute = useFullRoute();
  const query = useQuery()
  const dispatch = useDispatch()
  // const priceCalendarData = useSelector(selectPriceCalendar);

  useEffect(() => {
    const params = parseParamsFromRoute(
      location.pathname,
      location.search,
      query,
      dispatch,
      setRouteFrom,
      setRouteTo
    )
    // console.log('routeParams in days', params);

    async function getMonthsDaysData() {
      try {
        if (location.pathname.includes("air")) {
          const currentDate = DateTime.fromISO(query.get("start_date"))
            .plus({ month: 1 })
            .toISODate()
          // const apiSearchRoute = 'air' + fullRoute.slice(24);
          const prevMonth = query.get("start_date").slice(0, 7)
          const nextMonth = query.get("end_date").slice(0, 7)
          // console.log('currentDate', currentDate);
          // console.log('in days', ('air' + fullRoute.slice(24)));
          // console.log('previousMonthDate', query.get('start_date').slice(0, 7));
          // console.log('nextMonthDate', query.get('end_date').slice(0, 7));
          // console.log('currentMonthDate', currentDate.slice(0, 7));
          // console.log('pickedMonthName', firstToUpperCase(dateToMonthName(currentDate)));

          const days = await api.getMonths("air", params.routeParams)
          // const days = await api.getMonthsTest(apiSearchRoute);

          if (days) {
            dispatch(
              setPickedMonthData({
                days: days.data.result,
                currentMonthDate: currentDate.slice(0, 7),
                transport: "air",
                previousMonthDate: prevMonth,
                nextMonthDate: nextMonth,
                pickedMonthName: firstToUpperCase(dateToMonthName(currentDate))
              })
            )
          }
        }

        // if (location.pathname.includes('bus')) {
        //   const bus = await api.getMonthsTest(fullRoute.slice(16));
        //   dispatch(setData({ transport: 'bus', months: bus.data.result }));
        // };
      } catch (error) {
        console.error(error)
      }
    }

    if (location.search && location.pathname.includes("days")) {
      getMonthsDaysData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return (
    <section className="days">
      <PriceCalendarDaysHeader
        pickedMonthName={pickedMonthName}
        setPickedMonthName={setPickedMonthName}
      />
      <div className="days__inner">
        <ul className="days__week">
          {weekDays.map((day, index) => (
            <li key={index} className="days__week-item">
              {day}
            </li>
          ))}
        </ul>
        <PriceCalendarDaysList />
      </div>
    </section>
  )
}

export default PriceCalendarDays
