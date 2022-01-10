import SearchFilters from "../SearchResultFilters/SearchFilters"
import SearchPriceFilter from "../SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "../SearchResultSubscribePrice/SearchResultSubscribePrice"
import SearchResultWeekPrice from "../SearchResultWeekPrice/SearchResultWeekPrice"

function SearchResultTicketList() {
  return (
    <>
      <div className="ticket-list__left">
        <SearchResultSubscribePrice />
        <div className="filters">
          <SearchPriceFilter />
          <SearchFilters />
        </div>
      </div>
      <div></div>
      <SearchResultWeekPrice />
      {/* <div className="ticket-list__content">
        <TransportSwitcher
          toSwitchTransport={toSwitchTransport}
          setSearchTransport={setSearchTransport}
          searchTransportIs={searchTransportIs}
        />
        {searchTransportIs === transport.air ? (
          searchResultPagination?.length !== 0 ? (
            <>
              {searchResultPagination ? (
                searchResultPagination.map((ticket) => (
                  <SearchResultTicket
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
                ))
              ) : (
                <PreloaderDots />
              )}
              {searchResultPagination &&
                dataToScroll?.length > searchResultPagination?.length && (
                <button
                  onClick={openMoreResult}
                  className="btn btn-secondary"
                >
                    Загрузить еще 10 билетов
                </button>
              )}
            </>
          ) : (
            <SearchResultTicketNotFound />
          )
        ) : searchTransportIs === transport.train ? (
          <SearchResultTrainTickets trainTicketsResult={trainTicketsResult} />
        ) : bussTicketsResult ? (
          <SearchResultBusTickets
            searchResultBusListPagination={searchResultBusListPagination}
            setSearchResultBusListPagination={setSearchResultBusListPagination}
            bussTicketsResult={bussTicketsResult}
          />
        ) : (
          <PreloaderDots />
        )}
      </div> */}
    </>
  )
}

export default SearchResultTicketList
