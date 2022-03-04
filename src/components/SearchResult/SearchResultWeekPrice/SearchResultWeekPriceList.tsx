import { stringifySearchData } from "components/SearchForm/SearchForm.utils"
import { useContext, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { searchWeekPricesContext } from "../SearchResult"
import SearchResultWeekPriceCard from "./SearchResultWeekPriceCard"

function SearchResultWeekPriceList() {
  const history = useHistory()
  const search = useSelector(state => state.search)

  const searchWeekPrices = useContext(searchWeekPricesContext)
  const [activePrice, setActivePrice] = useState(searchWeekPrices?.[0])
  function onDayPriceClick(dayPrice: typeof searchWeekPrices[0]) {
    if (!dayPrice) return
    setActivePrice(dayPrice)
    history.push({
      pathname: stringifySearchData({
        ...search,
        routes: [{
          ...search.routes[0],
          date: new Date(dayPrice.date)
        }]
      })
    })
  }
  return (
    <div className="price-week__list">
      {searchWeekPrices.map((dayPrice, index) => dayPrice && (
        <SearchResultWeekPriceCard {...dayPrice} active={index === 0} onClick={() => onDayPriceClick(dayPrice)} key={index} />
      ))}
    </div>
  )
}

export default SearchResultWeekPriceList
