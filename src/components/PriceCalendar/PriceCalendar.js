import "./calendar.scss"
import "./calendar-form.scss"

import React, { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router-dom"

import api from "../../api/api"
import useFullRoute from "../../hooks/useFullRoute"
import useQuery from "../../hooks/useQuery"
import {
  selectMainSearchParams,
  setRouteFrom,
  setRouteTo
} from "../../reducers/mainSearchSlice"
import { selectPriceCalendar, setData } from "../../reducers/priceCalendarSlice"
import { setPriceCalendarSearchRouteAir } from "../../reducers/routesDataSlice"
import routes from "../../routes"
import parseParamsFromRoute from "../../services/parseParamsFromRoute"
import TransportSwitcher from "../SearchResult/TransportSwitcher"
import PriceCalendarDays from "./PriceCalendarDays/PriceCalendarDays"
import PriceCalendarMonth from "./PriceCalendarMonth"
import PriceCalendarSearch from "./PriceCalendarSearch"
import PriceCalendarVacationSlider from "./PriceCalendarVacationSlider"

function PriceCalendar({ isLanding }) {
  const location = useLocation()
  const query = useQuery()
  const priceCalendarData = useSelector(selectPriceCalendar)
  const mainSearchParams = useSelector(selectMainSearchParams)
  const [pickedMonthName, setPickedMonthName] = useState("")
  const priceCalendarLocation = {
    air:
      location.pathname === routes.priceCalendar.air ||
      location.pathname === routes.landing.air ||
      query.get("next") === routes.priceCalendar.air,
    train:
      location.pathname === routes.priceCalendar.train ||
      query.get("next") === routes.priceCalendar.train,
    bus:
      location.pathname === routes.priceCalendar.bus ||
      query.get("next") === routes.priceCalendar.bus
  }

  const fullRoute = useFullRoute()
  const dispatch = useDispatch()

  // const getBusSearchParams = () => {
  //   const busSearchParams = {
  //     origin: 21,
  //     start_date: '2021-01-01',
  //     end_date: '2021-12-01',
  //   };
  //
  //   return `?date_group_by=month&origin=${busSearchParams.origin}&start_date=${busSearchParams.start_date}&end_date=${busSearchParams.end_date}`;
  // };

  useEffect(() => {
    const testParams = parseParamsFromRoute(
      location.pathname,
      location.search,
      query,
      dispatch,
      setRouteFrom,
      setRouteTo
    )

    if (!location.search) {
      dispatch(setRouteFrom({ apiRoute: "", frontRoute: "" }))
      dispatch(setRouteTo({ apiRoute: "", frontRoute: "" }))
    }

    async function testGetMonth() {
      try {
        if (location.pathname.includes("air")) {
          const air = await api.getMonths("air", testParams.routeParams)
          dispatch(setData({ transport: "air", months: air.data.result }))
          dispatch(setPriceCalendarSearchRouteAir(fullRoute.slice(16)))

          // const busParams = getBusSearchParams();
          // const bus = await api.getMonthsTest('bus', busParams);
          // dispatch(setData({ transport: 'bus', months: bus.data.result }));
          // dispatch(setPriceCalendarSearchRouteBus(busParams));
        }

        // if (location.pathname.includes('bus')) {
        //   const bus = await api.getMonthsTest(fullRoute.slice(16));
        //   dispatch(setData({ transport: 'bus', months: bus.data.result }));
        // };
      } catch (error) {
        console.error(error)
      }
    }

    // async function getYearMonthsData(airRouteFromDays) {
    //   const startApiRoute = fullRoute.indexOf('?');
    //   console.log(fullRoute);
    //   console.log(query.get('date_group_by'));

    //   try {
    //     if (location.pathname.includes('air')) {
    //       const air = await api.getMonthsTest('air', (airRouteFromDays ? airRouteFromDays : fullRoute.slice(startApiRoute)));
    //       dispatch(setData({ transport: 'air', months: air.data.result }));
    //       dispatch(setPriceCalendarSearchRouteAir(fullRoute.slice(16)));

    //       const busParams = getBusSearchParams();
    //       const bus = await api.getMonthsTest('bus', busParams);
    //       dispatch(setData({ transport: 'bus', months: bus.data.result }));
    //       dispatch(setPriceCalendarSearchRouteBus(busParams));
    //     };

    //     if (location.pathname.includes('bus')) {
    //       const bus = await api.getMonthsTest(fullRoute.slice(16));
    //       dispatch(setData({ transport: 'bus', months: bus.data.result }));
    //     };
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // async function getCityNameFrom() {
    //   const codeFrom = query.get('origin');

    //   if (codeFrom) {
    //     try {
    //       const cityFrom = await api.getCityNameFromCode(codeFrom);
    //       if (cityFrom) {
    //         dispatch(setRouteFrom({ apiRoute: codeFrom, frontRoute: cityFrom.data[0].cases.su }));
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };

    // async function getCityNameTo() {
    //   const codeTo = query.get('destination');

    //   if (codeTo) {
    //     try {
    //       const cityTo = await api.getCityNameFromCode(codeTo);
    //       if (cityTo) {
    //         dispatch(setRouteTo({ apiRoute: codeTo, frontRoute: cityTo.data[0].cases.su }));
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };

    if (location.search && !location.pathname.includes("days")) {
      testGetMonth()
    }

    // getCityNameFrom();
    // getCityNameTo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return (
    <section
      className={`calendar ${
        isLanding ? "landing__calendar" : "calendar--days"
      }`}
    >
      <div className="calendar-container">
        <h2
          className={`calendar__title ${
            isLanding ? "landing__calendar-title" : ""
          }`}
        >
          Календарь низких цен
        </h2>
        {isLanding ? (
          <p className="landing__text-info">{`Направление: ${mainSearchParams.route.front.from} - ${mainSearchParams.route.front.to}`}</p>
        ) : (
          <>
            <PriceCalendarSearch
              transport={priceCalendarData.air.transport}
              setPickedMonthName={setPickedMonthName}
            />
            {!mainSearchParams.one_way && <PriceCalendarVacationSlider />}
          </>
        )}
        <TransportSwitcher isCalendar={true} />
        {priceCalendarLocation.air && (
          <ul className="calendar__list">
            {location.search ? (
              <>
                {priceCalendarData.air.months.length ? (
                  priceCalendarData.air.months.map((month, index) => (
                    <PriceCalendarMonth
                      key={index}
                      transport={priceCalendarData.air.transport}
                      monthDate={month.date}
                      price={month.price}
                      betterPrice={priceCalendarData.air.betterPrice}
                      setPickedMonthName={setPickedMonthName}
                    />
                  ))
                ) : (
                  <div>is loading .............</div>
                )}
              </>
            ) : (
              <div>Выберите направление и начните поиск</div>
            )}
          </ul>
        )}

        {priceCalendarLocation.train && (
          <ul className="calendar__list">
            {priceCalendarData.train.months.length ? (
              priceCalendarData.train.months.map((month, index) => (
                <PriceCalendarMonth
                  key={index}
                  transport={priceCalendarData.train.transport}
                  monthDate={month.date}
                  price={month.price}
                  betterPrice={priceCalendarData.train.betterPrice}
                />
              ))
            ) : (
              <div>is loading .............</div>
            )}
          </ul>
        )}

        {priceCalendarLocation.bus && (
          <ul className="calendar__list">
            {priceCalendarData.bus.months.length ? (
              priceCalendarData.bus.months.map((month, index) => (
                <PriceCalendarMonth
                  key={index}
                  transport={priceCalendarData.bus.transport}
                  monthDate={month.date}
                  price={month.price / 100}
                  betterPrice={priceCalendarData.bus.betterPrice}
                  setPickedMonthName={setPickedMonthName}
                />
              ))
            ) : (
              <div>is loading .............</div>
            )}
          </ul>
        )}
      </div>

      <Switch>
        <Route path="/price-calendar/air/days">
          {query.get("next") === routes.priceCalendar.airDays ? (
            <PriceCalendarDays
              pickedMonthName={pickedMonthName}
              setPickedMonthName={setPickedMonthName}
            />
          ) : (
            <PriceCalendarDays
              pickedMonthName={pickedMonthName}
              setPickedMonthName={setPickedMonthName}
            />
          )}
        </Route>
        <Route path="/tickets/air/days">
          <PriceCalendarDays
            pickedMonthName={pickedMonthName}
            setPickedMonthName={setPickedMonthName}
          />
        </Route>
        <Route path="/price-calendar/train/days">
          <div>train</div>
          {/* <PriceCalendarDays transport="train" /> */}
        </Route>
        <Route path="/price-calendar/bus/days">
          <PriceCalendarDays
            pickedMonthName={pickedMonthName}
            setPickedMonthName={setPickedMonthName}
            transport="bus"
          />
        </Route>
      </Switch>
    </section>
  )
}

export default PriceCalendar
