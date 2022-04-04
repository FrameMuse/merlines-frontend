import DropDownPassengers from "components/DropDownPassengers/DropDownPassengers"
import { useSelector } from "react-redux"
import { pluralize } from "utils"

import useLocalization from "../../plugins/localization/hook"

export function SearchFormPassengers() {
  const ll = useLocalization(ll => ll)

  const search = useSelector(state => state.search)
  const passengersCount = Object.values(search.passengers).reduce((result, next) => result + next, 0)
  const travelClass = ll.main.travelClasses[search.travelClass]

  return (
    <label className="search-form__group search-form__group--passengers">
      <input
        className="search-form__input search-form__input--passenger"
        value={`${passengersCount} ${pluralize(passengersCount, ll.main.passengers.plural)}, ${travelClass}`}
        readOnly
      />
      <div className="search-form__placeholder">{ll.main.passengers.text} {ll.main.and} {ll.main.class}</div>
      <DropDownPassengers />
    </label>
  )
}
