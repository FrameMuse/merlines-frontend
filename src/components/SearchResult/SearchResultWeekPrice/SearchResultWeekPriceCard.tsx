import { classWithModifiers } from "utils"


interface SearchResultWeekPriceCardProps {
  date: string
  price: number
}

function SearchResultWeekPriceCard(props: SearchResultWeekPriceCardProps) {
  return (
    <div className={classWithModifiers("price-week__item", props.date === "20 Января, Пн" && "active")}>
      <div className="price-week__price">{props.price}</div>
      <div className="price-week__date">{props.date}</div>
    </div>
  )
}

export default SearchResultWeekPriceCard
