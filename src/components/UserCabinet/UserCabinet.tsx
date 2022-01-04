import "./cabinet.scss"

import Icon, { IconName } from "components/common/Icon"
import { NavLink } from "react-router-dom"

import LkClearHistory from "./LkClearHistory"
import UserCabinetContent from "./LkContent/UserCabinetContent"
import LkHeader from "./UserCabinetHeader"


function UserCabinet() {
  return (
    <>
      <section className="cabinet">
        <div className="cabinet__container">
          <LkHeader />
          <div className="cabinet__inner">
            <div className="cabinet__col cabinet__col--nav">
              <nav className="cabinet__nav">
                <LkNavLink to="/user" iconName="star">Избранное</LkNavLink>
                <LkNavLink to="/user/history" iconName="history">История</LkNavLink>
                <LkNavLink to="/user/subscribes" iconName="notice">Подписки</LkNavLink>
                <LkNavLink to="/user/question" iconName="question">Задать вопрос</LkNavLink>
              </nav>
            </div>
            <UserCabinetContent />
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

function LkNavLink(props: LkNavLinkProps) {
  return (
    <NavLink className="cabinet__nav-item" activeClassName="cabinet__nav-item--active" exact to={props.to}>
      {props.children}
      {" "}
      <Icon name={props.iconName} className="cabinet__nav-icon" />
    </NavLink>
  )
}

export default UserCabinet
