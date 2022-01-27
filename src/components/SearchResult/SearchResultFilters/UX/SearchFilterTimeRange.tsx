import Slider from "components/Slider/Slider"
import { useContext, useEffect, useState } from "react"

import { searchFiltersContext } from "../SearchFilters"


interface SearchFilterTimeRangeRangeProps {
  min: number
  max: number
  name: string
  index: number

  deltaTime?: boolean
}

function SearchFilterTimeRange(props: SearchFilterTimeRangeRangeProps) {
  const [filters, setFilters] = useContext(searchFiltersContext)

  const [min, setMin] = useState(props.min)
  const [max, setMax] = useState(props.max)

  useEffect(() => {
    if (props.deltaTime) {
      setFilters(filters => ({ ...filters, [props.name + "__gte" + `[${props.index}]`]: new Date(min * 1000).toJSON().slice(11, 16) }))
      setFilters(filters => ({ ...filters, [props.name + "__lte" + `[${props.index}]`]: new Date(max * 1000).toJSON().slice(11, 16) }))

      return
    }
    setFilters(filters => ({ ...filters, [props.name + "__gte" + `[${props.index}]`]: min }))
    setFilters(filters => ({ ...filters, [props.name + "__lte" + `[${props.index}]`]: max }))
  }, [min, max])

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setMin(props.min)
      setMax(props.max)
    }
  }, [filters])

  const minHours = Math.floor(min / 60 / 60)
  const maxHours = Math.floor(max / 60 / 60)
  const minMinutes = Math.floor((min % (60 * 60)) / 60)
  const maxMinutes = Math.floor((max % (60 * 60)) / 60)
  return (
    <div className="range range--travel filters__range">
      <div className="range__time">
        <span className="range__time-item">от {minHours}ч {minMinutes}м</span>
        <span className="range__time-item">до {maxHours}ч {maxMinutes}м</span>
      </div>
      <Slider
        className="horizontal-slider"
        thumbClassName="horizontal-slider__thumb"
        trackClassName="horizontal-slider__track"
        min={props.min}
        max={props.max}
        value={[min, max]}
        defaultValue={[min, max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={1}
        interval={([min, max]: any) => (setMin(min), setMax(max))}
      />
    </div>
  )
}

export default SearchFilterTimeRange
