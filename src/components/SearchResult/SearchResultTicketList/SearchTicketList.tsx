import Ticket from "components/Ticket/Ticket"

import SearchFilters from "../SearchResultFilters/SearchFilters"
import SearchPriceFilter from "../SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "../SearchResultSubscribePrice/SearchResultSubscribePrice"
import SearchResultWeekPrice from "../SearchResultWeekPrice/SearchResultWeekPrice"

function SearchResultTicketList() {
  return (
    <>
      <SearchResultWeekPrice />
      <div className="ticket-list__left">
        <SearchResultSubscribePrice />
        <div className="filters">
          <SearchPriceFilter />
          <SearchFilters />
        </div>
      </div>
      <div className="ticket-list__content">
        <Ticket />
      </div>
    </>
  )
}

export default SearchResultTicketList
