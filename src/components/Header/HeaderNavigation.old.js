import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

import { lkNavConfig } from "../../constants"
import useWindowSize from "../../hooks/useWindowSize"
import { selectAccessData } from "../../reducers/accessDataSlice"
import routes from "../../routes"
import Logout from "../common/Logout"
import HeaderLink from "./HeaderLink"

function HeaderNavigation() {
  const accessData = useSelector(selectAccessData)
  const path = useLocation().pathname
  const windowSize = useWindowSize()
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const calendarRoute = (locationPath) => {
    switch (locationPath) {
      case routes.air:
        return routes.priceCalendar.air
      case routes.train:
        return routes.priceCalendar.train
      case routes.bus:
        return routes.priceCalendar.bus
      default:
        return routes.priceCalendar.air
    }
  }

  useEffect(() => {
    const handleOverlayClose = (evt) => {
      const isClickedOnPopup =
        evt.target.classList.contains("nav--opened") ||
        evt.target.classList.contains("nav__list") ||
        evt.target.classList.contains("nav__link-text") ||
        evt.target.classList.contains("nav__link-icon") ||
        evt.target.classList.contains("nav__link") ||
        evt.target.classList.contains("logo__icon")

      if (isMenuOpened && !isClickedOnPopup) {
        setIsMenuOpened(false)
      }
    }

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        setIsMenuOpened(false)
      }
    }

    document.addEventListener("click", handleOverlayClose)
    document.addEventListener("keydown", handleEscClose)

    return () => {
      document.removeEventListener("click", handleOverlayClose)
      document.removeEventListener("keydown", handleEscClose)
    }
  })

  return (
    <nav className={`nav ${isMenuOpened ? "nav--opened" : "nav--closed"}`}>
      <button
        onClick={() => setIsMenuOpened(!isMenuOpened)}
        className="nav__toggle"
        type="button"
      >
        <span className="nav__toggle-item" aria-label="Открыть меню"></span>
      </button>
      <div className="nav__list nav__list--links">
        {/* <HeaderLink modifier="blog" href={routes.blog} svgClass="" svgName="edit" title="Блог" /> */}
        {windowSize.width < 992 && accessData.loginToken ? (
          <>
            <HeaderLink
              href={routes.lk.edit}
              svgClass=""
              svgName="user"
              title=" Редактировать"
            />
            {lkNavConfig.map((item, index) => (
              <HeaderLink
                key={index}
                href={item.route}
                svgClass=""
                svgName={item.svgName}
                title={item.itemName}
              />
            ))}
            <HeaderLink
              href={() => calendarRoute(path)}
              svgClass=""
              svgName="calendar"
              title="Календарь цен"
            />

            {windowSize.width < 992 && accessData.loginToken && <Logout />}
          </>
        ) : (
          <>
            {windowSize.width < 992 && (
              <HeaderLink
                href={
                  accessData.loginToken
                    ? routes.lk.base
                    : `${routes.login}?next=${path}`
                }
                svgClass={
                  accessData.loginToken ? "nav__user-on" : "nav__user-off"
                }
                svgName={accessData.loginToken ? "user-on" : "user-off"}
                title="Кабинет"
              />
            )}
            <HeaderLink
              href={"/admin"}
              svgClass=""
              svgName="arrow"
              title="Админ панель"
            />
            <HeaderLink
              href={routes.blog}
              svgClass=""
              svgName="edit"
              title="Блог"
            />
            <HeaderLink
              href={() => calendarRoute(path)}
              svgClass=""
              svgName="calendar"
              title="Календарь цен"
            />
          </>
        )}
      </div>
      <HeaderSettings />
    </nav>
  )
}

function HeaderSettings() {
  const user = useSelector(state => state.user)
  return (
    <>
      <div className="nav__list nav__list--setting">
        <div className="nav__item nav__item--language">
          <HeaderLink
            modifier="russia nav__title"
            href="#"
            svgClass=""
            svgName=""
            text="Русский язык"
          />
          {/* <div className="nav__sublist">
            <a className="nav__link nav__link--russia nav__link--hide" href="#ru">Русский язык</a>
            <a className="nav__link nav__link--english" href="#en">English</a>
            <a className="nav__link nav__link--deutsch" href="#de">Deutsch</a>
          </div> */}
        </div>
        <div className="nav__item nav__item--currency">
          <HeaderLink
            modifier="rub nav__title"
            href="#"
            svgClass=""
            svgName=""
            text="Российский рубль"
          />
          {/* <div className="nav__sublist">
            <a className="nav__link nav__link--rub nav__link--hide" href="#rub">Российский рубль</a>
            <a className="nav__link nav__link--usd" href="#usd">Доллар США</a>
            <a className="nav__link nav__link--eur" href="#eur">Евро</a>
          </div> */}
        </div>
      </div>

      <div className="nav__list nav__list--top">
        <HeaderLink
          modifier="cabinet"
          href={user.auth ? "/user" : "/login"}
          svgClass="user-off"
          svgName="user-off"
        />
      </div>
    </>
  )
}

export default HeaderNavigation
