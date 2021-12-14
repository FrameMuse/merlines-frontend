import "./AdminButton.style.scss"

import { MouseEventHandler } from "react"
import { classMerge, classWithModifiers } from "utils"


interface AdminButtonProps {
  children: any
  className?: string

  onClick: MouseEventHandler
}

function AdminButton(props: AdminButtonProps) {
  return (
    <button className={classMerge(classWithModifiers("admin-button"), props.className)} type="button" onClick={props.onClick}>{props.children}</button>
  )
}

export default AdminButton
