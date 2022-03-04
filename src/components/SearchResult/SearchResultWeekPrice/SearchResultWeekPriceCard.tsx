import { humanizeDate } from "components/SearchForm/SearchForm.utils"
import { classWithModifiers } from "utils"


interface SearchResultWeekPriceCardProps {
  date: string
  price: number
}

function SearchResultWeekPriceCard(props: SearchResultWeekPriceCardProps) {
  const date = new Date(props.date)
  return (
    <div className={classWithModifiers("price-week__item", date.getDay() === new Date().getDay() && "active")}>
      <div className="price-week__price">{props.price.toPrice("ru", "rub")}</div>
      <div className="price-week__date">{humanizeDate(date)}</div>
    </div>
  )
}

export default SearchResultWeekPriceCard
