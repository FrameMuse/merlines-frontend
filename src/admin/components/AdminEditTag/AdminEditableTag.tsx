// SCSS
import "./AdminEditTag.style.scss"

import { Dispatch, FocusEvent, MouseEventHandler, useState } from "react"
import { classWithModifiers } from "utils"

interface AdminEditableTagProps {
  children: string
  onClick?: MouseEventHandler<HTMLSpanElement>
  onChange: Dispatch<string>
}

function AdminEditableTag(props: AdminEditableTagProps) {
  const [tag, setTag] = useState(props.children)
  function onBlur(event: FocusEvent<HTMLSpanElement>) {
    const textContent = event.currentTarget.textContent || ""
    if (textContent === tag) return

    setTag(textContent)
    props.onChange(textContent)
  }
  return (
    <span className={classWithModifiers("editable-tag", tag.toUpperCase() === "ПОДБОРКИ" && "important")} contentEditable onClick={props.onClick} onBlur={onBlur}>{tag}</span>
  )
}

export default AdminEditableTag
