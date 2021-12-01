function SearchResultPopularFilterItem({ description, price, checked }) {
  return (
    <button
      className={`filters__sort-btn ${
        checked ? "filters__sort-btn--active" : ""
      }`}
      type="button"
    >
      <span className="filters__sort-text">{description}</span>
      <span className="filters__sort-price">{price}</span>
    </button>
  )
}

export default SearchResultPopularFilterItem
