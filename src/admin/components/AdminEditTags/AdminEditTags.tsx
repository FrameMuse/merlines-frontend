// SCSS
import "./AdminEditTags.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminTag, postAdminTag, putAdminTag } from "api/actions/admin"
import { getBlogTags } from "api/actions/blog"
import ClientAPI from "api/client"
import { BlogTagType } from "interfaces/Blog"
import { UserType } from "interfaces/user"
import { Dispatch, useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"


interface AdminEditTagsProps {
  selected?: BlogTagType | null
  onSelect?: Dispatch<BlogTagType | null>
}

function AdminEditTags(props: AdminEditTagsProps) {
  const user = useSelector(state => state.user)
  const [tags, setTags] = useState<BlogTagType[]>([])
  const { error, payload } = useQuery(getBlogTags(1, 0))
  function addTag() {
    setTags([...tags, { id: 0, title: "НОВЫЙ ТЭГ" }])
  }
  function onChange(id: number, value: string | null, index: number) {
    if (!value?.length) {
      if (!window.confirm("Удалить тэг?")) return
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
        <div>
          {user.auth && user.type >= UserType.Admin && (
            <AdminButton className="edit-tags__button" onClick={addTag}>Добавить</AdminButton>
          )}
          <AdminButton onClick={() => props.onSelect?.(null)}>Сбросить выделение</AdminButton>
        </div>
        <div className="edit-tags__inner">
          {tags.map((tag, index) => (
            <AdminEditableTag selected={props.selected === tag} onFocus={() => props.onSelect?.(tag)} onChange={value => onChange(tag.id, value, index)} key={tag.id}>{tag.title}</AdminEditableTag>
          ))}
        </div>
      </div>
    </AdminSectionLayout>
  )
}

export interface AdminArticleType {
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

export default AdminEditTags
