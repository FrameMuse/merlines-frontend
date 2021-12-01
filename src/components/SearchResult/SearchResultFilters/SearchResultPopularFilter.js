import SearchResultPopularFilterItem from './SearchResultPopularFilterItem';

function SearchResultPopularFilter() {
  const popularFilters = [
    { description: "Самый дешёвый", price: "от 20 000 ₽", checked: true },
    { description: "Самый быстрый", price: "от 113 820 ₽" },
    { description: "Оптимальный", price: "от 73 500 ₽" },
  ];

  return (
    <fieldset className="filters__container">
      <h2 className="visually-hidden">Отсортировать</h2>
      <div className="filters__sort">
        {popularFilters.map((filter, index) =>
          <SearchResultPopularFilterItem key={index} description={filter.description}
            price={filter.price} checked={filter.checked} />)}
      </div>
    </fieldset>
  )
};

export default SearchResultPopularFilter;
