import Slider from "components/Slider/Slider"
import _ from "lodash"
import { useContext, useEffect, useState } from "react"

import useLocalization from "../../../../plugins/localization/hook"
import { searchFiltersContext } from "../SearchFilters"


interface SearchFilterTimeRangeRangeProps {
  min: number
  max: number
  name: string
  index: number

  deltaTime?: boolean
}

function SearchFilterTimeRange(props: SearchFilterTimeRangeRangeProps) {
  const ll = useLocalization(ll => ll)
  const [filters, setFilters] = useContext(searchFiltersContext)
  const filterMinSymbol = props.name + "__gte"
  const filterMaxSymbol = props.name + "__lte"
  // const filterMinValue = Number(filters[filterMinSymbol])
  // const filterMaxValue = Number(filters[filterMaxSymbol])

  const [value, setValue] = useState<[number, number]>([props.min, props.max - 1]) // [min, max]
  const [min, max] = value

  useEffect(() => {
    setMinMaxFilters([min, max])
  }, [min, max])

  // useEffect(() => {
  //   setValue([props.min, props.max])
  // }, [props.min, props.max])

  function setMinMaxFilters([min, max]: [number, number]) {
    setValue([min, max])

    if (props.deltaTime) {
      setFilters(filters => ({ ...filters, [filterMinSymbol + `[${props.index}]`]: new Date(min * 1000).toJSON().slice(11, 16) }))
      setFilters(filters => ({ ...filters, [props.name + "__lte" + `[${props.index}]`]: new Date(max * 1000).toJSON().slice(11, 16) }))

      return
    }

    setFilters(filters => ({ ...filters, [filterMinSymbol + `[${props.index}]`]: min }))
    setFilters(filters => ({ ...filters, [filterMaxSymbol + `[${props.index}]`]: max }))
  }

  const minHours = Math.floor(min / 60 / 60)
  const maxHours = Math.floor(max / 60 / 60)
  const minMinutes = Math.floor((min % (60 * 60)) / 60)
  const maxMinutes = Math.floor((max % (60 * 60)) / 60)
  return (
    <div className="range range--travel filters__range">
      <div className="range__time">
        <span className="range__time-item">{ll.main.from} {minHours}ч {minMinutes}м</span>
        <span className="range__time-item">{ll.main.to} {maxHours}ч {maxMinutes}м</span>
      </div>
      <Slider
        className="horizontal-slider"
        thumbClassName="horizontal-slider__thumb"
        trackClassName="horizontal-slider__track"
        min={props.min}
        max={props.max - 1}
        value={[min, max]}
        // defaultValue={[min, max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={1}
        onChange={setMinMaxFilters}
      // interval={(v: [number, number]) => console.log(v)}
      />
    </div>
  )
}

export default SearchFilterTimeRange
