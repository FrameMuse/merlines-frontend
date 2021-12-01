import React, { useEffect, useState } from "react"
import SearchResultBusTicket from "../SearchResultTrainTicket"

const SearchResultTrainTicketList = ({ tickets }) => {
  console.log(tickets)
  const [searchResultPagination, setSearchResultPagination] = useState([])

  const dataToScroll = tickets

  useEffect(() => {
    setSearchResultPagination(tickets?.slice(0, 10))
  }, [tickets])

  const openMoreResult = () => {
    const start = searchResultPagination?.length
    const end = start + 10
    setSearchResultPagination([
      ...searchResultPagination,
      ...dataToScroll.slice(start, end)
    ])
  }

  return (
    <>
      {searchResultPagination?.map((ticket) => (
        <SearchResultBusTicket
          key={ticket.hash}
          carriers={ticket.carriers}
          price={ticket.sellers[0].price}
          airports={ticket.voyages[0]}
          flight={ticket.voyages}
          maxDuration={ticket.duration}
          sellers={ticket.sellers}
          voyages={ticket.voyages}
          transfers={ticket.transfers && ticket.transfers}
        />
      ))}
      {searchResultPagination &&
        dataToScroll?.length > searchResultPagination?.length && (
          <button onClick={openMoreResult} className="btn btn-secondary">
            Загрузить еще 10 билетов
          </button>
        )}
    </>
  )
}

export default SearchResultTrainTicketList
