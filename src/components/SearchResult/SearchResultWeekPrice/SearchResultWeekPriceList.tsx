import { makeWeek } from "../../../mocks/generateMock"
import SearchResultWeekPriceCard from "./SearchResultWeekPriceCard"

function SearchResultWeekPriceList() {
  const week = makeWeek()

  return (
    <div className="price-week__list">
      {week.map((day, index) => (
        <SearchResultWeekPriceCard {...day} key={index} />
      ))}
    </div>
  )
}

export default SearchResultWeekPriceList
