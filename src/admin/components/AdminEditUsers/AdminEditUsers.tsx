// SCSS
import "./AdminEditUsers.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { getAdminUsers, putAdminUser } from "api/actions/admin"
import Icon from "components/common/Icon"
import { AuthedUser } from "interfaces/user"
import { FormEvent, useState } from "react"
import { useQuery } from "react-fetching-library"
import { classWithModifiers } from "utils"

import ClientAPI from "../../../api/client"
import AdminButton from "../AdminButton/AdminButton"
import AdminSearchFilters from "../AdminSearchFilters/AdminSearchFilters"


function AdminEditUsers() {
  const [filters, setFilters] = useState<Parameters<typeof getAdminUsers>[0]>({})
  const { loading, payload } = useQuery(getAdminUsers(filters))

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(1, event)
    const elements = event.currentTarget.elements as unknown as Record<"id" | "name" | "type" | "amount", HTMLInputElement>

    setFilters({
      id: Number(elements.id.value),
      first_name: elements.name.value,
      // type: elements.type.value,
      page_size: Number(elements.amount.value)
    })
  }

  if (!payload || payload.error) return <>no content</>
  return (
    <AdminSectionLayout header={payload.results.length + " пользователей"}>
      <AdminSearchFilters onSubmit={onSearch} pending={loading}>
        <input type="number" name="id" placeholder="id" />
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="type" placeholder="type" />
        <input type="text" name="amount" placeholder="amount" />
      </AdminSearchFilters>
      <br />
      <div className="edit-users">
        {payload.results.map(user => (
          <AdminEditUsersUser {...user} key={user.id} />
        ))}
      </div>
    </AdminSectionLayout>
  )
}


interface AdminEditUsersUserProps extends AuthedUser { }

function AdminEditUsersUser(props: AdminEditUsersUserProps) {
  const [isOpen, setIsOpen] = useState(false)

  function changeType(id: number, type: AuthedUser["type"]) {
    return ClientAPI.query(putAdminUser(id, type))
  }
  return (
    <div className="edit-user">
      <div className={classWithModifiers("edit-user__header", isOpen && "active")} onClick={() => setIsOpen(!isOpen)}>
        <img src={props.avatar} alt="avatar" className="edit-user__avatar" />
        <div className="edit-user__name">{props.first_name} {props.last_name}</div>
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
              <span>Type: </span>
              <span>{props.type}</span>
            </div>
          </div>
        </div>
        <AdminEditUsersUserDangerZone {...props} />
      </div>
    </div>
  )
}

function AdminEditUsersUserDangerZone(props: AdminEditUsersUserProps) {
  const [type, setType] = useState(props.type)
  function changeType() {
    return ClientAPI.query(putAdminUser(props.id, type))
  }
  return (
    <div className="edit-user-area edit-user-area--danger">
      <div className="edit-user-area__title">Danger Zone</div>
      <div className="edit-user-area__actions">
        <div className="edit-user-area__action">
          <select className="edit-user-area__input" value={type} onChange={event => setType(event.currentTarget.value as AuthedUser["type"])}>
            <option value="admin">admin</option>
            <option value="editor">editor</option>
            <option value="default">default</option>
          </select>
          <AdminButton color="red" onClick={changeType}>Изменить роль</AdminButton>
          <AdminButton color="red">Забанить</AdminButton>
        </div>
      </div>
    </div>
  )
}

export default AdminEditUsers
