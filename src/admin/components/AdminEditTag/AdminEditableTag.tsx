// SCSS
import "./AdminEditTag.style.scss"

import { UserType } from "interfaces/user"
import { Dispatch, MouseEventHandler, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils"

interface AdminEditableTagProps {
  children: string
  onClick?: MouseEventHandler<HTMLSpanElement>
  onChange: Dispatch<string>
}

function AdminEditableTag(props: AdminEditableTagProps) {
  const user = useSelector(state => state.user)
  const [tag, setTag] = useState(props.children)
  const prevTag = useRef(tag)
  function onBlur() {
    if (!user.auth || user.type < UserType.Admin) return

    const tagsDatalist = document.getElementById("tags-datalist") as HTMLDListElement | null
    if (tagsDatalist != null && tag.length > 0) {
      const isNoOccurs = [...tagsDatalist.children].every(option => !(option instanceof HTMLOptionElement) || option.value !== tag)
      if (isNoOccurs) {
        alert("Нету такого тэга")
        setTag("")

        return
      }
    }

    if (prevTag.current === tag) return

    props.onChange(tag)
    prevTag.current = tag
  }

  return (
    <div className={classWithModifiers("editable-tag", tag.toUpperCase() === "ПОДБОРКИ" && "important")}>
      <input
        className="editable-tag__input"
        disabled={!user.auth || user.type < UserType.Admin}
        list="tags-datalist"
        required
        value={tag}
        onChange={event => setTag(event.currentTarget.value)} onBlur={onBlur}
      />
    </div>
  )

  // return (
  //   <span className={classWithModifiers("editable-tag", tag.toUpperCase() === "ПОДБОРКИ" && "important")} contentEditable={user.auth && user.type >= UserType.Admin} onClick={props.onClick} onBlur={onBlur}>{tag}</span>
  // )
}

export default AdminEditableTag
