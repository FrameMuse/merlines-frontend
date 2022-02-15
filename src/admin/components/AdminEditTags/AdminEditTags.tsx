// SCSS
import "./AdminEditTags.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminArticle, deleteAdminTag, getAdminArticles, patchAdminArticle, postAdminTag, putAdminTag } from "api/actions/admin"
import { getBlogArticles, getBlogTags } from "api/actions/blog"
import ClientAPI from "api/client"
import { BlogTagType } from "interfaces/Blog"
import { FormElements } from "interfaces/common"
import { OrderingType } from "interfaces/Django"
import { UserType } from "interfaces/user"
import { FormEvent, useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getFormElements } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"
import AdminSearchFilters from "../AdminSearchFilters/AdminSearchFilters"


function AdminEditTags() {
  const user = useSelector(state => state.user)
  const [activeTag, setActiveTag] = useState<BlogTagType>()
  const [tags, setTags] = useState<BlogTagType[]>([])
  const { error, payload } = useQuery(getBlogTags(1, 0))
  function addTag() {
    setTags([...tags, { id: 0, title: "НОВЫЙ ТЭГ" }])
  }
  function onChange(id: number, value: string | null, index: number) {
    if (!value?.length) {
      ClientAPI.query(deleteAdminTag(id))
        .then(({ error, status }) => {
          if (error || status !== 204) return

          setTags([...(tags.splice(index, 1), tags)])
          toast.info("Tag deleted!")
        })
      return
    }

    if (id === 0) {
      ClientAPI.query(postAdminTag(value))
        .then(({ error, payload }) => {
          if (error || !payload || payload.error) return

          setTags((tags[index] = payload, [...tags]))
          toast.info("Tag created!")
        })

      return
    }

    ClientAPI.query(putAdminTag(id, value))
      .then(({ error, payload }) => {
        if (error || !payload || payload.error) return

        toast.info("Tag updated!")
      })
  }
  useEffect(() => {
    if (!payload) return
    setTags(payload.results)
  }, [payload])
  if (error || !payload || payload.error) return <>no content</>
  return (
    <AdminSectionLayout header={tags.length + " Тэгов"}>
      <div className="edit-tags">
        {user.auth && user.type >= UserType.Admin && (
          <AdminButton className="edit-tags__button" onClick={addTag}>Добавить</AdminButton>
        )}
        <div className="edit-tags__inner">
          {tags.map((tag, index) => (
            <AdminEditableTag onClick={() => setActiveTag(tag)} onChange={value => onChange(tag.id, value, index)} key={tag.id}>{tag.title}</AdminEditableTag>
          ))}
        </div>
      </div>
      {activeTag && <TagArticles tag={activeTag} />}
    </AdminSectionLayout>
  )
}

function TagArticles(props: { tag: BlogTagType }) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const [filters, setFilters] = useState<Partial<{
    ordering?: OrderingType<"tags__contains" | "title__icontains" | "author_name" | "created_at" | "is_draft">

    tags__contains?: string
    title__icontains?: string
    author_name?: string
    created_at?: string
    is_draft?: boolean
  }>>({})
  const { error, loading, payload } = useQuery(getAdminArticles(page, pageSize, { tags__contains: props.tag.title, ...filters }))
  if (error) throw new Error()
  if (loading) return <>Loading...</>
  if (!payload) return <>no content</>
  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // const target = event.currentTarget
    // const elements = target.elements as FormElements<"author_name" | "created_at" | "is_draft">

    // setPage(1)
    // setFilters({
    //   author_name: elements.author_name.value || undefined,
    //   created_at: elements.created_at.value || undefined,
    //   is_draft: elements.is_draft.checked || undefined
    // })
  }
  return (
    <div className="edit-tags__container">
      <h2>#{props.tag.title.toUpperCase()}</h2>
      <div>
        <AdminSearchFilters onSubmit={onSearchSubmit}>
          <select onChange={event => setFilters({ ordering: event.currentTarget.value as any })}>
            <option value="author_name">Имя автора</option>
            <option value="created_at">Дата создания</option>
            <option value="is_draft">Черновик?</option>
          </select>
        </AdminSearchFilters>
      </div>
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
