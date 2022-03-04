import { getTicketsAir } from "api/actions/tickets"
import TransportSwitcher from "components/SearchResult/TransportSwitcher"
import { AirFiltersType, AirTicketType } from "interfaces/Search"
import { useContext, useEffect, useState } from "react"
import { classWithModifiers, someEqual } from "utils"

import { searchSessionContext } from "../../SearchResult"
import { SearchResultTickets, useTicketsSuspenseQuery } from "../../SearchResultTickets"
import SearchResultWeekPrice from "../../SearchResultWeekPrice/SearchResultWeekPrice"
import { SearchResultAirFiltersContainer } from "./SearchResultAirFiltersContainer"
import SearchResultAirTicket from "./SearchResultAirTicket"


export default function SearchResultAirContainer() {
  const [results, setResults] = useState<AirTicketType[]>([])

  const [page, setPage] = useState(1)
  const [page_size] = useState(5)
  const [filters, setFilters] = useState<Partial<AirFiltersType>>({})

  const { session } = useContext(searchSessionContext)
  const { payload, loading } = useTicketsSuspenseQuery(getTicketsAir(session, page, page_size, filters))

  useEffect(() => setPage(1), [filters])
  useEffect(() => {
    if (!payload) return
    if (page > 1) {
      setResults(results => [...results, ...payload.results])
      return
    }
    setResults(payload.results)
  }, [payload])

  return (
    <SearchResultTickets loading={!payload && loading}>
      <SearchResultWeekPrice />
      <SearchResultAirFiltersContainer onChange={setFilters} />
      <div className={classWithModifiers("ticket-list__content", loading && "loading")}>
        <TransportSwitcher />
        {results.filter(someEqual("id")).map(ticket => (
          <SearchResultAirTicket {...ticket} key={ticket.id} />
        ))}
        {(page * page_size) <= (payload?.count ?? (payload?.count || 0)) && (
          <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>Загрузить ещё {page_size} билетов</button>
        )}
      </div>
    </SearchResultTickets>
  )
}
