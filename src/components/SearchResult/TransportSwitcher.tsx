import "./transports.scss"

import Icon from "components/common/Icon"
import useSearchTransport from "hooks/useSearchTransport"
import { classWithModifiers } from "utils"

function TransportSwitcher() {
  const [transport, setTransport] = useSearchTransport()
  return (
    <nav className="transports ticket-list__transports">
      <button className={classWithModifiers("transports-link", transport === "plane" && "active")} onClick={() => setTransport("plane")}>
        <Icon className="transports-link__icon" name="plane" />
        <div className="transports-link__header">
          <span className="transports-link__title">
            {"Самолёты"}
          </span>
          <span className="transports-link__price">{(100).toPrice()}</span>
        </div>
      </button>
      <button className={classWithModifiers("transports-link", transport === "train" && "active")} onClick={() => setTransport("train")}>
        <Icon className="transports-link__icon" name="train" />
        <div className="transports-link__header">
          <span className="transports-link__title">
            {"Поезда"}
          </span>
          <span className="transports-link__price">{(100).toPrice()}</span>
        </div>
      </button>
      <button className={classWithModifiers("transports-link", transport === "bus" && "active")} onClick={() => setTransport("bus")}>
        <Icon className="transports-link__icon" name="bus" />
        <div className="transports-link__header">
          <span className="transports-link__title">
            {"Автобусы"}
          </span>
          <span className="transports-link__price">{(100).toPrice()}</span>
        </div>
      </button>
    </nav>
  )
}

export default TransportSwitcher
