import Slider from "components/Slider/Slider"
import { useState } from "react"


interface SearchFilterTimeRangeRangeProps {
  min: number
  max: number
  name: string
}

function SearchFilterTimeRange(props: SearchFilterTimeRangeRangeProps) {
  const [min, setMin] = useState(props.min)
  const [max, setMax] = useState(props.max)

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
