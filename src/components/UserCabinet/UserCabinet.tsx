import "./cabinet.scss"

import Icon, { IconName } from "components/common/Icon"
import { NavLink } from "react-router-dom"

import UserCabinetHeader from "./UserCabinetHeader"
import LkClearHistory from "./UserCabinetViews/LkClearHistory"
import UserCabinetRoutes from "./UserCabinetViews/UserCabinetRoutes"


function UserCabinet() {
  return (
    <>
      <section className="cabinet">
        <div className="cabinet__container">
          <UserCabinetHeader />
          <div className="cabinet__inner">
            <div className="cabinet__col cabinet__col--nav">
              <nav className="cabinet__nav">
                <UserCabinetNavLink to="/user/favourites" iconName="star">Избранное</UserCabinetNavLink>
                <UserCabinetNavLink to="/user/history" iconName="history">История</UserCabinetNavLink>
                <UserCabinetNavLink to="/user/subscribes" iconName="notice">Подписки</UserCabinetNavLink>
                <UserCabinetNavLink to="/user/question" iconName="question">Задать вопрос</UserCabinetNavLink>
              </nav>
            </div>
            <UserCabinetRoutes />
          </div>
        </div>
      </section>
      <LkClearHistory />
    </>
  )
}


interface LkNavLinkProps {
  to: string
  children: string
  iconName: IconName
}

function UserCabinetNavLink(props: LkNavLinkProps) {
  return (
    <NavLink className="cabinet__nav-item" activeClassName="cabinet__nav-item--active" to={props.to}>
      {props.children}
      {" "}
      <Icon name={props.iconName} className="cabinet__nav-icon" />
    </NavLink>
  )
}

export default UserCabinet
