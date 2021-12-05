import SearchResultCustomFilter from "./SearchResultCustomFilter"
import SearchResultPopularFilter from "./SearchResultPopularFilter"

function SearchResultFilters({ checkboxes }) {
  return (
    <form className="filters">
      <SearchResultPopularFilter />
      <SearchResultCustomFilter checkboxes={checkboxes} />
    </form>
  )
}

export default SearchResultFilters
