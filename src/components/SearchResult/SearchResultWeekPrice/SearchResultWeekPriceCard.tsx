import { humanizeDate } from "components/SearchForm/SearchForm.utils"
import { classWithModifiers } from "utils"

interface SearchResultWeekPriceCardProps {
  price: number
  date: Date
}

function SearchResultWeekPriceCard(props: SearchResultWeekPriceCardProps) {
  return (
    <div className={classWithModifiers("price-week__item", props.date.getTime() === Date.now() && "active")}>
      <div className="price-week__price">{props.price.toPrice("ru", "rub")}</div>
      <div className="price-week__date">{humanizeDate(props.date)}</div>
    </div>
  )
}

export default SearchResultWeekPriceCard
