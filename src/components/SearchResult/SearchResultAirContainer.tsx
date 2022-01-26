import { getTicketsAir, getTicketsAirFilters } from "api/actions/tickets"
import Ticket from "components/Ticket/Ticket"
import { FiltersType, TicketType } from "interfaces/Search"
import { useContext, useEffect, useState } from "react"
import { useSuspenseQuery } from "react-fetching-library"

import { searchSessionContext } from "./SearchResult"
import SearchFilters from "./SearchResultFilters/SearchFilters"
import SearchPriceFilter from "./SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "./SearchResultSubscribePrice/SearchResultSubscribePrice"
import SearchResultWeekPrice from "./SearchResultWeekPrice/SearchResultWeekPrice"
import useTicketsQuery from "./useTicketsQuery"


export default function SearchResultAirContainer() {
  const [results, setResults] = useState<TicketType[]>([])

  const [page, setPage] = useState(1)
  const [page_size] = useState(5)
  const [filters, setFilters] = useState<Partial<FiltersType>>({})

  const { session } = useContext(searchSessionContext)
  const { error, payload } = useTicketsQuery(getTicketsAir(session, page, page_size, filters))

  if (error || !payload) {
    throw new Error()
  }

  useEffect(() => {
    if (payload.in_progress) {
      setResults(payload.results)
    } else {
      setResults(oldPayload => [...oldPayload, ...payload.results])
    }
  }, [payload])

  return (
    <section className="ticket-list">
      <div className="ticket-list__container">
        <SearchResultWeekPrice />
        <SearchResultAirFiltersContainer />
        <div className="ticket-list__content">
          {results.map(ticket => (
            <Ticket
              id={ticket.id}
              logos={[...new Set(ticket.trips.flatMap(trip => trip.segments.map(seg => getAirlineLogo(seg.marketing_airline.code))))]}
              price={ticket.best_offer.price}
              baggagePrice={ticket.price_with_baggage}
              timelines={ticket.trips.map(trip => ({
                departureTime: new Date(trip.start_time),
                arrivalTime: new Date(trip.end_time),
                departurePoint: trip.segments[0].departure.city.title + ", " + trip.segments[0].departure.title,
                arrivalPoint: trip.segments.slice(-1)[0].arrival.city.title + ", " + trip.segments.slice(-1)[0].arrival.title,
                entries: trip.segments.flatMap((seg, index) => {
                  const startTime = new Date(trip.start_time).getTime()
                  const endTime = new Date(trip.end_time).getTime()
                  const duration = endTime - startTime

                  const arrivalTime = new Date(seg.arrival_time).getTime()
                  const departureTime = new Date(seg.departure_time).getTime()
                  const N = arrivalTime - departureTime

                  const percentage = N / duration * 100


                  const nextSeg = trip.segments[index + 1]

                  if (trip.segments.length === index || !nextSeg) {
                    return { type: "travel", percentage }
                  }

                  const nextArrivalTime = new Date(nextSeg.arrival_time).getTime()
                  const nextDepartureTime = new Date(nextSeg.departure_time).getTime()
                  const nextN = nextDepartureTime - arrivalTime
                  const nextPercentage = nextN / duration * 100

                  return [
                    { type: "travel", percentage },
                    { type: "transfer", percentage: nextPercentage }
                  ]
                })
              }))}
              bestOffer={{
                ...ticket.best_offer,
                image: getAgentLogo(ticket.best_offer.gate_id)
              }}
              groups={ticket.trips.flatMap((trip, index) => {
                const startTime = new Date(trip.start_time).getTime()
                const endTime = new Date(trip.end_time).getTime()
                const duration = new Date(endTime - startTime)

                let type = ""
                if (ticket.trips.length > 2) {
                  type = "flight"
                } else {
                  type = index === 0 ? "departure" : "return"
                }

                return trip.segments.map((seg, segIndex) => ({
                  duration,
                  index,
                  id: seg.id,
                  type: segIndex === 0 ? type : "transfer",
                  baggageWeight: seg.baggage_weight,
                  handbagsWeight: seg.handbags_weight,
                  trace: {
                    flight: seg.flight,
                    logo: getAirlineLogo(seg.marketing_airline.code),
                    arrival: {
                      title: seg.arrival.city.title + ", " + seg.arrival.title,
                      code: seg.arrival.code,
                      time: new Date(seg.arrival_time)
                    },
                    departure: {
                      title: seg.departure.city.title + ", " + seg.departure.title,
                      code: seg.departure.code,
                      time: new Date(seg.departure_time)
                    }
                  }
                }))
              })}
              key={ticket.id} />
          ))}
          {(page * page_size) <= payload.count && (
            <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>More</button>
          )}
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


function getAgentLogo(code: string | number) {
  return `https://pics.avs.io/gates/200/50/${code}.png`
}

function getAirlineLogo(code: string | number) {
  return `https://pics.avs.io/al_square/36/36/${code}.png`
}
