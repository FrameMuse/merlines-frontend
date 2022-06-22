import SearchFilter from "components/SearchResult/SearchResultFilters/SearchFilter"
import SearchFilters, { SearchFiltersBaseProps } from "components/SearchResult/SearchResultFilters/SearchFilters"
import SearchPriceFilter from "components/SearchResult/SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "components/SearchResult/SearchResultSubscribePrice/SearchResultSubscribePrice"
import _ from "lodash"
import useLocalization from "plugins/localization/hook"

enum BusFilterFields { }

interface SearchResultBusFiltersContainerProps extends SearchFiltersBaseProps<{ ordering?: "best_price" | "final_time" }> {
  isTracked?: boolean
}

function SearchResultBusFiltersContainer(props: SearchResultBusFiltersContainerProps) {
  const ll = useLocalization(ll => ll)
  return (
    <div className="ticket-list__left">
      <SearchResultSubscribePrice isTracked={props.isTracked} />
      <div className="filters">
        <SearchPriceFilter prices={[]} onChange={_.noop} />
        <SearchFilters onChange={_.noop}>
          <SearchFilter defaultHidden label={ll.searchResult.transfers.title}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.departureAndArrivalTimes}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.travelTime}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.transferTime}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.baggage}>В разработке</SearchFilter>

          <SearchFilter defaultHidden label={ll.searchResult.trains}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.carts}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.stations}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.transferStations}>В разработке</SearchFilter>
          <SearchFilter defaultHidden label={ll.searchResult.agencies}>В разработке</SearchFilter>
        </SearchFilters>
      </div>
    </div>
  )
}

export default SearchResultBusFiltersContainer