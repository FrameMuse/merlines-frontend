import { getTicketsAir, getTicketsAirFilters } from "api/actions/tickets"
import ClientAPI, { APIResponseError } from "api/client"
import Ticket from "components/Ticket/Ticket"
import { PaginationType } from "interfaces/Django"
import { FiltersType, TicketType } from "interfaces/Search"
import { Dispatch, useContext, useEffect, useState } from "react"
import { useQuery, useSuspenseQuery } from "react-fetching-library"
import { classWithModifiers, pluralize } from "utils"

import { searchSessionContext } from "./SearchResult"
import SearchFilter from "./SearchResultFilters/SearchFilter"
import SearchFilters from "./SearchResultFilters/SearchFilters"
import SearchPriceFilter from "./SearchResultFilters/SearchPriceFilter"
import SearchFilterCheckbox from "./SearchResultFilters/UX/SearchFilterCheckbox"
import SearchFilterCheckboxes from "./SearchResultFilters/UX/SearchFilterCheckboxes"
import SearchFilterTimeRange from "./SearchResultFilters/UX/SearchFilterTimeRange"
import SearchResultSubscribePrice from "./SearchResultSubscribePrice/SearchResultSubscribePrice"
import SearchResultWeekPrice from "./SearchResultWeekPrice/SearchResultWeekPrice"
import useTicketsQuery from "./useTicketsQuery"


export default function SearchResultAirContainer() {
  const [results, setResults] = useState<TicketType[]>([])

  const [page, setPage] = useState(1)
  const [page_size] = useState(5)
  const [filters, setFilters] = useState<Partial<FiltersType>>({})

  const { session } = useContext(searchSessionContext)
  const { payload: suspensePayload } = useTicketsQuery(getTicketsAir(session, 1, page_size))
  const response = useQuery(getTicketsAir(session, page, page_size, filters), false)

  if (!suspensePayload) throw new Error()

  useEffect(() => setResults(suspensePayload.results), [suspensePayload])
  // useEffect(() => setResults(response.payload?.results || []), [filters])
  // useEffect(() => setResults(results => [...results, ...response.payload?.results || []]), [response.payload])
  useEffect(() => {
    response
      .query()
      .then(({ error, payload }) => {
        if (error || !payload) return
        setResults(results => [...results, ...payload.results])
      })
  }, [page])
  useEffect(() => {
    response
      .query()
      .then(({ error, payload }) => {
        if (error || !payload) return
        setResults(payload.results)
      })
  }, [filters])
  useEffect(() => {
    if (response.error) return

    let timeout: NodeJS.Timeout
    if (response.loading && !response.payload) response.query()
    if (response.payload?.in_progress) {
      timeout = setTimeout(() => response.query(), 1000)
    }
    return () => clearTimeout(timeout)
  }, [response.payload])
  return (
    <section className="ticket-list">
      <div className="ticket-list__container">
        <SearchResultWeekPrice />
        <SearchResultAirFiltersContainer onChange={setFilters} />
        <div className={classWithModifiers("ticket-list__content", response.loading && "loading")}>
          {results.filter(r => results.some(rs => rs.id === r.id)).map(ticket => (
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
          {(page * page_size) <= (response.payload?.count ?? suspensePayload.count) && (
            <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>Загрузить ещё {page_size} билетов</button>
          )}
        </div>
      </div>
    </section>
  )
}


function SearchResultAirFiltersContainer(props: { onChange: Dispatch<Partial<FiltersType>> }) {
  const { session } = useContext(searchSessionContext)
  const { error, payload } = useSuspenseQuery(getTicketsAirFilters(session))

  if (error || !payload) return <>No filters</>

  function flightPredicate(child: any, index: number, array: any[]) {
    if (!child) return null

    if (array.length >= 3) {
      return [<h3>{"Рейс"} {index + 1}</h3>, child]
    }

    return [<h3>{index === 0 ? "Туда" : "Обратно"}</h3>, child]
  }

  return (
    <div className="ticket-list__left">
      <SearchResultSubscribePrice />
      <div className="filters">
        <SearchPriceFilter />
        <SearchFilters onChange={props.onChange}>
          <SearchFilter label="Пересадки">
            <SearchFilterCheckboxes name="transfers">
              {/* <SearchFilterCheckbox name="0">Без пересадки</SearchFilterCheckbox> */}
              {payload.transfers.map(transfer => (
                <SearchFilterCheckbox name={transfer.toString()}>{transfer > 0 ? transfer >= 3 ? "3 и более пересадок" : pluralize(transfer, ["1 пересадка", "2 пересадки"]) : "Без пересадки"}</SearchFilterCheckbox>
              ))}
              {/* <SearchFilterCheckbox name="1">1 пересадка</SearchFilterCheckbox> */}
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label="Время отправления и прибытия">
            {/* <h3>{"Рейс"}</h3>
            <SearchFilterTimeRange name="transfer_time" index={index} {...time} /> */}
          </SearchFilter>
          <SearchFilter label="Время в пути">
            {payload.travel_times.map((time, index) => (
              <SearchFilterTimeRange name="transfer_time" index={index} {...time} />
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Время пересадки">
            {payload.travel_times.map((time, index) => (
              <SearchFilterTimeRange name="transfer_time" index={index} {...time} />
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Багаж">
            <SearchFilterCheckboxes name="luggage">
              <SearchFilterCheckbox name="baggage">Только багаж <span className="weak">(от {payload.baggage_min_price?.toPrice("ru", "rub")})</span></SearchFilterCheckbox>
              <SearchFilterCheckbox name="baggage-luggage">Багаж и ручная кладь <span className="weak">(от 130 000  ₽)</span></SearchFilterCheckbox>
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label="Авиакомпании" extraLabel={payload.airlines.length}>
            <SearchFilterCheckboxes name="airlines">
              {payload.airlines.map(airline => (
                <SearchFilterCheckbox name={airline.id.toString()} key={airline.id}>{airline.title}</SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label="Аэропорты">
            {payload.airports.map(airport => (
              <>
                <>
                  <h5>Отправление из 1</h5>
                  <SearchFilterCheckboxes name={`origin_airports[${1}]`}>
                    {airport.origins.map(origin => (
                      <SearchFilterCheckbox name={origin.id.toString()} key={origin.id}>{origin.title}</SearchFilterCheckbox>
                    ))}
                  </SearchFilterCheckboxes>
                </>
                <>
                  <h5>Прибытие в 2</h5>
                  <SearchFilterCheckboxes name={`origin_airports[${2}]`}>
                    {airport.destinations.map(destination => (
                      <SearchFilterCheckbox name={destination.id.toString()} key={destination.id}>{destination.title}</SearchFilterCheckbox>
                    ))}
                  </SearchFilterCheckboxes>
                </>
              </>
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Аэропорты пересадок">
            {payload.transfer_cities.map((cities, index) => cities.length > 0 && (
              <>
                <h3>{index + 1} пересадка</h3>
                <SearchFilterCheckboxes name={`transfer_airports[${index}]`}>
                  {cities.map(city => (
                    <SearchFilterCheckbox name={city.id.toString()} key={city.id}>{city.title}</SearchFilterCheckbox>
                  ))}
                </SearchFilterCheckboxes>
              </>
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Агентства" extraLabel={payload.offers.length}>
            <SearchFilterCheckboxes name="offers">
              {payload.offers.map(offer => (
                <SearchFilterCheckbox name={offer.gate_id.toString()} key={offer.gate_id}>{offer.title} <span className="weak">(от {offer.price.toPrice("ru", "rub")})</span></SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
        </SearchFilters>
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
