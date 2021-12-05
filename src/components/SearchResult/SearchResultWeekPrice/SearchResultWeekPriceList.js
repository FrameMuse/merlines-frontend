import { makeWeek } from "../../../mocks/generateMock"
import SearchResultWeekPriceCard from "./SearchResultWeekPriceCard"

function SearchResultWeekPriceList() {
  const week = makeWeek()

  return (
    <ul className="price-week__list">
      {week.map((day, index) => (
        <SearchResultWeekPriceCard
          key={index}
          price={day.price}
          date={day.date}
        />
      ))}
    </ul>
  )
}

export default SearchResultWeekPriceList
