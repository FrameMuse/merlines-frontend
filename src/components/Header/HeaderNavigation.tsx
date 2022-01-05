import Icon from "components/common/Icon"
import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { classWithModifiers } from "utils"


function HeaderNavigation() {
  const [isActive, setIsActive] = useState(false)
  return (
    <nav className={classWithModifiers("nav", isActive && "open")}>
      {/* <button className="nav__toggle" type="button" onClick={() => setIsActive(!isActive)}>
        <span className="nav__toggle-item" aria-label="Открыть меню" />
      </button> */}
      {/* <div className="nav__group">
        <div className="nav__item">
          <div className="nav__sublist nav__sublist--active">
            <a className="nav__link nav__link--russia" href="#ru">Русский язык</a>
            <a className="nav__link nav__link--english" href="#en">English</a>
            <a className="nav__link nav__link--deutsch" href="#de">Deutsch</a>
          </div>
        </div>
        <div className="nav__item">
          <a className="nav__link">
            <span className="nav__link-text">text</span>
            <Icon name="arrow" className="nav__link-icon" />
          </a>
          <div className="nav__sublist nav__sublist--active">
            <a className="nav__link" href="#rub">Российский рубль</a>
            <a className="nav__link nav__link--usd" href="#usd">Доллар США</a>
            <a className="nav__link nav__link--eur" href="#eur">Евро</a>
          </div>
        </div>
      </div> */}

      <HeaderUser />
    </nav>
  )
}


function HeaderUser() {
  const user = useSelector(state => state.user)
  return (
    <div className="nav__group">
      <NavLink className="nav__link" to="/profile">
        <span className="nav__link-text">text</span>
        <Icon name="user-off" className="nav__link-icon" />
        <Icon name="user-on" className="nav__link-icon" />
      </NavLink>
    </div>
  )
}



export default HeaderNavigation
