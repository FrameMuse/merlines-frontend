// SCSS
import "./AdminEditUsers.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminUser, getAdminUsers, getAdminUsersEditors, patchAdminUser } from "api/actions/admin"
import ClientAPI from "api/client"
import Icon from "components/common/Icon"
import { FormElements } from "interfaces/common"
import { Client } from "interfaces/user"
import { FormEvent, useState } from "react"
import { useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminSearchFilters from "../AdminSearchFilters/AdminSearchFilters"


function AdminEditUsers() {
  const [filters, setFilters] = useState<Parameters<typeof getAdminUsers>[0]>({})
  const { loading, payload } = useQuery(getAdminUsers(filters))

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const elements = event.currentTarget.elements as FormElements<"id" | "name" | "type" | "amount">

    setFilters({
      id: Number(elements.id.value),
      first_name: elements.name.value,
      type: elements.type.value,
      page_size: Number(elements.amount.value)
    })
  }

  if (!payload || payload.error) return <>no content</>
  return (
    <AdminSectionLayout header={payload.results.length + " пользователей найдено"}>
      <AdminSearchFilters onSubmit={onSearch} pending={loading}>
        <input type="number" name="id" placeholder="id" />
        <input type="text" name="name" placeholder="name" />
        <select name="type">
          <option value="1">Banned</option>
          <option value="2">Default</option>
          <option value="3">Editor</option>
          <option value="4">Admin</option>
          <option value="5">Super</option>
        </select>
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


export function AdminEditAuthorsContainer() {
  const [filters, setFilters] = useState<Parameters<typeof getAdminUsersEditors>[0]>({})
  const { loading, payload } = useQuery(getAdminUsersEditors(filters))

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const elements = event.currentTarget.elements as FormElements<"id" | "name" | "amount">

    setFilters({
      id: Number(elements.id.value),
      first_name: elements.name.value,
      page_size: Number(elements.amount.value)
    })
  }

  if (!payload || payload.error) return <>no content</>
  return (
    <AdminSectionLayout header={payload.results.length + " автором найдено"}>
      <AdminSearchFilters onSubmit={onSearch} pending={loading}>
        <input type="number" name="id" placeholder="id" />
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="amount" placeholder="amount" />
      </AdminSearchFilters>
      <br />
      <div className="edit-users">
        {payload.results.map(user => (
          <AdminEditUsersAuthor {...user} key={user.id} />
        ))}
      </div>
    </AdminSectionLayout>
  )
}

interface AdminEditUsersUserProps extends Client { }

function AdminEditUsersUser(props: AdminEditUsersUserProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="edit-user">
      <div className={classWithModifiers("edit-user__header", isOpen && "active")} onClick={() => setIsOpen(!isOpen)}>
        <img src={props.avatar} alt="avatar" className="edit-user__avatar" />
        <div className="edit-user__name">{props.first_name} {props.last_name}</div>
        <div className="edit-user__id">#{props.id}</div>
        <div className="edit-user__toggle">
          <Icon name="chevron" className={classWithModifiers("edit-user__icon", isOpen && "up")} />
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


interface AdminEditUsersAuthorProps {
  id: number
  first_name: string
  last_name: string
  email: string
  articles_count: number
}

function AdminEditUsersAuthor(props: AdminEditUsersAuthorProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="edit-user">
      <div className={classWithModifiers("edit-user__header", isOpen && "active")} onClick={() => setIsOpen(!isOpen)}>
        {/* <img src={props.avatar} alt="avatar" className="edit-user__avatar" /> */}
        <div className="edit-user__name">{props.first_name} {props.last_name}</div>
        <div className="edit-user__id">#{props.id}</div>
        <div className="edit-user__toggle">
          <Icon name="chevron" className={classWithModifiers("edit-user__icon", isOpen && "up")} />
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
              <span>Кол-во статей: </span>
              <span>{props.articles_count}</span>
            </div>
            <div className="edit-user-area__entry">
              <span>Средний рейтиг статей: </span>
              <span>NS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminEditUsersUserDangerZone(props: AdminEditUsersUserProps) {
  const user = useSelector(state => state.user)
  const [type, setType] = useState(props.type)
  function onChangeType() {
    if (!window.confirm("Вы уверены, что хотите изменить этого пользователя?")) return
    if (!window.confirm("Вы ТОЧНО уверены, что хотите изменить этого пользователя?")) return

    return ClientAPI.query(patchAdminUser(props.id, type))
  }
  function onBan() {
    if (!window.confirm("Вы уверены, что хотите забанить этого пользователя?")) return
    if (!window.confirm("Вы ТОЧНО уверены, что хотите забанить этого пользователя?")) return

    return ClientAPI.query(deleteAdminUser(props.id))
  }

  if (user.auth && (user.type <= props.type)) {
    return null
  }

  return (
    <div className="edit-user-area edit-user-area--danger">
      <div className="edit-user-area__title">Danger Zone</div>
      <div className="edit-user-area__actions">
        <div className="edit-user-area__action">
          <select className="edit-user-area__input" value={type} onChange={event => setType(Number(event.currentTarget.value))}>
            <option value="5">superuser</option>
            <option value="4">admin</option>
            <option value="3">editor</option>
            <option value="2">default</option>
            <option value="1" disabled>banned</option>
          </select>
          <AdminButton color="red" onClick={onChangeType}>Изменить роль</AdminButton>
          <AdminButton color="red" onClick={onBan}>Забанить</AdminButton>
        </div>
      </div>
    </div>
  )
}

export default AdminEditUsers
