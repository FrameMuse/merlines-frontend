import { getTicketsAirFilters } from "api/actions/tickets"
import SearchPriceFilter from "components/SearchResult/SearchResultFilters/SearchPriceFilter"
import { AirFiltersType } from "interfaces/Search"
import React, { useContext } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import {numberToLetter, pluralize} from "utils"

import { searchSessionContext, searchWeekPricesContext } from "../../SearchResult"
import SearchFilter from "../../SearchResultFilters/SearchFilter"
import SearchFilters, { SearchFiltersBaseProps } from "../../SearchResultFilters/SearchFilters"
import SearchFilterCheckbox from "../../SearchResultFilters/UX/SearchFilterCheckbox"
import SearchFilterCheckboxes from "../../SearchResultFilters/UX/SearchFilterCheckboxes"
import SearchFilterTimeRange from "../../SearchResultFilters/UX/SearchFilterTimeRange"
import SearchResultSubscribePrice from "../../SearchResultSubscribePrice/SearchResultSubscribePrice"
import { flightPredicate } from "./helpers"


interface SearchResultAirFiltersProps extends SearchFiltersBaseProps<AirFiltersType> {
  isTracked?:boolean
}

export function SearchResultAirFiltersContainer(props: SearchResultAirFiltersProps) {
  const { session } = useContext(searchSessionContext)
  const weekPrices = useContext(searchWeekPricesContext)

  const { error, payload } = useSuspenseQuery(getTicketsAirFilters(session))
  if (error || !payload) return <>No filters</>
  return (
    <div className="ticket-list__left">
      <SearchResultSubscribePrice isTracked={props.isTracked} />
      <div className="filters">
        <SearchPriceFilter prices={[weekPrices?.[0]?.price, 0, 0]} />
        <SearchFilters onChange={props.onChange}>
          <SearchFilter label="Пересадки">
            <SearchFilterCheckboxes name="transfers">
              {payload.transfers.map(transfer => (
                <SearchFilterCheckbox name={transfer.toString()}>{transfer > 0 ? transfer >= 3 ? "3 и более пересадок" : pluralize(transfer, ["1 пересадка", "2 пересадки"]) : "Без пересадки"}</SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label="Время отправления и прибытия">
            {payload.trip_cities.map((trip, index) => (
              <>
                <h4>Отправление из {trip.origin.title}</h4>
                <SearchFilterTimeRange deltaTime min={0} max={86400} name="start_time" index={index} />
                <h4>Прибытие в {trip.destination.title}</h4>
                <SearchFilterTimeRange deltaTime min={0} max={86400} name="end_time" index={index} />
              </>
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Время в пути">
            {payload.travel_times.map((time, index) => (
              <SearchFilterTimeRange name="travel_time" index={index} {...time} />
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Время пересадки">
            {payload.transfer_times.map((time, index) => (
              <SearchFilterTimeRange name="transfer_time" index={index} {...time} />
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Багаж">
            <SearchFilterCheckboxes name="baggage">
              <SearchFilterCheckbox name="baggage">С багажом <span
                className="weak">(от {payload.baggage_min_price?.toPrice("ru", "rub")})</span></SearchFilterCheckbox>
              <SearchFilterCheckbox name="handbags">Без багажа <span
                className="weak">(от 130 000  ₽)</span></SearchFilterCheckbox>
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label="Авиакомпании" extraLabel={payload.airlines.length}>
            <SearchFilterCheckboxes resetBtn={true} name="airlines">
              {payload.airlines.map(airline => (
                <SearchFilterCheckbox name={airline.id.toString()} key={airline.id}>{airline.title}</SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label="Аэропорты">
            {payload.airports.map(airport =>(
              <>
                {airport.origins.map(({title, id}) => (
                  <React.Fragment key={id}>
                    <h5>Отправление из {title}</h5>
                    <SearchFilterCheckboxes name={`origin_airports[${1}]`}>
                      <SearchFilterCheckbox name={id.toString()}>
                        {title}
                      </SearchFilterCheckbox>
                    </SearchFilterCheckboxes>
                  </React.Fragment>
                ))}
                {airport.destinations.map(({title, id}) => (
                  <React.Fragment key={id}>
                    <h5>Прибытие в {title}</h5>
                    <SearchFilterCheckboxes name={`origin_airports[${2}]`}>
                      <SearchFilterCheckbox name={id.toString()}>
                        {title}
                      </SearchFilterCheckbox>
                    </SearchFilterCheckboxes>
                  </React.Fragment>
                ))}
              </>
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label="Аэропорты пересадок">
            {payload.transfer_cities.map((cities, index) => cities.length > 0 && (
              <>
                <h3 className={"search-filter__transfer-title"}>
                  {numberToLetter(index + 1)} пересадка
                </h3>
                <span className={"search-filter__transfer-country"}>
                  {cities[0].country.title}
                </span>
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
