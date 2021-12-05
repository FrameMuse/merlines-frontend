import { useDispatch,useSelector } from "react-redux"

import {
  decrementPassengers,
  incrementPassengers,
  selectMainSearchParams} from "../../reducers/mainSearchSlice"

function DropDownPassengersItem({ name, age, apiParam }) {
  const dispatch = useDispatch()
  const mainSearchParams = useSelector(selectMainSearchParams)

  const increment = () => dispatch(incrementPassengers({ type: apiParam }))
  const decrement = () => dispatch(decrementPassengers({ type: apiParam }))

  const isMinimumAmount =
    apiParam === "passengers_adults"
      ? mainSearchParams.passengers[apiParam] < 2
      : mainSearchParams.passengers[apiParam] < 1

  return (
    <div className="passengers-list__row">
      <div className="passengers-list__left">
        <span className="passengers-list__item-title">{name}</span>
        <span className="passengers-list__item-info">{age}</span>
      </div>
      <div className="passengers-list__counter">
        <button
          className={`passengers-list__counter-btn ${
            !isMinimumAmount ? "passengers-list__counter-btn--active" : ""
          }`}
          type="button"
          onClick={decrement}
          disabled={isMinimumAmount}
        >
          -
        </button>
        <input
          className="passengers-list__counter-num"
          type="number"
          value={mainSearchParams.passengers[apiParam]}
          readOnly
        />
        <button
          className="passengers-list__counter-btn passengers-list__counter-btn--active"
          type="button"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default DropDownPassengersItem
