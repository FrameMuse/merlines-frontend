import "./AdminBlogMailing.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import Icon from "components/common/Icon"
import { useState } from "react"
import { capitalize, classWithModifiers } from "utils"

import AdminButton from "../AdminButton/AdminButton"


const mockEntry: AdminBlogMailingEntryProps = {
  id: 1,
  title: "Призы на Новый Год каждому!",
  status: "canceled",
  content: "контент контент контент контент контент контент контент контент контент контент контент контент контент контент контент контент контент контент "
}

function AdminBlogMailing() {
  const entries = new Array(56).fill(mockEntry).map((entry, index) => ({ ...entry, id: index + 1, status: (index % 2 === 0) ? "done" : (index % 3 === 0) ? "canceled" : "running" }))
  return (
    <AdminSectionLayout header="Рассылка">
      <div className="blog-mailing">
        <div>
          <AdminButton>Создать рассылку</AdminButton>
        </div>
        <div className="blog-mailing__entries">
          {entries.map(entry => (
            <AdminBlogMailingEntry {...entry} key={entry.id} />
          ))}
        </div>
      </div>
    </AdminSectionLayout>
  )
}


interface AdminBlogMailingEntryProps {
  id: number
  title: string
  status: "running" | "done" | "canceled"

  content: string
}

function AdminBlogMailingEntry(props: AdminBlogMailingEntryProps) {
  const [active, setActive] = useState(false)
  return (
    <div className="blog-mailing-entry" onClick={() => setActive(!active)}>
      <div className={classWithModifiers("blog-mailing-entry__header", active && "active")}>
        <div className="blog-mailing-entry__title">
          {props.title}
          <span className="blog-mailing-entry__weak">ID{props.id}</span>
        </div>

        <div className={classWithModifiers("blog-mailing-entry__status", props.status)}>{capitalize(props.status)}</div>
        <div className="blog-mailing-entry__toggle">
          <Icon name="arrow-angle" className={classWithModifiers("blog-mailing-entry__icon", active && "up")} />
        </div>
      </div>
      <div className={classWithModifiers("blog-mailing-entry__body", active && "active")}>
        <h4 className="blog-mailing-entry__title">Детализация</h4>
        <div className="blog-mailing-entry__details">123</div>

        <h4 className="blog-mailing-entry__title">Содержание</h4>
        <p className="blog-mailing-entry__content">{props.content}</p>
      </div>
    </div>
  )
}

export default AdminBlogMailing
