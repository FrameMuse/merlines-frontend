import useLocalization from "plugins/localization/hook"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { classWithModifiers, dateToMonthName } from "../../utils"

interface PriceCalendarMonthProps {
  date: Date
  price: number | null
  isBestPrice?: boolean
}

function PriceCalendarMonth(props: PriceCalendarMonthProps) {
  useLocalization()
  const transport = useSelector(state => state.search.transport)
  const monthName = dateToMonthName(props.date)
  return (
    <>
      <li className={classWithModifiers("price-calendar__item", props.isBestPrice && "best")}>
        <Link className="price-calendar__item-link" to={`/price-calendar/${transport}/days`}>
          <span className="price-calendar__month">{monthName}</span>
          <span className="price-calendar__price">
            {props.price ? ("от " + props.price.toPrice()) : "..."}
          </span>
          {props.isBestPrice && (
            <span className="price-calendar__text">лучшая цена</span>
          )}
        </Link>
      </li>
    </>
  )
}

export default PriceCalendarMonth
