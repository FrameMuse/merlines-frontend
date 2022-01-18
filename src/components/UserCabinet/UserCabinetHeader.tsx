
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import Icon from "../common/Icon"
import Logout from "../common/Logout"

function UserCabinetHeader() {
  const user = useSelector(state => state.user)
  if (!user.auth) return <>No Auth</>
  return (
    <div className="cabinet__header">
      <div className="cabinet__user">
        <img className="cabinet__user-avatar" src={user.avatar} alt="avatar" />
        <div className="cabinet__user-inner">
          <div className="cabinet__user-text">Здравствуйте,</div>
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
