import "./header.scss"
import "./nav.scss"

import { Link } from "react-router-dom"

import Icon from "../common/Icon"
import HeaderNavigation from "./HeaderNavigation"

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="logo" to="/">
          <Icon name="merlines" className="logo__icon" />
        </Link>
        <a tabIndex={-1} className="skip-nav-link" onClick={() => document.getElementById("main-content")?.focus()}>Skip Navigation</a>
        <HeaderNavigation />
      </div>
    </header>
  )
}

export default Header
