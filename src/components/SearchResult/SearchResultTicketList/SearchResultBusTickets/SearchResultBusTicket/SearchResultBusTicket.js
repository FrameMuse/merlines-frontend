import React, { useState, useEffect } from "react"
import { formatDuration } from "../../../utils"
import SearchResultTicketBusHeader from "./SearchResultBusTicketHeader"
import SearchResultBusTicketInner from "./SearchResultBusTicketInner"
import SearchResultBusTicketFooter from "./SearchResultBusTicketFooter"

function SearchResultBusTicket(props) {
  const {
    carrier,
    flight,
    maxDuration,
    sellers,
    price,
    url,
    arrivalDateTime,
    arrivalPointName,
    departureDatetime,
    departurePointName,
    voyages,
    transfers
  } = props

  const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false)
  const [flightDuration, setFlightDuration] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const duration = (arr) => {
      let durationTime = 0
      arr.forEach((item) => (durationTime += item.duration))
      return durationTime
    }

    setFlightDuration(formatDuration(maxDuration))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flight])

  // const carrierLogoOne = (carriers.length > 1) ? false : true;
  // const carrierLogoSize = (carrierLogoOne) ? 132 : 48;
  // const carrierLogoWidth = carrierLogoSize / 2;
  //const carrierLogoHeight = 24;

  // const sellersSorted = (sellers.length > 1) ? [...sellers].sort((a, b) => a.price - b.price) : [...sellers]

  return (
    <div className={`ticket${isOpenMoreInfo ? " ticket--opened" : ""}`}>
      <div className="ticket__container">
        <SearchResultTicketBusHeader carrier={carrier} />
        <SearchResultBusTicketInner
          flight={flight}
          voyages={voyages}
          maxDuration={maxDuration}
          arrivalDateTime={arrivalDateTime}
          arrivalPointName={arrivalPointName}
          departureDatetime={departureDatetime}
          departurePointName={departurePointName}
        />
      </div>
      <SearchResultBusTicketFooter
        price={price}
        url={url}
        voyages={voyages}
        sellers={sellers}
        carrier={carrier}
        maxDuration={maxDuration}
        arrivalDateTime={arrivalDateTime}
        arrivalPointName={arrivalPointName}
        departureDatetime={departureDatetime}
        departurePointName={departurePointName}
        transfers={transfers}
        flightDuration={flightDuration}
        isOpenMoreInfo={isOpenMoreInfo}
        setIsOpenMoreInfo={setIsOpenMoreInfo}
      />
    </div>
  )
}

export default SearchResultBusTicket
