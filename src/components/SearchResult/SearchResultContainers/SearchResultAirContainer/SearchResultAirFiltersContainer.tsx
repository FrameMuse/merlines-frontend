import { getTicketsAirFilters } from "api/actions/tickets"
import SearchPriceFilter from "components/SearchResult/SearchResultFilters/SearchPriceFilter"
import { AirFiltersType } from "interfaces/Search"
import useLocalization from "plugins/localization/hook"
import React, { useContext, useEffect, useState } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import { getDefaultSelectedCurrency, getDefaultSelectedLanguage, numberToLetter, pluralize } from "utils"

import { searchSessionContext, searchWeekPricesContext } from "../../SearchResult"
import SearchFilter from "../../SearchResultFilters/SearchFilter"
import SearchFilters, { SearchFiltersBaseProps } from "../../SearchResultFilters/SearchFilters"
import SearchFilterCheckbox from "../../SearchResultFilters/UX/SearchFilterCheckbox"
import SearchFilterCheckboxes from "../../SearchResultFilters/UX/SearchFilterCheckboxes"
import SearchFilterTimeRange from "../../SearchResultFilters/UX/SearchFilterTimeRange"
import SearchResultSubscribePrice from "../../SearchResultSubscribePrice/SearchResultSubscribePrice"
import { flightPredicate } from "./helpers"


interface SearchResultAirFiltersProps extends SearchFiltersBaseProps<AirFiltersType & { ordering?: "best_price" | "final_time" }> {
  isTracked?: boolean
}

export function SearchResultAirFiltersContainer(props: SearchResultAirFiltersProps) {
  const ll = useLocalization(ll => ll)

  const [filters, setFilters] = useState<Partial<AirFiltersType> & { ordering?: "best_price" | "final_time" }>({})
  const { session } = useContext(searchSessionContext)
  const weekPrices = useContext(searchWeekPricesContext)

  useEffect(() => props.onChange(filters), [filters])


  const { error, payload } = useSuspenseQuery(getTicketsAirFilters(session))
  if (error || !payload) return <>No filters</>
  return (
    <div className="ticket-list__left">
      <SearchResultSubscribePrice isTracked={props.isTracked} />
      <div className="filters">
        <SearchPriceFilter prices={[weekPrices?.[0]?.price, payload.best_price_of_faster]} onChange={value => props.onChange({ ...filters, ordering: value === "cheap" ? "best_price" : "final_time" })} />
        <SearchFilters onChange={setFilters}>
          <SearchFilter label={ll.searchResult.transfers.title}>
            <SearchFilterCheckboxes name="transfers">
              {payload.transfers.slice(0, 4).map(transfer => (
                <SearchFilterCheckbox name={transfer.toString()}>
                  {transfer > 0 ?
                    transfer >= 3 ? ll.searchResult.threeAndMoreTransfers :
                      pluralize(transfer, ll.searchResult.transfers.plural) :
                    ll.searchResult.withoutTransfers}
                </SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label={ll.searchResult.departureAndArrivalTimes}>
            {payload.trip_cities.map((trip, index) => (
              <>
                <h4>{ll.searchResult.departureFrom} {trip.origin.title}</h4>
                <SearchFilterTimeRange deltaTime min={0} max={86400} name="start_time" index={index} />
                <h4>{ll.searchResult.arrivalTo} {trip.destination.title}</h4>
                <SearchFilterTimeRange deltaTime min={0} max={86400} name="end_time" index={index} />
              </>
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label={ll.searchResult.travelTime}>
            {payload.travel_times.map((time, index) => (
              <SearchFilterTimeRange name="travel_time" index={index} {...time} />
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label={ll.searchResult.transferTime}>
            {payload.transfer_times.map((time, index) => (
              <SearchFilterTimeRange name="transfer_time" index={index} {...time} />
            )).map(flightPredicate)}
          </SearchFilter>
          <SearchFilter label={ll.searchResult.baggage}>
            <SearchFilterCheckboxes name="baggage">
              <SearchFilterCheckbox name="baggage">{ll.searchResult.withoutBaggage} <span
                className="weak">(от {payload.baggage_min_price?.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())})</span></SearchFilterCheckbox>
              <SearchFilterCheckbox name="handbags">{ll.searchResult.withBaggage} <span
                className="weak">(от 130 000  ₽)</span></SearchFilterCheckbox>
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label={ll.searchResult.airlines} extraLabel={payload.airlines.length}>
            <SearchFilterCheckboxes resetBtn={true} name="airlines">
              {payload.airlines.map(airline => (
                <SearchFilterCheckbox name={airline.id.toString()} key={airline.id}>{airline.title}</SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
          <SearchFilter label={ll.searchResult.airports}>
            {payload.airports.map(airport => (
              <>
                {airport.origins.map(({ title, id }) => (
                  <React.Fragment key={id}>
                    <h5>{ll.searchResult.departureFrom} {title}</h5>
                    <SearchFilterCheckboxes name={`origin_airports[${1}]`}>
                      <SearchFilterCheckbox name={id.toString()}>
                        {title}
                      </SearchFilterCheckbox>
                    </SearchFilterCheckboxes>
                  </React.Fragment>
                ))}
                {airport.destinations.map(({ title, id }) => (
                  <React.Fragment key={id}>
                    <h5>{ll.searchResult.arrivalTo} {title}</h5>
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
          <SearchFilter label={ll.searchResult.transferAirports}>
            {payload.transfer_cities.map((cities, index) => cities.length > 0 && (
              <>
                <h3 className={"search-filter__transfer-title"}>
                  {numberToLetter(index + 1)} {ll.searchResult.transfer}
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
          <SearchFilter label={ll.searchResult.agencies} extraLabel={payload.offers.length}>
            <SearchFilterCheckboxes name="offers">
              {payload.offers.map(offer => (
                <SearchFilterCheckbox name={offer.gate_id.toString()} key={offer.gate_id}>{offer.title} <span
                  className="weak">(от {offer.price.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())})</span></SearchFilterCheckbox>
              ))}
            </SearchFilterCheckboxes>
          </SearchFilter>
        </SearchFilters>
      </div>
    </div>
  )
}
