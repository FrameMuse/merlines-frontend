import React, { useState, useEffect } from "react"
import { formatDuration } from "../../../utils"
import SearchResultTrainTicketHeader from "./SearchResultTrainTicketHeader"
import SearchResultTrainTicketInner from "./SearchResultTrainTicketInner"
import SearchResultTrainTicketFooter from "./SearchResultTrainTicketFooter"

function SearchResultBusTicket(props) {
  const { carriers, flight, maxDuration, sellers, voyages, transfers } = props

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
    // eslint-disable-next-line
  }, [flight])

  // const carrierLogoOne = (carriers.length <= 1);
  // const carrierLogoSize = (carrierLogoOne) ? 132 : 48;
  // const carrierLogoWidth = carrierLogoSize / 2;
  // const carrierLogoHeight = 24;

  // const sellersSorted = (sellers.length > 1) ? [...sellers].sort((a, b) => a.price - b.price) : [...sellers]

  return (
    <div className={`ticket${isOpenMoreInfo ? " ticket--opened" : ""}`}>
      <div className="ticket__container">
        <SearchResultTrainTicketHeader carriers={carriers} />
        <SearchResultTrainTicketInner
          flight={flight}
          voyages={voyages}
          maxDuration={maxDuration}
        />
      </div>
      <SearchResultTrainTicketFooter
        voyages={voyages}
        sellers={sellers}
        transfers={transfers}
        flightDuration={flightDuration}
        isOpenMoreInfo={isOpenMoreInfo}
        setIsOpenMoreInfo={setIsOpenMoreInfo}
      />
    </div>
  )
}

export default SearchResultBusTicket
