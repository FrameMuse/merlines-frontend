import "./transports.scss"

import Icon from "components/common/Icon"
import useSearchTransport from "hooks/useSearchTransport"
import {classWithModifiers, getDefaultSelectedCurrency, getDefaultSelectedLanguage} from "utils"

import useLocalization from "../../plugins/localization/hook"

interface TransportSwitcherProps {
  prices: [number?, number?, number?]
}

function TransportSwitcher(props: TransportSwitcherProps) {
  const ll = useLocalization(ll => ll)
  const [transport, setTransport] = useSearchTransport()
  const [planePrice, trainPrice, busPrice] = props.prices
  return (
    <nav className="transports ticket-list__transports">
      <button className={classWithModifiers("transports-link", transport === "air" && "active")} onClick={() => setTransport("air")}>
        <Icon className="transports-link__icon" name="plane" />
        <div className="transports-link__header">
          <span className="transports-link__title">
            {ll.priceCalendar.airplanes}
          </span>
          <span className="transports-link__price">{planePrice?.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency()) ?? "..."}</span>
        </div>
      </button>
      <button className={classWithModifiers("transports-link", transport === "train" && "active")} onClick={() => setTransport("train")}>
        <Icon className="transports-link__icon" name="train" />
        <div className="transports-link__header">
          <span className="transports-link__title">
            {ll.priceCalendar.trains}
          </span>
          <span className="transports-link__price">{trainPrice?.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency()) ?? "..."}</span>
        </div>
      </button>
      <button className={classWithModifiers("transports-link", transport === "bus" && "active")} onClick={() => setTransport("bus")}>
        <Icon className="transports-link__icon" name="bus" />
        <div className="transports-link__header">
          <span className="transports-link__title">
            {ll.priceCalendar.buses}
          </span>
          <span className="transports-link__price">{busPrice?.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency()) ?? "..."}</span>
        </div>
      </button>
    </nav>
  )
}

export default TransportSwitcher
