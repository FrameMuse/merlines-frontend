import { Link } from "react-router-dom"

import Icon from "../common/Icon"

function HeaderLink(props) {
  const { href, svgClass, svgName, title, text, handleClick, modifier } = props

  const linkClass = modifier ? `nav__link nav__link--${modifier}` : "nav__link"

  return (
    <Link className={linkClass} onClick={handleClick} to={href}>
      {text && <span className="nav__link-text">{text}</span>}
      <Icon
        className={`nav__link-icon ${svgClass}`}
        name={svgName}
        width="15"
        height="15"
      />
      {title}
    </Link>
  )
}

export default HeaderLink
