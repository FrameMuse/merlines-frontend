import SearchFilters from "../SearchResult/SearchResultFilters/SearchFilters"
import SearchResultPopularFilterItem from "../SearchResult/SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "../SearchResult/SearchResultSubscribePrice/SearchResultSubscribePrice"

function MobileTicketFilter({ setIsOpenFilter }) {
  return (
    <section className="overlay ticket-list__overlay">
      <div className="overlay__container">
        <div className="overlay__btn-close ticket-list__close" onClick={() => setIsOpenFilter(false)}>закрыть</div>
        <div className="ticket-list__left">
          <SearchResultSubscribePrice />
          <div className="filters">
            <SearchResultPopularFilterItem />
            <SearchFilters />
            <input
              className="btn filters__submit"
              type="submit"
              value="Применить"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileTicketFilter
