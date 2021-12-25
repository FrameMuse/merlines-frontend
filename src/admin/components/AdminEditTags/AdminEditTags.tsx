// SCSS
import "./AdminEditTags.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminTag, getAdminTags, postAdminTag, putAdminTag } from "api/actions/admin"
import { useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { toast } from "react-toastify"

import ClientAPI from "../../../api/client"
import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"


export interface AdminTagType {
  id: number
  title: string
}

const a = ["ПОДБОРКИ", "ГАЙДЫ", "СОВЕТЫ", "ГИД", "ВДОХНОВЕНИЯ", "СОБЫТИЯ", "FAQ"]
function AdminEditTags() {
  const [tags, setTags] = useState<AdminTagType[]>([])
  const { error, payload } = useQuery(getAdminTags(1, 0))
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
        <AdminButton className="edit-tags__button" onClick={addTag}>Добавить</AdminButton>
        <div className="edit-tags__inner">
          {tags.map((tag, index) => (
            <AdminEditableTag onChange={value => onChange(tag.id, value, index)} key={tag.id}>{tag.title}</AdminEditableTag>
          ))}
        </div>
      </div>

    </AdminSectionLayout>
  )
}

export default AdminEditTags
