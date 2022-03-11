import { NavLink } from "react-router-dom"

interface UserCabinetSwitcherProps {
  basename: string
}

function UserCabinetSwitcher(props: UserCabinetSwitcherProps) {
  // const mainClass = classMerge("subnav-link", subscribes && "cabinet__subnav")
  return (
    <div className="subnav cabinet__subnav">
      <NavLink
        className="subnav-link"
        activeClassName="subnav-link--active"
        to={props.basename + "/routes"}
      >Маршруты</NavLink>
      <NavLink
        className="subnav-link"
        activeClassName="subnav-link--active"
        to={props.basename + "/tickets"}
      >Билеты</NavLink>
    </div>
  )
}

export default UserCabinetSwitcher
