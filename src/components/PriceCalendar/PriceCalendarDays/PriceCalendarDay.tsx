import { Link } from "react-router-dom"
import { classWithModifiers } from "utils"

interface PriceCalendarDaysListItemProps {
  date: Date
  price: number | null
  active?: boolean
  isBestPrice?: boolean
}

function PriceCalendarDay(props: PriceCalendarDaysListItemProps) {
  const modifiers: string[] = []
  if (props.price == null) modifiers.push("disabled")
  if (props.active) modifiers.push("active")
  if (props.isBestPrice) modifiers.push("best")
  return (
    <Link className={classWithModifiers("price-calendar-days__card", ...modifiers)} to="#">
      <span className="price-calendar-days__card-day">{props.date.getDate()}</span>
      <span className="price-calendar-days__card-price">
        {props.price ? ("от " + props.price?.toPrice()) : "..."}
      </span>
    </Link>
  )
}

export default PriceCalendarDay
