import { searchWeekPricesContext } from "components/SearchResult/SearchResult"
import { SearchResultTickets } from "components/SearchResult/SearchResultTickets"
import SearchResultWeekPrice from "components/SearchResult/SearchResultWeekPrice/SearchResultWeekPrice"
import TransportSwitcher from "components/SearchResult/TransportSwitcher"
import _ from "lodash"
import { useContext } from "react"

import SearchResultBusFiltersContainer from "./SearchResultBusFiltersContainer"

function SearchResultBusContainer() {
  const weekPrices = useContext(searchWeekPricesContext)
  return (
    <SearchResultTickets>
      <SearchResultWeekPrice />
      <SearchResultBusFiltersContainer onChange={_.noop} />
      <div className="ticket-list__content">
        <TransportSwitcher prices={[weekPrices?.[0]?.price]} />

        <div className="ticket-list__error">
          <h2 className="ticket-list__title">Поиск билетов на автобусы ещё в разработке</h2>
          <p className="ticket-list__error-head">Мы работает над этим</p>
        </div>
      </div>
      {/* <SearchResultAirTicketsContainer loading={response.loading} payload={response.payload} page={page} setPage={setPage} /> */}
    </SearchResultTickets>
  )
}

export default SearchResultBusContainer