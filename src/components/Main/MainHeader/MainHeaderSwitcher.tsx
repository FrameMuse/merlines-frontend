import { useDispatch, useSelector } from "react-redux"
import { SearchDetails, updateSearchTransport } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

function MainHeaderSwitcher() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  const updateTransport = (transport: SearchDetails["transport"]) => dispatch(updateSearchTransport(transport))
  return (
    <div className="main-form__nav">
      <button className={classWithModifiers("main-form__item", search.transport === "plane" && "active")} onClick={() => updateTransport("plane")}>
        <Icon className="main-form__icon" name="plane" />
        <span className="main-form__item-text">самолёт</span>
      </button>
      <button className={classWithModifiers("main-form__item", search.transport === "train" && "active")} onClick={() => updateTransport("train")}>
        <Icon className="main-form__icon" name="train" />
        <span className="main-form__item-text">поезд</span>
      </button>
      <button className={classWithModifiers("main-form__item", search.transport === "bus" && "active")} onClick={() => updateTransport("bus")}>
        <Icon className="main-form__icon" name="bus" />
        <span className="main-form__item-text">автобус</span>
      </button>
    </div>
  )
}

export default MainHeaderSwitcher
