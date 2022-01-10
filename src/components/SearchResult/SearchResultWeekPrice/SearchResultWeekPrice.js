import "./price-week.scss"

import React from "react"

import SearchResultWeekPriceHeader from "./SearchResultWeekPriceHeader"
import SearchResultWeekPriceList from "./SearchResultWeekPriceList"

function SearchResultWeekPrice() {
  return (
    <div className="price-week">
      <div className="price-week__container">
        <SearchResultWeekPriceHeader />
        <SearchResultWeekPriceList />
      </div>
    </div>
  )
}

export default SearchResultWeekPrice
