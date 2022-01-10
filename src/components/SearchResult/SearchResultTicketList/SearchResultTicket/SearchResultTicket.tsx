import { useEffect, useState } from "react"
import { classWithModifiers } from "utils"

import SearchResultTicketFooter from "./SearchResultTicketFooter/SearchResultTicketFooter"
import SearchResultTicketHeader from "./SearchResultTicketHeader"
import SearchResultTicketInner from "./SearchResultTicketInner"



interface SearchResultTicketProps {
  carriers: any[]
  flight: any
  maxDuration: any
  sellers: any[]
  voyages: any[]
  transfers: any[]
}

function SearchResultTicket(props: SearchResultTicketProps) {

  const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false)
  const [flightDuration, setFlightDuration] = useState(0)

  useEffect(() => {
    setFlightDuration(props.maxDuration)
    // eslint-disable-next-line
  }, [props.flight])

  return (
    <div className={classWithModifiers("ticket", isOpenMoreInfo && "opened")}>
      <div className="ticket__container">
        <SearchResultTicketHeader carriers={props.carriers} />
        <SearchResultTicketInner {...props} />
      </div>

      <SearchResultTicketFooter
        {...props}
        flightDuration={flightDuration}
        isOpenMoreInfo={isOpenMoreInfo}
        setIsOpenMoreInfo={setIsOpenMoreInfo}
      />
    </div>
  )
}

export default SearchResultTicket
