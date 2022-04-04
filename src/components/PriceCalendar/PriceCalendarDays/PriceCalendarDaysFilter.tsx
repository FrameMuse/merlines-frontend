import "./filter.scss"

import { useState } from "react"
import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

interface PriceCalendarDaysFilterProps {

}

function PriceCalendarDaysFilter(props: PriceCalendarDaysFilterProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="price-calendar-filter">
      <Icon className="price-calendar-days__filter" name="price-calendar-filter" onClick={() => setExpanded(!expanded)} />
      <div className={classWithModifiers("price-calendar-filter__inner", expanded && "expanded")}>
        <div className="price-calendar-filter__top">
          <h2 className="price-calendar-filter__title">Фильтры</h2>
          <button className="price-calendar-filter__clear" type="button">очистить все</button>
        </div>
        <div className="price-calendar-filter__list">
          <div className="price-calendar-filter__item">
            <button className="price-calendar-filter__item-btn" type="button">Пересадки</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceCalendarDaysFilter
