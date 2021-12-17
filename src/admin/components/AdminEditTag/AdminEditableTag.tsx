// SCSS
import "./AdminEditTag.style.scss"

import { Dispatch, FocusEvent, useEffect, useState } from "react"
import { classWithModifiers } from "utils"

interface AdminEditableTagProps {
  children: string
  onInput: Dispatch<string | null>
}

function AdminEditableTag(props: AdminEditableTagProps) {
  const [tag, setTag] = useState(props.children)
  function onBlur(event: FocusEvent<HTMLSpanElement>) {
    const textContent = event.currentTarget.textContent || ""
    if (textContent === tag) return

    setTag(textContent)
    props.onInput(textContent)
  }
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => setStatus(null), 2500)
  //   return () => clearTimeout(timeoutId)
  // }, [status])
  return (
    <span className={classWithModifiers("editable-tag")} contentEditable onBlur={onBlur}>{tag}</span>
  )
}

export default AdminEditableTag
