import "./transports.scss"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import { Transport } from "../../constants"
import useQuery from "../../hooks/useQuery"
import { selectPriceCalendar } from "../../reducers/priceCalendarSlice"
import { selectRoutesData } from "../../reducers/routesDataSlice"
import { selectSearchBusTicketResult } from "../../reducers/searchResultBusTicketsSlice"
import { selectSearchResult } from "../../reducers/searchResultSlice"
import routes from "../../routes"
import Svg from "./Svg"

function TransportSwitcher({
  isCalendar,
  toSwitchTransport,
  setSearchTransport,
  searchTransportIs
}) {
  const priceCalendarData = useSelector(selectPriceCalendar)
  const searchResultData = useSelector(selectSearchResult)
  const searchResultBusTicketData = useSelector(selectSearchBusTicketResult)
  const routesData = useSelector(selectRoutesData)
  const location = useLocation()
  const query = useQuery()

  const [busMinPrice, setBusMinPrice] = useState()
  const [airMinPrice, setAirMinPrice] = useState()

  const priceCalendarLocation = {
    air:
      location.pathname.includes(routes.air.slice(1)) ||
      query.get("next") === routes.priceCalendar.air,
    train:
      location.pathname.includes(routes.train.slice(1)) ||
      query.get("next") === routes.priceCalendar.train,
    bus:
      location.pathname.includes(routes.bus.slice(1)) ||
      query.get("next") === routes.priceCalendar.bus
  }

  const findMinBusPrice = (tickets) => {
    let minPrice = tickets?.[0]?.price
    tickets?.forEach((elem) => {
      if (minPrice < elem.price && elem.price !== 0) minPrice = elem.price
    })
    return minPrice
  }

  const finMinAirPrice = (tickets) => {
    let minPrice = tickets?.[0]?.sellers[0]?.price
    tickets?.forEach((ticket) => {
      ticket.sellers.forEach((seller) => {
        if (minPrice > seller.price && seller.price !== 0)
          minPrice = seller.price
      })
    })
    return minPrice
  }

  useEffect(() => {
    setBusMinPrice(
      findMinBusPrice(searchResultBusTicketData?.searchData?.tickets)
    )
    setAirMinPrice(finMinAirPrice(searchResultData?.searchData?.tickets))
  }, [searchResultBusTicketData, searchResultData])

  const betterPriceToString = (betterPrice) => {
    if (betterPrice && betterPrice !== Infinity) {
      return `От ${betterPrice.toLocaleString()} ₽`
    } else {
      return `. . .`
    }
  }

  useEffect(() => {
    const searchParamTransport = query.get("transport")
    !isCalendar && setSearchTransport(searchParamTransport)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isCalendar ? (
        <nav
          className={`transports ${
            isCalendar ? "calendar" : "ticket-list"
          }__transports`}
        >
          <Link
            className={`transports-link transports-link--plane ${
              priceCalendarLocation.air ? "transports-link--active" : ""
            }`}
            to={
              location.search
                ? routesData.priceCalendarSearchRoutes.air
                : routes.priceCalendar.air
            }
          >
            <Svg
              svgClass="transports-link__icon"
              svgName="plane"
              svgWidth="25"
              svgHeight="25"
            />
            <header className="transports-link__header">
              <span className="transports-link__title">
                {Transport.air.name}
              </span>
              <span className="transports-link__price">
                {betterPriceToString(priceCalendarData.air.betterPrice)}
              </span>
            </header>
          </Link>
          <Link
            className={`transports-link ${
              priceCalendarLocation.train ? "transports-link--active" : ""
            }`}
            to={routes.priceCalendar.train}
          >
            <Svg
              svgClass="transports-link__icon"
              svgName="train"
              svgWidth="25"
              svgHeight="25"
            />
            <header className="transports-link__header">
              <span className="transports-link__title">
                {Transport.train.name}
              </span>
              <span className="transports-link__price">
                {betterPriceToString(priceCalendarData.train.betterPrice)}
              </span>
            </header>
          </Link>
          <Link
            className={`transports-link ${
              priceCalendarLocation.bus ? "transports-link--active" : ""
            }`}
            to={
              location.search
                ? routesData.priceCalendarSearchRoutes.bus
                : routes.priceCalendar.bus
            }
          >
            <Svg
              svgClass="transports-link__icon"
              svgName="bus"
              svgWidth="25"
              svgHeight="25"
            />
            <header className="transports-link__header">
              <span className="transports-link__title">
                {Transport.bus.name}
              </span>
              <span className="transports-link__price">
                {betterPriceToString(priceCalendarData.bus.betterPrice)}
              </span>
            </header>
          </Link>
        </nav>
      ) : (
        <nav className={`transports ticket-list__transports`}>
          <button
            name={"air"}
            style={{ border: "none" }}
            onClick={toSwitchTransport}
            className={`transports-link transports-link--plane ${
              searchTransportIs === "air" ? "transports-link--active" : ""
            }`}
          >
            <Svg
              svgClass="transports-link__icon"
              svgName="plane"
              svgWidth="25"
              svgHeight="25"
            />
            <header className="transports-link__header">
              <span className="transports-link__title">
                {Transport.air.name}
              </span>
              <span className="transports-link__price">{`${betterPriceToString(
                airMinPrice
              )}`}</span>
            </header>
          </button>
          <button
            name={"train"}
            style={{ border: "none" }}
            onClick={toSwitchTransport}
            className={`transports-link ${
              searchTransportIs === "train" ? "transports-link--active" : ""
            }`}
            to="#"
          >
            <Svg
              svgClass="transports-link__icon"
              svgName="train"
              svgWidth="25"
              svgHeight="25"
            />
            <header className="transports-link__header">
              <span className="transports-link__title">
                {Transport.train.name}
              </span>
              <span className="transports-link__price">
                {betterPriceToString(priceCalendarData.train.betterPrice)}
              </span>
            </header>
          </button>
          <button
            name={"bus"}
            style={{ border: "none" }}
            onClick={toSwitchTransport}
            className={`transports-link ${
              searchTransportIs === "bus" ? "transports-link--active" : ""
            }`}
          >
            <Svg
              svgClass="transports-link__icon"
              svgName="bus"
              svgWidth="25"
              svgHeight="25"
            />
            <header className="transports-link__header">
              <span className="transports-link__title">
                {Transport.bus.name}
              </span>
              <span className="transports-link__price">{`${betterPriceToString(
                busMinPrice
              )}`}</span>
            </header>
          </button>
        </nav>
      )}
    </>
  )
}

export default TransportSwitcher
