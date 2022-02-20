import { useDispatch, useSelector } from "react-redux"
import { SearchDetails, updateSearchPassengers } from "redux/reducers/search"


interface DropDownPassengersItemProps {
  name: keyof SearchDetails["passengers"]
}

function DropDownPassengersItem(props: DropDownPassengersItemProps) {
  const localization: Record<keyof SearchDetails["passengers"], { title: string; desc: string }> = {
    adults: {
      title: "Взрослые",
      desc: "от 12 лет",
    },
    children: {
      title: "Дети",
      desc: "от 2 до 12 лет",
    },
    infants: {
      title: "Младенцы",
      desc: "до 2 лет",
    }
  }
  const ll = localization[props.name]
  const dispatch = useDispatch()
  const passengers = useSelector(state => state.search.passengers)
  const passengersAll = Object.values(passengers).reduce((a, b) => a + b, 0)
  const passengersGroup = passengers[props.name]
  function updatePassengers(value: number) {
    if (value < 0) {
      dispatch(updateSearchPassengers({ [props.name]: 0 }))
      return
    }
    dispatch(updateSearchPassengers({ [props.name]: value }))
  }
  function increment() {
    updatePassengers(passengersGroup + 1)
  }
  function decrement() {
    updatePassengers(passengersGroup - 1)
  }
  return (
    <div className="passengers-list__row">
      <div className="passengers-list__left">
        <span className="passengers-list__item-title">{ll.title}</span>
        <span className="passengers-list__item-info">{ll.desc}</span>
      </div>
      <div className="passengers-list__counter">
        <button className="passengers-list__counter-btn" type="button" onClick={decrement} disabled={props.name === "adults" ? passengersGroup < 2 : passengersGroup < 1}>-</button>
        <input className="passengers-list__counter-num" type="number" value={passengersGroup} readOnly tabIndex={-1} />
        <button className="passengers-list__counter-btn" type="button" onClick={increment} disabled={passengersAll >= 9}>+</button>
      </div>
    </div>
  )
}

export default DropDownPassengersItem
