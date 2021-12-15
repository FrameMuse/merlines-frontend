import { Link } from "react-router-dom"

import Icon from "../common/Icon"

function LandingTransportSwitcher() {
  return (
    <div className="special-nav landing__special-nav">
      <Link className="special-nav__item special-nav__item--active" to="#">
        <Icon
          className="special-nav__icon"
          name="plane"
          width="25"
          height="26"
        />
      </Link>
      <Link className="special-nav__item" to="#">
        <Icon
          className="special-nav__icon"
          name="train"
          width="22"
          height="26"
        />
      </Link>
      <Link className="special-nav__item" to="#">
        <Icon
          className="special-nav__icon"
          name="bus"
          width="22"
          height="26"
        />
      </Link>
    </div>
  )
}

export default LandingTransportSwitcher
