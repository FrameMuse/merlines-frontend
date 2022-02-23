import { offsetDateDay } from "date.helpers"

import SearchResultWeekPriceCard from "./SearchResultWeekPriceCard"

function SearchResultWeekPriceList() {
  return (
    <div className="price-week__list">
      {[...Array(7)].map((_, index) => (
        <SearchResultWeekPriceCard date={offsetDateDay(new Date, index)} price={120000} key={index} />
      ))}
    </div>
  )
}

export default SearchResultWeekPriceList
