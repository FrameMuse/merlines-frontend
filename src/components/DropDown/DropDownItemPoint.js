import Svg from "../common/Svg"

function DropDownItemPoint({ cityOrAirport, getCity, active }) {
  const name = cityOrAirport.name ? cityOrAirport.name : cityOrAirport.city.name

  return (
    <li
      onClick={() => getCity(cityOrAirport)}
      className={`drop-down__inner-item ${
        active ? "drop-down__inner-item--active" : ""
      }`}
    >
      <Svg
        svgClass="drop-down__item-icon"
        svgName="departures"
        svgWidth="15"
        svgHeight="15"
      />
      <span className="drop-down__item-title">{name}</span>
      <span className="drop-down__item-tag">{cityOrAirport.code}</span>
    </li>
  )
}

export default DropDownItemPoint
