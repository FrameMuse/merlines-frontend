import Icon from "components/common/Icon"
import PopupLogin from "components/Popups/PopupLogin"
import { UserType } from "interfaces/user"
import { Popup } from "plugins/popup"
import { Children, Dispatch, ReactElement, ReactNode, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useClickAway } from "react-use"
import { classWithModifiers } from "utils"

import HeaderLink from "./HeaderLink"

function HeaderNavigation() {
  const user = useSelector(state => state.user)
  const [isActive, setIsActive] = useState(false)
  const [currency, setCurrency] = useState<"rub" | "usd" | "eur">("rub")
  const [language, setLanguage] = useState<"ru" | "en" | "de">("ru")
  return (
    <nav className={classWithModifiers("nav", isActive && "active")}>
      <button className="nav__toggle" type="button" onClick={() => setIsActive(!isActive)}>
        <span className="nav__toggle-item" aria-label="Открыть меню" />
      </button>
      <div className="nav__inner">
        <div className="nav__group">
          {user.auth && [UserType.Super, UserType.Admin, UserType.Editor].includes(user.type) && (
            <HeaderLink to="/admin" iconName="arrow">Админ панель</HeaderLink>
          )}
          <HeaderLink to="/blog" iconName="edit">Блог</HeaderLink>
          <HeaderLink to="/price-calendar" iconName="calendar">Календарь цен</HeaderLink>
        </div>
        <div className="nav__group">
          <NavSublist value={currency} onChange={setCurrency}>
            <option value="rub">
              <Icon className="nav__icon" name="rub" />
              <span>Российский рубль</span>
            </option>
            <option value="usd">
              <Icon className="nav__icon" name="usd" />
              <span>Доллар США</span>
            </option>
            <option value="eur">
              <Icon className="nav__icon" name="eur" />
              <span>Евро</span>
            </option>
          </NavSublist>
          <NavSublist value={language} onChange={setLanguage}>
            <option value="ru">
              <Icon className="nav__icon" name="russia" />
              <span>Русский язык</span>
            </option>
            <option value="en">
              <Icon className="nav__icon" name="kingdom" />
              <span>English</span>
            </option>
            <option value="de">
              <Icon className="nav__icon" name="germany" />
              <span>Deutsch</span>
            </option>
          </NavSublist>
        </div>
        <div className="nav__group">
          {user.auth ? (
            <HeaderLink to="/user">
              <img src={user.avatar} alt="avatar" className="nav__link-image" />
            </HeaderLink>
          ) : (
            <button className="nav__link" type="button" onClick={() => Popup.open(PopupLogin)}>
              <Icon name="user-off" className="nav__icon" />
              <span className="nav__link-text">Войти</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}


interface NavSublistProps<V> {
  onChange: Dispatch<V>
  value: V

  children: ReactElement<{ value: V; children: ReactNode }>[]
}

function NavSublist<V>(props: NavSublistProps<V>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const options = Children.map(props.children, child => child.props)
  useClickAway(parentRef, () => setExpanded(false))
  return (
    <div className="nav-sublist" ref={parentRef}>
      <div className="nav-sublist__label" onClick={() => setExpanded(!expanded)}>
        {options.find(option => option.value === props.value)?.children}
        <span><Icon className={classWithModifiers("nav__icon", "chevron", expanded && "up")} name="chevron" /></span>
      </div>
      <div className={classWithModifiers("nav-sublist__menu", expanded && "expanded")}>
        {options.map((option, index) => (
          <div className={classWithModifiers("nav-sublist__item", option.value === props.value && "active")} onClick={() => (props.onChange(option.value), setExpanded(false))} key={index}>{option.children}</div>
        ))}
      </div>
    </div>
  )
}

export default HeaderNavigation
