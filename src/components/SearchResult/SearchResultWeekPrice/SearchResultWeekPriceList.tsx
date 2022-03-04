import { useContext } from "react"

import { searchWeekPricesContext } from "../SearchResult"
import SearchResultWeekPriceCard from "./SearchResultWeekPriceCard"

function SearchResultWeekPriceList() {
  const searchWeekPrices = useContext(searchWeekPricesContext)
  return (
    <div className="price-week__list">
      {searchWeekPrices.map((day, index) => day && (
        <SearchResultWeekPriceCard {...day} active={index === 0} key={index} />
      ))}
    </div>
  )
}

export default SearchResultWeekPriceList
