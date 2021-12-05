import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"

import {
  selectFilter,
  setDurationMax,
  setDurationMin} from "../../../reducers/filtersSlice"
import { selectSearchResult } from "../../../reducers/searchResultSlice"
import Slider from "../../Slider/Slider"

function SearchResultCustomFilterDuration() {
  const [isTransferOpen, setIsTransferOpen] = useState(true)
  const openTransfer = () => setIsTransferOpen(!isTransferOpen)
  const dispatch = useDispatch()
  const filterData = useSelector(selectFilter)
  const searchResultData = useSelector(selectSearchResult)
  const minDuration = Math.min(...searchResultData.searchData.durations)
  const maxDuration = Math.max(...searchResultData.searchData.durations)

  return (
    <li
      className={`filters__item ${
        isTransferOpen ? "filters__item--opened" : ""
      }`}
    >
      <button onClick={openTransfer} className="filters__btn" type="button">
        Время в пути
      </button>
      <div className="filters__inner">
        <div className="range range--travel filters__range">
          <h3 className="range__title">Туда</h3>
          <div className="range__time">
            <span className="range__time-item">{`от ${filterData.duration.min}`}</span>
            <span className="range__time-item">{`до ${filterData.duration.max}`}</span>
          </div>
          <Slider
            className="horizontal-slider"
            thumbClassName="horizontal-slider__thumb"
            trackClassName="horizontal-slider__track"
            min={minDuration}
            max={maxDuration}
            defaultValue={[minDuration, maxDuration]}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            pearling
            minDistance={1}
            interval={(state) => {
              dispatch(setDurationMin(state[0]))
              dispatch(setDurationMax(state[1]))
            }}
          />
        </div>
      </div>
    </li>
  )
}

export default SearchResultCustomFilterDuration
