import { useSelector } from "react-redux"

import { selectFilter } from "../../reducers/filtersSlice"
import { selectSearchResult } from "../../reducers/searchResultSlice"
import SearchResultCustomFilter from "../SearchResult/SearchResultFilters/SearchResultCustomFilter"
import SearchResultPopularFilterItem from "../SearchResult/SearchResultFilters/SearchResultPopularFilter"
import SearchResultSubscribePrice from "../SearchResult/SearchResultSubscribePrice/SearchResultSubscribePrice"
import { returnInputs } from "../SearchResult/utils"

function MobileTicketFilter({ setIsOpenFilter }) {
  const { transfers } = useSelector(selectFilter)
  const { searchData: { tickets } } = useSelector(selectSearchResult)

  return (
    <section className="overlay ticket-list__overlay">
      <div className="overlay__container">
        <div
          onClick={() => setIsOpenFilter(false)}
          className="overlay__btn-close ticket-list__close"
        >
          закрыть
        </div>
        <aside className="ticket-list__left">
          <SearchResultSubscribePrice />
          <form className="filters">
            <SearchResultPopularFilterItem />
            <SearchResultCustomFilter
              checkboxes={returnInputs(tickets, transfers)}
            />
            <input
              className="btn filters__submit"
              type="submit"
              value="Применить"
            />
          </form>
        </aside>
      </div>
    </section>
  )
}

export default MobileTicketFilter
