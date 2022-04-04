import { Dispatch, useEffect, useState } from "react"

import Slider from "../Slider/Slider"

interface PriceCalendarVacationSliderProps {
  onChange: Dispatch<[number, number]>
}

function PriceCalendarVacationSlider(props: PriceCalendarVacationSliderProps) {
  const [interval, setInterval] = useState<[number, number]>([7, 14])
  const [min, max] = interval
  useEffect(() => props.onChange(interval), [props.onChange, interval])
  return (
    <div className="range calendar__range">
      <h3 className="range__title">Продолжительность отпуска</h3>
      <div className="range__time">
        <span className="range__time-item">{`от ${min} дней`}</span>
        <span className="range__time-item">{`до ${max} дней`}</span>
      </div>
      <Slider
        className="horizontal-slider"
        thumbClassName="horizontal-slider__thumb"
        trackClassName="horizontal-slider__track"
        defaultValue={[7, 14]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        minDistance={1}
        interval={setInterval}
      />
    </div>
  )
}

export default PriceCalendarVacationSlider
