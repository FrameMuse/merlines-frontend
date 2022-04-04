import { Link, useHistory, useLocation } from "react-router-dom"
import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

function MainSpecialSwitcher() {
  return (
    <div className="special-nav special__special-nav">
      <MainSpecialSwitcherLink type="air" />
      <MainSpecialSwitcherLink type="train" />
      <MainSpecialSwitcherLink type="bus" />
    </div>
  )
}



interface MainSpecialSwitcherLinkProps {
  type: "air" | "train" | "bus"
}

function MainSpecialSwitcherLink(props: MainSpecialSwitcherLinkProps) {
  const history = useHistory()
  const { pathname } = useLocation()

  // Remove plane because it's default
  const link = ("/" + props.type).replace("plane", "")
  const onClick = () => history.push(link)
  return (
    <Link className={classWithModifiers("special-nav__item", link === pathname && "active")} to={link} onClick={onClick}>
      <Icon name={props.type} className="special-nav__icon" />
    </Link>
  )
}

export default MainSpecialSwitcher
