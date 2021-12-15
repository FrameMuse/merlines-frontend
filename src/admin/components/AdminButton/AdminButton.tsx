import "./AdminButton.style.scss"

import { MouseEventHandler } from "react"
import { classMerge, classWithModifiers } from "utils"


interface AdminButtonProps {
  color?: "red" | "gray"
  className?: string
  children: any

  onClick?: MouseEventHandler
}

function AdminButton(props: AdminButtonProps) {
  return (
    <button className={classMerge(classWithModifiers("admin-button", props.color), props.className)} type="button" onClick={props.onClick}>{props.children}</button>
  )
}

export default AdminButton
