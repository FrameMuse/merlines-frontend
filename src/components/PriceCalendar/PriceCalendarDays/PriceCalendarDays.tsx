import "./days.scss"

import { Dispatch } from "react"

import { weekDays } from "../../../constants"
import PriceCalendarDaysHeader from "./PriceCalendarDaysHeader"
import PriceCalendarDaysList from "./PriceCalendarDaysList"

interface PriceCalendarDaysProps {
  date: Date
  onDateChange: Dispatch<Date>
}

function PriceCalendarDays(props: PriceCalendarDaysProps) {
  return (
    <section className="price-calendar-days">
      <PriceCalendarDaysHeader {...props} />
      <div className="price-calendar-days__inner">
        <div className="price-calendar-days__week">
          {weekDays.map((day, index) => (
            <div key={index} className="price-calendar-days__week-item">{day}</div>
          ))}
        </div>
        <PriceCalendarDaysList />
      </div>
    </section>
  )
}

export default PriceCalendarDays
