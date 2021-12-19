// SCSS
import "./AdminEditTags.style.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { useState } from "react"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"

function AdminEditTags() {
  const [tags, setTags] = useState<string[]>(["ПОДБОРКИ", "ГАЙДЫ", "СОВЕТЫ", "ГИД", "ВДОХНОВЕНИЯ", "СОБЫТИЯ", "FAQ"])
  function addTag() {
    setTags([...tags, "Новый Тэг"])
  }
  function onInput(value: string | null, index: number) {
    console.log(index)
  }
  return (
    <AdminSectionLayout header={tags.length + " Тэгов"}>
      <div className="edit-tags">
        <AdminButton className="edit-tags__button" onClick={addTag}>Добавить</AdminButton>
        <div className="edit-tags__inner">
          {tags.map((tag, index) => (
            <AdminEditableTag onInput={value => onInput(value, index)} key={index}>{tag}</AdminEditableTag>
          ))}
        </div>
      </div>

    </AdminSectionLayout>
  )
}

export default AdminEditTags
