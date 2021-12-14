// SCSS
import "./AdminEditUsers.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import Svg from "components/common/Svg"

// Mock Avatar
import MeliodasPNG from "./meliodas.jpg"

interface User {
  id: number
  avatar: string
  firstname: string
  surname: string
  email: string
}

const mockUserData: User = {
  id: 10,
  avatar: MeliodasPNG,
  firstname: "Meliodas",
  surname: "七つの大罪",
  email: "meliodas@deadlysins.net"
}

function AdminEditUsers() {
  const users = Array(135).fill(mockUserData)
  return (
    <AdminSectionLayout header={users.length + " пользователей"}>
      <div className="edit-users">
        {users.map(user => (
          <AdminEditUsersUser {...user} key={user.id} />
        ))}
      </div>
    </AdminSectionLayout>
  )
}


interface AdminEditUsersUserProps extends User { }

function AdminEditUsersUser(props: AdminEditUsersUserProps) {
  return (
    <div className="edit-user">
      <div className="edit-user__header">
        <img src={props.avatar} alt="avatar" className="edit-user__avatar" />
        <div className="edit-user__name">{props.firstname} {props.surname}</div>
        <div className="edit-user__id">#{props.id}</div>
        <div className="edit-user__toggle">
          <Svg svgName="arrow-angle" />
        </div>
      </div>
    </div>
  )
}

export default AdminEditUsers
