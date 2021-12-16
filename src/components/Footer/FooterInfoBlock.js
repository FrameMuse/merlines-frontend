import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import useFullRoute from "../../hooks/useFullRoute"
import { setHistoryRoute } from "../../reducers/routesDataSlice"
import { capitalize } from "../../utils"
import Icon from "../common/Icon"

function FooterInfoBlock(props) {
  const { title, links, modifier } = props

  const fullRoute = useFullRoute()
  const dispatch = useDispatch()

  const getFullRoute = () => dispatch(setHistoryRoute(fullRoute))

  return (
    <div
      className={`footer__col ${modifier ? `footer__col--${modifier}` : ""}`}
    >
      <h2 className="footer__title">{title}</h2>
      <ul className="footer__list">
        {links &&
          links.map((item, index) => (
            <li key={index} className="footer__item">
              <Link
                onClick={getFullRoute}
                className={`footer__link ${item.linkClass ? item.linkClass : ""}`}
                to={item.link}
              >
                {item.svg ? (
                  <>
                    <Icon
                      className="footer__link-icon"
                      name={item.svg}
                      width="15"
                      height="15"
                    />
                    {capitalize(item.svg)}
                  </>
                ) : (
                  item.name
                )}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default FooterInfoBlock
