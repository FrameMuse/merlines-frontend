
import { patchAccountMe } from "api/actions/account"
import EditAvatar from "components/EditAvatar/EditAvatar"
import { useClient } from "react-fetching-library"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { updateUser } from "redux/reducers/user"
import { toBase64 } from "utils"

import useLocalization from "../../plugins/localization/hook"
import Icon from "../common/Icon"
import Logout from "../common/Logout"
import UserAvatar from "../UserAvatar/UserAvatar"

function UserCabinetHeader() {
  const dispatch = useDispatch()
  const client = useClient()
  async function putUserAvatar(avatarFile: File, avatarBlob: string) {
    const avatarBase64 = await toBase64(avatarFile)

    const { error, payload } = await client.query(patchAccountMe({ avatar: avatarBase64 }))
    if (error) return
    if (payload == null) return

    dispatch(updateUser({ ...payload, avatar: avatarBlob }))
  }
  const ll = useLocalization(ll => ll)
  const user = useSelector(state => state.user)
  if (!user.auth) return <>No Auth</>
  return (
    <div className="cabinet__header">
      <div className="cabinet__user">
        <EditAvatar onChange={putUserAvatar}>
          <UserAvatar avatar={user.avatar} firstName={user.first_name} />
        </EditAvatar>
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
