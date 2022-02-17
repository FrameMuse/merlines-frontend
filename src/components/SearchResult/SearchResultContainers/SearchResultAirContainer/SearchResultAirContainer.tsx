import { getTicketsAir } from "api/actions/tickets"
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
  const { payload } = useTicketsSuspenseQuery(getTicketsAir(session, page, page_size, filters))

  useEffect(() => setResults(payload.results), [payload])

  return (
    <SearchResultTickets>
      <SearchResultWeekPrice />
      <SearchResultAirFiltersContainer onChange={setFilters} />
      <div className={classWithModifiers("ticket-list__content", false && "loading")}>
        {results.filter(someEqual("id")).map(ticket => (
          <SearchResultAirTicket {...ticket} key={ticket.id} />
        ))}
        {(page * page_size) <= (payload?.count ?? payload.count) && (
          <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>Загрузить ещё {page_size} билетов</button>
        )}
      </div>
    </SearchResultTickets>
  )
}
