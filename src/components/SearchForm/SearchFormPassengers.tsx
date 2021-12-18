import DropDownPassengers from "components/DropDownPassengers/DropDownPassengers"
import { useSelector } from "react-redux"
import { pluralize } from "utils"

export function SearchFormPassengers() {
  const localization: any = {
    passengers: {
      plural: ["пассажир", "пассажира", "пассажиров"]
    },
    travelClasses: {
      economy: "эконом",
      business: "бизнес",
    }
  }
  const ll = localization

  const search = useSelector(state => state.search)
  const passengersCount = Object.values(search.passengers).reduce((result, next) => result + next, 0)
  const travelClass = ll.travelClasses[search.travelClass]

  return (
    <label className="search-form__group search-form__group--passengers">
      <input
        className="search-form__input search-form__input--passenger"
        value={`${passengersCount} ${pluralize(passengersCount, ll.passengers.plural)}, ${travelClass}`}
        readOnly
      />
      <div className="search-form__placeholder">пассажиры и класс</div>
      <DropDownPassengers />
    </label>
  )
}
