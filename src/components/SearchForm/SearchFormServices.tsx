import { useSelector } from "react-redux"
import { pluralize } from "utils"

export function TextulizedPassengers() {
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

  const text = `${passengersCount} ${pluralize(passengersCount, ll.passengers.plural)}, ${travelClass}`

  return (
    <input className="form__input form__input--passenger" value={text} readOnly />
  )
}

export function texualizeDate(date?: Date | null) {
  return date?.toLocaleDateString("ru", { day: "numeric", weekday: "short", month: "long" }) || ""
}
