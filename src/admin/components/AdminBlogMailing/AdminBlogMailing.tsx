import "./AdminBlogMailing.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { getAdminMailings, postAdminMailings } from "api/actions/admin"
import Icon from "components/common/Icon"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { toast } from "react-toastify"
import { capitalize, classWithModifiers } from "utils"

import ClientAPI from "../../../api/client"
import AdminButton from "../AdminButton/AdminButton"


export interface MailingEntryType {
  id: number
  title: string
  subject: string
  content: string
}

function AdminBlogMailing() {
  const [createNew, setCreateNew] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const { error, payload } = useQuery(getAdminMailings(page, pageSize))
  if (error || !payload || payload.error) return <>no content</>
  return (
    <AdminSectionLayout header="Рассылка">
      <div className="blog-mailing">
        <div>
          <AdminButton onClick={() => setCreateNew(!createNew)}>Создать рассылку</AdminButton>
        </div>
        {createNew && (
          <div>
            <AdminBlogMailingCreateEntry />
          </div>
        )}
        <div className="blog-mailing__entries">
          {payload.results.map(entry => (
            <AdminBlogMailingEntry {...entry} key={entry.id} />
          ))}
        </div>
        {(page * pageSize) < payload.count && (
          <div>
            <AdminButton onClick={() => setPage(page + 1)}>Ещё</AdminButton>
          </div>
        )}
      </div>
    </AdminSectionLayout>
  )
}


function AdminBlogMailingEntry(props: MailingEntryType) {
  const [active, setActive] = useState(false)
  return (
    <div className="blog-mailing-entry" onClick={() => setActive(!active)}>
      <div className={classWithModifiers("blog-mailing-entry__header", active && "active")}>
        <div className="blog-mailing-entry__title">
          {props.title}
          <span className="blog-mailing-entry__weak">ID{props.id}</span>
        </div>

        {/* <div className={classWithModifiers("blog-mailing-entry__status", props.status)}>{capitalize(props.status)}</div> */}
        <div className="blog-mailing-entry__toggle">
          <Icon name="arrow-angle" className={classWithModifiers("blog-mailing-entry__icon", active && "up")} />
        </div>
      </div>
      <div className={classWithModifiers("blog-mailing-entry__body", active && "active")}>
        {/* <h4 className="blog-mailing-entry__title">Детализация</h4>
        <div className="blog-mailing-entry__details">123</div> */}

        <h4 className="blog-mailing-entry__title">Содержание</h4>
        <p className="blog-mailing-entry__content">{props.content}</p>
      </div>
    </div>
  )
}

function AdminBlogMailingCreateEntry() {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  function onSubmit() {
    return ClientAPI
      .query(postAdminMailings(title, subject, content))
      .then(({ error }) => {
        if (error) return
        toast.info("Mailing created")
      })
  }
  return (
    <div className="blog-mailing-entry">
      <div className={classWithModifiers("blog-mailing-entry__header", "active")}>
        <div className="blog-mailing-entry__title">
          <input type="text" className="blog-mailing-entry__input" onChange={event => setTitle(event.currentTarget.value)} />
        </div>
      </div>
      <div className={classWithModifiers("blog-mailing-entry__body", "active")}>
        <div className="blog-mailing-entry__group">
          <h4 className="blog-mailing-entry__title">Тема</h4>
          <input type="text" className="blog-mailing-entry__input" onChange={event => setSubject(event.currentTarget.value)} />
        </div>

        <div className="blog-mailing-entry__group">
          <h4 className="blog-mailing-entry__title">Содержание</h4>
          <textarea className="blog-mailing-entry__textarea" onChange={event => setContent(event.currentTarget.value)} />
        </div>
        <div><AdminButton onClick={onSubmit}>Разослать</AdminButton></div>
      </div>
    </div>
  )
}

export default AdminBlogMailing
