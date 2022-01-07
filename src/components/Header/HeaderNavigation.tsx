import Icon from "components/common/Icon"
import PopupLogin from "components/Popups/PopupLogin"
import { UserType } from "interfaces/user"
import { Popup } from "plugins/popup"
import { useState } from "react"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils"

import HeaderLink from "./HeaderLink"


function HeaderNavigation() {
  const user = useSelector(state => state.user)
  const [isActive, setIsActive] = useState(false)
  return (
    <nav className={classWithModifiers("nav", isActive && "active")}>
      <button className="nav__toggle" type="button" onClick={() => setIsActive(!isActive)}>
        <span className="nav__toggle-item" aria-label="Открыть меню" />
      </button>
      <div className="nav__inner">
        <div className="nav__group">
          {user.authed && [UserType.Admin, UserType.Editor].includes(user.type) && (
            <HeaderLink to="/admin" iconName="arrow">Админ панель</HeaderLink>
          )}
          <HeaderLink to="/blog" iconName="edit">Блог</HeaderLink>
          <HeaderLink to="/price-calendar" iconName="calendar">Календарь цен</HeaderLink>
        </div>
        <div className="nav__group">
          {user.authed ? (
            <HeaderLink to="/user" iconName="user-on" label="text" />
          ) : (
            <button className="nav__link" type="button" onClick={() => Popup.open(PopupLogin)}>
              <Icon name="user-off" className="nav__link-icon" />
              <span className="nav__link-text">Войти</span>
            </button>
          )}
        </div>
      </div>
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
    </nav>
  )
}

export default HeaderNavigation
