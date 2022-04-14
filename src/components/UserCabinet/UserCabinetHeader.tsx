
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import useLocalization from "../../plugins/localization/hook"
import Icon from "../common/Icon"
import Logout from "../common/Logout"
import UserAvatar from "../UserAvatar/UserAvatar"

function UserCabinetHeader() {
  const ll = useLocalization(ll => ll)
  const user = useSelector(state => state.user)
  if (!user.auth) return <>No Auth</>
  return (
    <div className="cabinet__header">
      <div className="cabinet__user">
        <UserAvatar avatar={user.avatar} firstName={user.first_name} />
        <div className="cabinet__user-inner">
          <div className="cabinet__user-text">{ll.lk.greeting},</div>
          <div className="cabinet__user-name">
            {user.first_name} {user.last_name}
            {" "}
            <NavLink to="/user/edit">
              <Icon name="edit" className="cabinet__edit-icon" />
            </NavLink>
          </div>
        </div>
      </div>
      <Logout />
    </div>
  )
}

export default UserCabinetHeader
