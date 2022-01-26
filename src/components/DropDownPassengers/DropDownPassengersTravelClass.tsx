import { useDispatch, useSelector } from "react-redux"
import { SearchTravelClass, updateSearchTravelClass } from "redux/reducers/search"

interface DropDownPassengersTravelClassProps {
  name: SearchTravelClass
}

function DropDownPassengersTravelClass(props: DropDownPassengersTravelClassProps) {
  const localization: Record<SearchTravelClass, string> = {
    1: "Эконом",
    2: "Бизнес",
  }
  const ll = localization[props.name]
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  function changeTravelClass() {
    dispatch(updateSearchTravelClass(props.name))
  }
  return (
    <label className="passengers-list__checkbox">
      <input className="passengers-list__checkbox-input" type="checkbox" checked={search.travelClass === props.name} onChange={changeTravelClass} />
      <div className="passengers-list__checkbox-label">{ll}</div>
    </label>
  )
}

export default DropDownPassengersTravelClass
