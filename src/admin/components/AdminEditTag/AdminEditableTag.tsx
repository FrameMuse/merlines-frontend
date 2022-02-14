// SCSS
import "./AdminEditTag.style.scss"

import { UserType } from "interfaces/user"
import { Dispatch, FocusEvent, MouseEventHandler, useState } from "react"
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
  function onBlur(event: FocusEvent<HTMLSpanElement>) {
    const textContent = event.currentTarget.textContent || ""

    if (textContent === tag) return
    if (!user.auth || user.type < UserType.Admin) return

    setTag(textContent)
    props.onChange(textContent)
  }
  return (
    <span className={classWithModifiers("editable-tag", tag.toUpperCase() === "ПОДБОРКИ" && "important")} contentEditable={user.auth && user.type >= UserType.Admin} onClick={props.onClick} onBlur={onBlur}>{tag}</span>
  )
}

export default AdminEditableTag
