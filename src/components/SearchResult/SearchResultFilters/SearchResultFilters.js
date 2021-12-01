import SearchResultPopularFilter from './SearchResultPopularFilter';
import SearchResultCustomFilter from './SearchResultCustomFilter';

function SearchResultFilters({
  checkboxes,
}) {
  return (
    <form className="filters">
      <SearchResultPopularFilter />
      <SearchResultCustomFilter checkboxes={checkboxes} />
    </form>
  )
};

export default SearchResultFilters;
