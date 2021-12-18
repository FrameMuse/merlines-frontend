// SCSS
import "./AdminEditTag.style.scss"

import { Dispatch, FocusEvent, useState } from "react"
import { classWithModifiers } from "utils"

interface AdminEditableTagProps {
  children: string
  onInput: Dispatch<string>
}

function AdminEditableTag(props: AdminEditableTagProps) {
  const [tag, setTag] = useState(props.children)
  function onBlur(event: FocusEvent<HTMLSpanElement>) {
    const textContent = event.currentTarget.textContent || ""
    if (textContent === tag) return

    setTag(textContent)
    props.onInput(textContent ?? null)
  }
  return (
    <span className={classWithModifiers("editable-tag")} contentEditable onBlur={onBlur}>{tag}</span>
  )
}

export default AdminEditableTag
