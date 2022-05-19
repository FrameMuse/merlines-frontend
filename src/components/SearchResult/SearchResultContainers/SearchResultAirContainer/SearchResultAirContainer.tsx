import { getTicketsAir } from "api/actions/tickets"
import { Action } from "api/client"
import TransportSwitcher from "components/SearchResult/TransportSwitcher"
import { AirFiltersType, AirTicketType } from "interfaces/Search"
import { useContext, useEffect, useState } from "react"
import { QueryResponse, useClient, useQuery } from "react-fetching-library"
import { classWithModifiers, someEqual } from "utils"

import { searchSessionContext, searchWeekPricesContext } from "../../SearchResult"
import { SearchResultTickets, useProgressiveSuspenseQuery } from "../../SearchResultTickets"
import SearchResultWeekPrice from "../../SearchResultWeekPrice/SearchResultWeekPrice"
import { SearchResultAirFiltersContainer } from "./SearchResultAirFiltersContainer"
import SearchResultAirTicket from "./SearchResultAirTicket"

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 5

function SearchResultAirContainer() {
  const { session } = useContext(searchSessionContext)
  const { payload, passiveLoading } = useProgressiveSuspenseQuery(getTicketsAir(session, DEFAULT_PAGE, DEFAULT_PAGE_SIZE))
  if (payload == null) {
    throw new Error("no payload")
  }
  if (payload.results.length === 0) {
    throw new Error("no results")
  }
  const [filters, setFilters] = useState<Partial<AirFiltersType>>({})
  return (
    <SearchResultTickets>
      <SearchResultWeekPrice />
      <SearchResultAirFiltersContainer onChange={setFilters} />
      <SearchResultAirTicketsContainer filters={filters} loading={passiveLoading} defaultPayload={payload} />
    </SearchResultTickets>
  )
}


interface SearchResultAirTicketsContainerProps {
  filters: Partial<AirFiltersType>
  loading: boolean

  defaultPayload: ReturnType<typeof getTicketsAir> extends Action<infer T> ? T : never
}

function SearchResultAirTicketsContainer(props: SearchResultAirTicketsContainerProps) {
  const { session } = useContext(searchSessionContext)
  const weekPrices = useContext(searchWeekPricesContext)

  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const { error, loading, payload } = useQuery(getTicketsAir(session, page, pageSize, props.filters))
  if (error) {
    throw new Error("useQuery")
  }

  const [results, setResults] = useState<AirTicketType[]>(props.defaultPayload.results)

  useEffect(() => setPage(1), [props.filters])
  useEffect(() => setResults(props.defaultPayload.results), [session])
  useEffect(() => {
    if (payload == null) return
    if (page === 1) {
      return setResults(payload.results)
    }
    setResults(results => [...results, ...payload.results])
  }, [payload])

  return (
    <div className={classWithModifiers("ticket-list__content", (props.loading || loading) && "loading")}>
      <TransportSwitcher prices={[weekPrices?.[0]?.price]} />
      {results.filter(someEqual("id")).map(ticket => (
        <SearchResultAirTicket {...ticket} key={ticket.id} />
      ))}
      {(page * pageSize) < (payload?.count || props.defaultPayload.count) && (
        <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>Загрузить ещё {pageSize} билетов</button>
      )}
    </div>
  )
}

export default SearchResultAirContainer