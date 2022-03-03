import { getCalendarAirWeek } from "api/actions/calendar"
import { useParametricSearchData } from "components/SearchForm/SearchForm.utils"
import { useQuery } from "react-fetching-library"

import SearchResultWeekPriceCard from "./SearchResultWeekPriceCard"

function SearchResultWeekPriceList() {
  const searchData = useParametricSearchData()
  if (!searchData.transport || !["plane", "bus", "train"].includes(searchData.transport)) {
    throw new Error("useParametricSearchDataError: wrong `transport`")
  }
  if (searchData.routes.length === 0) {
    throw new Error("useParametricSearchDataError: no `routes` param")
  }

  const route = searchData.routes[0]
  const [year, month, day] = route.date.split("-")

  const { error, loading, payload: weekDays } = useQuery(getCalendarAirWeek(route.origin, route.destination, year, month, day))
  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!weekDays) return <>no content</>

  return (
    <div className="price-week__list">
      {weekDays.map((day, index) => (
        <SearchResultWeekPriceCard {...day} key={index} />
      ))}
    </div>
  )
}

export default SearchResultWeekPriceList
