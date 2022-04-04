import Icon from "components/common/Icon"
import { Dispatch } from "react"
import { Link } from "react-router-dom"
import { classWithModifiers, dateToMonthName } from "utils"

import PriceCalendarDaysFilter from "./PriceCalendarDaysFilter"

interface PriceCalendarDaysHeaderProps {
  date: Date
  onDateChange: Dispatch<Date>
}

function PriceCalendarDaysHeader(props: PriceCalendarDaysHeaderProps) {
  const monthName = dateToMonthName(props.date)
  return (
    <div className="price-calendar-days__header">
      <Link to={""}>
        <Icon className="price-calendar-days__arrow" name="arrow-slider" />
      </Link>
      <div className="price-calendar-days__center">
        <Icon className={classWithModifiers("price-calendar-days__arrow-center", "left")} name="arrow-open" />
        <span>{monthName}</span>
        <Icon className={classWithModifiers("price-calendar-days__arrow-center", "right")} name="arrow-open" />
      </div>
      <PriceCalendarDaysFilter />
    </div>
  )
}

export default PriceCalendarDaysHeader
