import "./price-week.scss"

import useLocalization from "../../../plugins/localization/hook"
import SearchResultWeekPriceList from "./SearchResultWeekPriceList"


function SearchResultWeekPrice() {
  const ll = useLocalization(ll => ll)

  return (
    <div className="price-week">
      <div className="price-week__container">
        <div className="price-week__header">
          <h2 className="price-week__title">{ll.searchResult.weekPrice}</h2>
          <span className="price-week__info">{ll.priceCalendar.airplanes.toLowerCase()}</span>
        </div>
        <SearchResultWeekPriceList />
      </div>
    </div>
  )
}

export default SearchResultWeekPrice
