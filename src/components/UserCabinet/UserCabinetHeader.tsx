
import { useSelector } from "react-redux"

import Icon from "../common/Icon"
import Logout from "../common/Logout"

function LkHeader() {
  const user = useSelector(state => state.user)
  if (!user.authed) return <>No Auth</>
  return (
    <div className="cabinet__header">
      <div className="cabinet__user">
        <img className="cabinet__user-avatar" src={user.avatar} alt="avatar" />
        <div className="cabinet__user-inner">
          <div className="cabinet__user-text">Здравствуйте,</div>
          <div className="cabinet__user-name">
            {user.first_name} {user.last_name}
            {" "}
            <Icon name="edit" className="cabinet__edit-icon" />
          </div>
        </div>
      </div>
      <Logout />
    </div>
  )
}

export default LkHeader
