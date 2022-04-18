import { humanizeDate } from "components/SearchForm/SearchForm.utils"
import { classWithModifiers, getDefaultSelectedCurrency, getDefaultSelectedLanguage } from "utils"


interface SearchResultWeekPriceCardProps {
  date: string
  price: number

  active?: boolean
  onClick?(): void
}

function SearchResultWeekPriceCard(props: SearchResultWeekPriceCardProps) {
  const date = new Date(props.date)
  return (
    <button className={classWithModifiers("price-week__item", props.active && "active")} type="button" onClick={props.onClick}>
      <div className="price-week__price">от {props.price.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())}</div>
      <div className="price-week__date">{humanizeDate(date)}</div>
    </button>
  )
}

export default SearchResultWeekPriceCard
