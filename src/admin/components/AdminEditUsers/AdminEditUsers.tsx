// SCSS
import "./AdminEditUsers.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import Icon from "components/common/Icon"
import { useState } from "react"
import { classWithModifiers } from "utils"

import AdminButton from "../AdminButton/AdminButton"
// Mock Avatar
import MeliodasPNG from "./meliodas.jpg"

interface User {
  id: number
  avatar: string
  firstname: string
  surname: string
  email: string
  street: string
  status: "admin" | "editor" | "default"
}

const mockUserData: User = {
  id: 10,
  avatar: MeliodasPNG,
  firstname: "Meliodas",
  surname: "七つの大罪",
  email: "meliodas@deadlysins.net",
  street: "Britania 4",
  status: "admin"
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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="edit-user">
      <div className={classWithModifiers("edit-user__header", isOpen && "active")} onClick={() => setIsOpen(!isOpen)}>
        <img src={props.avatar} alt="avatar" className="edit-user__avatar" />
        <div className="edit-user__name">{props.firstname} {props.surname}</div>
        <div className="edit-user__id">#{props.id}</div>
        <div className="edit-user__toggle">
          <Icon name="arrow-angle" className={classWithModifiers("edit-user__icon", isOpen && "up")} />
        </div>
      </div>
      <div className={classWithModifiers("edit-user__content", isOpen && "open")}>
        <div className="edit-user-area">
          <div className="edit-user-area__title">Personal</div>
          <div className="edit-user-area__entries">
            <div className="edit-user-area__entry">
              <span>Email: </span>
              <span>{props.email}</span>
            </div>
            <div className="edit-user-area__entry">
              <span>Street: </span>
              <span>{props.street}</span>
            </div>
            <div className="edit-user-area__entry">
              <span>Status: </span>
              <span>{props.status}</span>
            </div>
          </div>
        </div>
        <div className="edit-user-area edit-user-area--danger">
          <div className="edit-user-area__title">Danger Zone</div>
          <div className="edit-user-area__actions">
            <div className="edit-user-area__action">
              <select className="edit-user-area__input">
                <option>admin</option>
                <option>editor</option>
                <option>default</option>
              </select>
              <AdminButton color="red">Изменить роль</AdminButton>
              <AdminButton color="red">Забанить</AdminButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEditUsers
