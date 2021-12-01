function DropDownItem({ active, cityOrAirport, getCity }) {
  return (
    <li className={"drop-down__item"}>
      <div
        onClick={() => getCity(cityOrAirport)}
        className={`drop-down__item-box ${
          active ? "drop-down__item-box--active" : ""
        }`}
      >
        <span className="drop-down__item-title">
          {cityOrAirport.name}, {cityOrAirport.country.name}
        </span>
        <span className="drop-down__item-tag">{cityOrAirport.code}</span>
      </div>
    </li>
  )
}

export default DropDownItem
