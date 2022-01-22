import Slider from "components/Slider/Slider"


interface SearchFilterRangeProps {
  min: number
  max: number
}

function SearchFilterRange(props: SearchFilterRangeProps) {
  return (
    <div className="range range--travel filters__range">
      <div className="range__time">
        <span className="range__time-item">{props.min}</span>
        <span className="range__time-item">{props.max}</span>
      </div>
      <Slider
        className="horizontal-slider"
        thumbClassName="horizontal-slider__thumb"
        trackClassName="horizontal-slider__track"
        min={props.min}
        max={props.max}
        defaultValue={[props.min, props.max]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={1}
        interval={() => { 1 }}
      />
    </div>
  )
}

export default SearchFilterRange
