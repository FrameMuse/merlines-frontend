import { getTicketsAir } from "api/actions/tickets"
import { Action, isValidResponse } from "api/client"
import SearchResultTicketError from "components/SearchResult/SearchResultError"
import SearchResultLoader from "components/SearchResult/SearchResultLoader"
import TransportSwitcher from "components/SearchResult/TransportSwitcher"
import { AirFiltersType } from "interfaces/Search"
import { Dispatch, useContext, useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { classWithModifiers, someEqual } from "utils"

import { searchSessionContext, searchWeekPricesContext } from "../../SearchResult"
import { SearchResultTickets } from "../../SearchResultTickets"
import SearchResultWeekPrice from "../../SearchResultWeekPrice/SearchResultWeekPrice"
import { SearchResultAirFiltersContainer } from "./SearchResultAirFiltersContainer"
import SearchResultAirTicket from "./SearchResultAirTicket"

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10
const PING_INTERVAL = 5 * 1000 // every 5 seconds

function SearchResultAirContainer() {
  const [page, setPage] = useState(DEFAULT_PAGE)


  const { session } = useContext(searchSessionContext)
  const [filters, setFilters] = useState<Partial<AirFiltersType>>({})

  const action = getTicketsAir(session, DEFAULT_PAGE, DEFAULT_PAGE_SIZE * page, filters)
  const response = useQuery(action)

  useEffect(() => {
    if (!isValidResponse(response)) return
    if (response.payload.in_progress === false) return

    const interval = setInterval(() => response.query(), PING_INTERVAL)
    return () => {
      clearInterval(interval)
    }
  }, [response.payload])



  if (response.payload == null && response.loading) {
    return <SearchResultLoader />
  }
  if (!isValidResponse(response)) {
    throw new Error("no payload")
  }

  if (response.payload.in_progress && response.payload.results.length === 0) {
    return <SearchResultLoader />
  }

  return (
    <SearchResultTickets>
      <SearchResultWeekPrice />
      <SearchResultAirFiltersContainer onChange={setFilters} />
      <SearchResultAirTicketsContainer loading={false} payload={response.payload} page={page} setPage={setPage} />
    </SearchResultTickets>
  )
}


interface SearchResultAirTicketsContainerProps {
  loading: boolean
  payload: ReturnType<typeof getTicketsAir> extends Action<infer T> ? T : never

  page: number
  setPage: Dispatch<number>
}

function SearchResultAirTicketsContainer(props: SearchResultAirTicketsContainerProps) {
  const weekPrices = useContext(searchWeekPricesContext)
  if (props.payload.results.length === 0) {
    return (
      <SearchResultTicketError />
    )
  }

  return (
    <div className={classWithModifiers("ticket-list__content", props.loading && "loading")}>
      <TransportSwitcher prices={[weekPrices?.[0]?.price]} />
      {props.payload.results.filter(someEqual("id")).map(ticket => (
        <SearchResultAirTicket {...ticket} key={ticket.id} />
      ))}
      {(props.page * DEFAULT_PAGE_SIZE) < (props.payload.count) && (
        <button className="ticket-list__more" type="button" onClick={() => props.setPage(props.page + 1)}>Загрузить ещё {DEFAULT_PAGE_SIZE} билетов</button>
      )}
    </div>
  )
}

export default SearchResultAirContainer