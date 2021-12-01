import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectMainSearchParams } from "../../../reducers/mainSearchSlice"
import Svg from "../../common/Svg"
import api from "../../../api/api"
import "./filter.scss"

function PriceCalendarDaysFilter() {
  const [filterActive, setFilterActive] = useState(false)
  const mainSearchParams = useSelector(selectMainSearchParams)

  const openFilter = async () => {
    if (!filterActive) {
      try {
        const days = await api.getFilter({
          transport: "air",
          origin: mainSearchParams.route.api.from,
          destination: mainSearchParams.route.api.to
        })
        console.log(days.data.result)
      } catch (error) {
        console.error(error)
      }
      setFilterActive(!filterActive)
    } else {
      setFilterActive(!filterActive)
    }
  }

  return (
    <div className={`filter filter--${filterActive ? "opened" : "closed"}`}>
      <Svg
        handleClick={openFilter}
        svgClass="days__filter"
        svgName="filter"
        svgWidth="15"
        svgHeight="15"
      />
      <div className="filter__inner">
        <div className="filter__top">
          <h2 className="filter__title">Фильтры</h2>
          <button className="filter__clear">очистить все</button>
        </div>
        <ul className="filter__list">
          <li className="filter__item">
            <button className="filter__item-btn" type="button">
              Пересадки
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PriceCalendarDaysFilter
