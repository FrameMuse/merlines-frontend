import Svg from "../common/Svg"

function DropDownCalendarSlider({ clickPrev, clickNext, isCurrent }) {
  const left = (evt) => {
    evt.preventDefault()
    !isCurrent && clickPrev()
  }

  const right = (evt) => {
    evt.preventDefault()
    clickNext()
  }

  return (
    <div className="drop-down-calendar__control">
      {/* drop-down-calendar__control-btn--disabled */}
      <button
        onClick={left}
        className={`drop-down-calendar__control-btn drop-down-calendar__control-btn--prev ${
          isCurrent && "drop-down-calendar__control-btn--disabled"
        }`}
      >
        <Svg
          svgClass="drop-down-calendar__control-icon"
          svgName="arrow-filter"
          svgWidth="10"
          svgHeight="10"
        />
      </button>
      <button
        onClick={right}
        className="drop-down-calendar__control-btn drop-down-calendar__control-btn--next"
      >
        <Svg
          svgClass="drop-down-calendar__control-icon"
          svgName="arrow-filter"
          svgWidth="10"
          svgHeight="10"
        />
      </button>
    </div>
  )
}

export default DropDownCalendarSlider
