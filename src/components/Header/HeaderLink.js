import { Link } from "react-router-dom"

import Svg from "../common/Svg"

function HeaderLink(props) {
  const { href, svgClass, svgName, title, text, handleClick, modifier } = props

  const linkClass = modifier ? `nav__link nav__link--${modifier}` : "nav__link"

  return (
    <Link className={linkClass} onClick={handleClick} to={href}>
      {text && <span className="nav__link-text">{text}</span>}
      <Svg
        svgClass={`nav__link-icon ${svgClass}`}
        svgName={svgName}
        svgWidth="15"
        svgHeight="15"
      />
      {title}
    </Link>
  )
}

export default HeaderLink
