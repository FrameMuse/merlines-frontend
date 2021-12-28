import "./header.scss"
import "./nav.scss"

import { Link, useLocation } from "react-router-dom"

import routes from "../../routes"
import Icon from "../common/Icon"
import HeaderNavigation from "./HeaderNavigation"

function Header() {
  const location = useLocation()

  const mainRoute = (locationPath) => {
    switch (locationPath) {
      case routes.priceCalendar.air:
        return routes.main
      case routes.priceCalendar.train:
        return routes.train
      case routes.priceCalendar.bus:
        return routes.bus
      default:
        return routes.main
    }
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link className="logo" to={() => mainRoute(location.pathname)}>
          <Icon
            className="logo__icon"
            name="merlines"
            width="98"
            height="22"
          />
        </Link>
        <a className="skip-nav-link" href="#main-content">Skip Navigation</a>
        <HeaderNavigation />
      </div>
    </header>
  )
}

export default Header
