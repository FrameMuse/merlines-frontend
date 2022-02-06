// SCSS
import "./AdminEditTags.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminArticle, getAdminArticles, patchAdminArticle } from "api/actions/admin"
import { getBlogArticles, getBlogTags } from "api/actions/blog"
import ClientAPI from "api/client"
import { BlogTagType } from "interfaces/Blog"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"

import AdminButton from "../AdminButton/AdminButton"


function AdminEditTags() {
  const [activeTag, setActiveTag] = useState<BlogTagType | null>(null)
  const { error, payload } = useQuery(getBlogTags(1, 0))
  if (error || !payload) return <>no content</>
  const tags = payload.results
  return (
    <AdminSectionLayout header={tags.length + " Тэгов"}>
      <div className="edit-tags">
        <div className="edit-tags__inner">
          {tags.map((tag, index) => (
            <span className="editable-tag" onClick={() => setActiveTag(tag)} key={index}>{tag.title}</span>
          ))}
        </div>
        {activeTag && <TagArticles tag={activeTag} />}
      </div>

    </AdminSectionLayout>
  )
}

function TagArticles(props: { tag: BlogTagType }) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const { error, loading, payload } = useQuery(getAdminArticles(page, pageSize, { tags__contains: props.tag.title }))
  if (error) throw new Error()
  if (loading) return <>Loading...</>
  if (!payload) return <>no content</>
  return (
    <div className="edit-tags__container">
      <h2>#{props.tag.title.toUpperCase()}</h2>

      {payload.results.map(article => (
        <TagArticle {...article} key={article.id} />
      ))}
      {(page * pageSize) < payload.count && (
        <AdminButton onClick={() => setPage(page + 1)}>More</AdminButton>
      )}
    </div>
  )
}


export interface TagArticleProps {
  id: number
  title: string
  author: {
    id: number
    first_name: string
    last_name: string
  }
  created_at: string
  comments_count: number
  deleted_comments_count: number
  is_draft: boolean
}

function TagArticle(props: TagArticleProps) {
  const history = useHistory()
  const [hidden, setHidden] = useState(true)
  const [deleted, setDeleted] = useState(false)
  const [isDraft, setIsDraft] = useState(props.is_draft)
  function publishArticle() {
    ClientAPI
      .query(patchAdminArticle(props.id, {}, false))
      .then(({ error }) => {
        if (error) return
        toast.info("Article published!")
        setIsDraft(false)
      })
  }
  function deleteArticle() {
    ClientAPI
      .query(deleteAdminArticle(props.id))
      .then(({ error }) => {
        if (error) return
        toast.info("Article deleted!")
        setDeleted(true)
      })
  }
  if (deleted) return null
  return (
    <section className="admin-section-layout">
      <h3 className="admin-section-layout__header" onClick={() => setHidden(!hidden)}>{props.title}</h3>
      {!hidden && (
        <div className="admin-section-layout__container">
          Автор: <b>{props.author.first_name} {props.author.last_name}</b> <br /><br />
          Время создания: <b>{new Date(props.created_at).toLocaleString("ru")}</b> <br /><br />
          Статус: <b>{isDraft ? "Черновик" : "Опубликована"}</b> <br /><br />
          Комментарии: <b>{props.comments_count} | <span className="red">{props.deleted_comments_count}</span></b> <br /><br />

          <br /><br /><br />

          <AdminButton onClick={() => history.push("/admin/edit-article/" + props.id)}>Редактировать статью</AdminButton><br /><br />
          <AdminButton onClick={publishArticle}>Опубликовать статью</AdminButton><br /><br />
          <AdminButton onClick={deleteArticle}>Удалить статью</AdminButton>
        </div>
      )}
    </section>
  )
}

export default AdminEditTags
