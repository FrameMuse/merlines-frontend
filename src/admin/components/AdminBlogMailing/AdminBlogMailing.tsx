import "./AdminBlogMailing.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminMailing, getAdminMailing, getAdminMailings, patchAdminMailing, postAdminMailings, postAdminMailingStart, postAdminMailingStop } from "api/actions/admin"
import ClientAPI from "api/client"
import Icon from "components/common/Icon"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { toast, ToastContainer } from "react-toastify"
import { classWithModifiers } from "utils"


export interface MailingType {
  id: number
  subject: string
  content: string
  is_running: boolean
}

import AdminButton from "../AdminButton/AdminButton"

function AdminBlogMailing() {
  const [createNew, setCreateNew] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
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
      <ToastContainer />
    </AdminSectionLayout>
  )
}



interface AdminBlogMailingEntryProps extends Omit<MailingType, "content"> { }

function AdminBlogMailingEntry(props: AdminBlogMailingEntryProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="blog-mailing-entry">
      <div className={classWithModifiers("blog-mailing-entry__header", expanded && "active")} onClick={() => setExpanded(!expanded)}>
        <div className="blog-mailing-entry__title">
          {props.subject}
          <span className="blog-mailing-entry__weak">ID{props.id}</span>
        </div>
        <div className={classWithModifiers("blog-mailing-entry__status", props.is_running && "running")}>{props.is_running ? "Рассылается" : "Приостановлена"}</div>
        <div className="blog-mailing-entry__toggle">
          <Icon name="chevron" className={classWithModifiers("blog-mailing-entry__icon", expanded && "up")} />
        </div>
      </div>
      {expanded && (
        <AdminBlogMailingEntryBody id={props.id} />
      )}
    </div>
  )
}


interface AdminBlogMailingEntryBodyProps {
  id: number
}

function AdminBlogMailingEntryBody(props: AdminBlogMailingEntryBodyProps) {
  const { error, loading, payload } = useQuery(getAdminMailing(props.id))
  const [deleted, setDeleted] = useState(false)
  const [subject, setSubject] = useState<string>()
  const [content, setContent] = useState<string>()

  if (deleted) return null

  if (error) throw new Error("AdminBlogMailingEntryError")
  if (loading) return <>Loading...</>
  if (!payload) return <>No content</>

  function sendMailing() {
    ClientAPI
      .query(postAdminMailingStart(props.id))
      .then(({ error }) => {
        if (error) return
        toast.info("Mailing started!")
      })
  }
  function suspendMailing() {
    ClientAPI
      .query(postAdminMailingStop(props.id))
      .then(({ error }) => {
        if (error) return
        toast.info("Mailing suspended!")
      })
  }
  function saveMailing() {
    ClientAPI
      .query(patchAdminMailing(props.id, { subject, content }))
      .then(({ error }) => {
        if (error) return
        toast.info("Mailing saved!")
      })
  }
  function deleteMailing() {
    ClientAPI
      .query(deleteAdminMailing(props.id))
      .then(({ error }) => {
        if (error) return
        toast.info("Mailing deleted!")
        setDeleted(true)
      })
  }

  return (
    <div className="blog-mailing-entry__body">
      <div className="blog-mailing-entry__group">
        <h4 className="blog-mailing-entry__title">Тема</h4>
        <input type="text" className="blog-mailing-entry__input" defaultValue={payload.subject} onChange={event => setSubject(event.currentTarget.value)} />
      </div>

      <div className="blog-mailing-entry__group">
        <h4 className="blog-mailing-entry__title">Содержание</h4>
        <textarea className="blog-mailing-entry__textarea" defaultValue={payload.content} onChange={event => setContent(event.currentTarget.value)} />
      </div>
      {/* <div className="blog-mailing-entry__group">
        <h4 className="blog-mailing-entry__title">Ифнормация</h4>
        <ul>
          <li>Статус: {payload.is_running ? "рассылается" : "приостановлен"}</li>
        </ul>
      </div> */}
      <div className="blog-mailing-entry__buttons">
        <AdminButton onClick={sendMailing}>Разослать</AdminButton>
        <AdminButton onClick={suspendMailing}>Приостановить</AdminButton>
        <AdminButton onClick={saveMailing}>Сохранить</AdminButton>
        <AdminButton onClick={deleteMailing}>Удалить</AdminButton>
      </div>
    </div>
  )
}

function AdminBlogMailingCreateEntry() {
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  function onSubmit() {
    return ClientAPI
      .query(postAdminMailings(subject, content))
      .then(({ error }) => {
        if (error) return
        toast.info("Mailing created")
      })
  }
  return (
    <div className="blog-mailing-entry">
      <div className={classWithModifiers("blog-mailing-entry__header", "active")}>
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
        <div className="blog-mailing-entry__buttons">
          <AdminButton onClick={onSubmit}>Создать</AdminButton>
        </div>
      </div>
    </div>
  )
}

export default AdminBlogMailing
