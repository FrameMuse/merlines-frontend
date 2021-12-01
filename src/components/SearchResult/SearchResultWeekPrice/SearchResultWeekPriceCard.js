function SearchResultWeekPriceCard({ price, date }) {
  return (
    <li
      className={`price-week__item ${
        date === "20 Января, Пн" ? "price-week__item--active" : ""
      }`}
    >
      <div className="price-week__price">{price}</div>
      <div className="price-week__date">{date}</div>
    </li>
  )
}

export default SearchResultWeekPriceCard
