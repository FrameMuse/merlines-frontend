// SCSS
import "./AdminEditTags.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { FocusEvent, useEffect, useState } from "react"
import { classWithModifiers } from "utils"

import AdminButton from "../AdminButton/AdminButton"

function AdminEditTags() {
  const [tags, setTags] = useState<string[]>(["ПОДБОРКИ", "ГАЙДЫ", "СОВЕТЫ", "ГИД", "ВДОХНОВЕНИЯ", "СОБЫТИЯ", "FAQ"])
  function addTag() {
    setTags([...tags, "Новый Тэг"])
  }
  function removeTag(index: number) {
    console.log(index)
  }
  return (
    <AdminSectionLayout header={tags.length + " Тэгов"}>
      <div className="edit-tags">
        <AdminButton className="edit-tags__button" onClick={addTag}>Добавить</AdminButton>
        <div className="edit-tags__inner">
          {tags.map((tag, index) => (
            <AdminEditTagsTag tag={tag} onRemove={() => removeTag(index)} key={index} />
          ))}
        </div>
      </div>

    </AdminSectionLayout>
  )
}


interface AdminEditTagsTagProps {
  tag: string

  onRemove(): void
}

function AdminEditTagsTag(props: AdminEditTagsTagProps) {
  const [tag, setTag] = useState(props.tag)
  const [status, setStatus] = useState<"pending" | "saved" | "error" | null>(null)
  function onBlur(event: FocusEvent<HTMLSpanElement>) {
    const textContent = event.currentTarget.textContent || ""
    if (textContent === tag) return
    if (!textContent.length) {
      props.onRemove()
    }

    setStatus("pending")
    setTimeout(() => setStatus("saved"), 750)

    console.log(textContent)
    setTag(textContent)
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => setStatus(null), 2500)
    return () => clearTimeout(timeoutId)
  }, [status])
  if (!tag?.length) return null
  return (
    <span className={classWithModifiers("edit-tags__tag", status)} contentEditable onBlur={onBlur}>{tag}</span>
  )
}

export default AdminEditTags
