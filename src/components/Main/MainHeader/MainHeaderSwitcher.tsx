import useSearchTransport from "hooks/useSearchTransport"
import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

function MainHeaderSwitcher() {
  const [transport, setTransport] = useSearchTransport()
  return (
    <div className="main-form__nav">
      <button className={classWithModifiers("main-form__item", transport === "air" && "active")} onClick={() => setTransport("air")}>
        <Icon className="main-form__icon" name="plane" />
        <span className="main-form__item-text">самолёт</span>
      </button>
      <button className={classWithModifiers("main-form__item", transport === "train" && "active")} onClick={() => setTransport("train")}>
        <Icon className="main-form__icon" name="train" />
        <span className="main-form__item-text">поезд</span>
      </button>
      <button className={classWithModifiers("main-form__item", transport === "bus" && "active")} onClick={() => setTransport("bus")}>
        <Icon className="main-form__icon" name="bus" />
        <span className="main-form__item-text">автобус</span>
      </button>
    </div>
  )
}

export default MainHeaderSwitcher
