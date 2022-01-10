import "./price-week.scss"

import SearchResultWeekPriceList from "./SearchResultWeekPriceList"


function SearchResultWeekPrice() {
  return (
    <div className="price-week">
      <div className="price-week__container">
        <div className="price-week__header">
          <h2 className="price-week__title">Цены на неделю</h2>
          <span className="price-week__info">самолёты</span>
        </div>
        <SearchResultWeekPriceList />
      </div>
    </div>
  )
}

export default SearchResultWeekPrice
