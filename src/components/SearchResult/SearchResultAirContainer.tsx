import { getTicketsAir, getTicketsAirFilters } from "api/actions/tickets"
import Ticket from "components/Ticket/Ticket"
import { FiltersType } from "interfaces/Search"
import { useContext, useState } from "react"
import { useSuspenseQuery } from "react-fetching-library"

import { searchSessionContext } from "./SearchResult"
import SearchFilters from "./SearchResultFilters/SearchFilters"
import SearchPriceFilter from "./SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "./SearchResultSubscribePrice/SearchResultSubscribePrice"
import SearchResultWeekPrice from "./SearchResultWeekPrice/SearchResultWeekPrice"
import useTicketsQuery from "./useTicketsQuery"


export default function SearchResultAirContainer() {
  const [page, setPage] = useState(1)
  const [page_size] = useState(5)
  const [filters, setFilters] = useState<Partial<FiltersType>>({})

  const { session } = useContext(searchSessionContext)
  const { error, payload } = useTicketsQuery(getTicketsAir(session, page, page_size, filters))

  if (error || !payload)
    throw new Error()

  return (
    <section className="ticket-list">
      <div className="ticket-list__container">
        <SearchResultWeekPrice />
        <SearchResultAirFiltersContainer />
        <div className="ticket-list__content">
          {payload.results.map(ticket => (
            <Ticket
              id={ticket.id}
              logo={getAirlineLogo(ticket.best_offer.gate_id)}
              price={ticket.best_offer.price}
              baggagePrice={ticket.price_with_baggage}
              timelines={ticket.trips[0].segments.map(seg => ({
                arrivalTime: new Date(seg.arrival_time),
                departureTime: new Date(seg.departure_time),
                arrivalPoint: seg.arrival.city.title,
                departurePoint: seg.departure.city.title,
                entries: []
              }))}
              bestOffer={{
                ...ticket.best_offer,
                image: getAirlineLogo(ticket.best_offer.gate_id)
              }}
              key={ticket.id} />
          ))}
        </div>
      </div>
    </section>
  )
}


function SearchResultAirFiltersContainer() {
  const { session } = useContext(searchSessionContext)
  const { error, payload } = useSuspenseQuery(getTicketsAirFilters(session))

  if (error || !payload)
    return <>No filters</>

  return (
    <div className="ticket-list__left">
      <SearchResultSubscribePrice />
      <div className="filters">
        <SearchPriceFilter />
        <SearchFilters />
      </div>
    </div>
  )
}


function getAirlineLogo(code: string | number) {
  return `https://pics.avs.io/gates/200/50/${code}.png`
}
