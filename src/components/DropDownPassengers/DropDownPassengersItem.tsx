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
    babies: {
      title: "Младенцы",
      desc: "до 2 лет",
    }
  }
  const ll = localization[props.name]
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  const passengers = search.passengers[props.name]
  const haveAtLeastOneAdult = (props.name === "adults" && passengers < 2)
  function updatePassengers(value: number) {
    if (props.name === "adults" && value < 1) {
      dispatch(updateSearchPassengers({ adults: 1 }))
      return
    }

    dispatch(updateSearchPassengers({ [props.name]: value }))
  }
  function increment() {
    updatePassengers(passengers + 1)
  }
  function decrement() {
    updatePassengers(passengers - 1)
  }
  return (
    <div className="passengers-list__row">
      <div className="passengers-list__left">
        <span className="passengers-list__item-title">{ll.title}</span>
        <span className="passengers-list__item-info">{ll.desc}</span>
      </div>
      <div className="passengers-list__counter">
        <button className="passengers-list__counter-btn" onClick={decrement} disabled={haveAtLeastOneAdult || (passengers < 1)}>-</button>
        <input className="passengers-list__counter-num" type="number" disabled={haveAtLeastOneAdult} value={passengers} onChange={event => updatePassengers(Number(event.currentTarget.value))} />
        <button className="passengers-list__counter-btn" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default DropDownPassengersItem
