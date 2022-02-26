import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

import Icon, { IconName } from "../common/Icon"


interface HeaderLinkProps {
  to: string
  label?: string
  iconName?: IconName
  children?: ReactNode
}

function HeaderLink(props: HeaderLinkProps) {
  return (
    <NavLink className="nav__link" to={props.to}>
      {props.iconName && (
        <Icon name={props.iconName} className="nav__link-icon" />
      )}
      {props.children}
      {props.label && (
        <span className="nav__link-text">{props.label}</span>
      )}
    </NavLink>
  )
}

export default HeaderLink
