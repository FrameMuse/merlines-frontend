import React from "react"

import SearchResultCustomFilterTransfer from "./SearchResultCustomFilterTransfer"
import SearchResultCustomFilterDeparture from "./SearchResultCustomFilterDeparture"
import SearchResultCustomFilterDuration from "./SearchResultCustomFilterDuration"
import "./filters.scss"

function SearchResultCustomFilter({ checkboxes }) {
  return (
    <fieldset className="filters__container">
      <div className="filters__header">
        <h2 className="filters__title">Фильтры</h2>
        <button className="filters__clear" type="button">
          очистить все
        </button>
      </div>
      <ul className="filters__list">
        <SearchResultCustomFilterTransfer checkboxes={checkboxes} />
        <SearchResultCustomFilterDeparture />
        <SearchResultCustomFilterDuration />
      </ul>
    </fieldset>
  )
}

export default SearchResultCustomFilter
