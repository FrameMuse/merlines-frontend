import "./cabinet.scss"

import Icon, { IconName } from "components/common/Icon"
import { NavLink } from "react-router-dom"

import useLocalization from "../../plugins/localization/hook"
import UserCabinetHeader from "./UserCabinetHeader"
import UserCabinetRoutes from "./UserCabinetViews/UserCabinetRoutes"


function UserCabinet() {
  const ll = useLocalization(ll => ll)
  return (
    <>
      <section className="cabinet">
        <div className="cabinet__container">
          <UserCabinetHeader />
          <div className="cabinet__inner">
            <div className="cabinet__col cabinet__col--nav">
              <nav className="cabinet__nav">
                <UserCabinetNavLink to="/user/favourites" iconName="star">{ll.main.favourites}</UserCabinetNavLink>
                <UserCabinetNavLink to="/user/history" iconName="history">{ll.main.history}</UserCabinetNavLink>
                <UserCabinetNavLink to="/user/subscribes" iconName="notice">{ll.main.subscribes}</UserCabinetNavLink>
                <UserCabinetNavLink to="/user/question" iconName="question">{ll.main.askQuestion}</UserCabinetNavLink>
              </nav>
            </div>
            <UserCabinetRoutes />
          </div>
        </div>
      </section>
    </>
  )
}


interface UserCabinetNavLinkProps {
  to: string
  children: string
  iconName: IconName
}

function UserCabinetNavLink(props: UserCabinetNavLinkProps) {
  return (
    <NavLink className="cabinet__nav-item" activeClassName="cabinet__nav-item--active" to={props.to}>
      {props.children}
      {" "}
      <Icon name={props.iconName} className="cabinet__nav-icon" />
    </NavLink>
  )
}

export default UserCabinet
