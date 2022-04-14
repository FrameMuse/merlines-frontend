import { NavLink } from "react-router-dom"

import useLocalization from "../../plugins/localization/hook"

interface UserCabinetSwitcherProps {
  basename: string
}

function UserCabinetSwitcher(props: UserCabinetSwitcherProps) {
  const ll = useLocalization(ll => ll)
  // const mainClass = classMerge("subnav-link", subscribes && "cabinet__subnav")
  return (
    <div className="subnav cabinet__subnav">
      <NavLink
        className="subnav-link"
        activeClassName="subnav-link--active"
        to={props.basename + "/routes"}
      >
        {ll.lk.routes}
      </NavLink>
      <NavLink
        className="subnav-link"
        activeClassName="subnav-link--active"
        to={props.basename + "/tickets"}
      >
        {ll.lk.tickets}
      </NavLink>
    </div>
  )
}

export default UserCabinetSwitcher
