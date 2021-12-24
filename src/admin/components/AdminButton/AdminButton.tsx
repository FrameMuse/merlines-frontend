import "./AdminButton.style.scss"

import { MouseEvent, useEffect } from "react"
import { classMerge, classWithModifiers, usePending } from "utils"


interface AdminButtonProps {
  color?: "red" | "gray"
  className?: string
  children: any

  type?: "button" | "submit" | "reset"
  pending?: boolean
  disabled?: boolean

  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<unknown> | void
}

function AdminButton(props: AdminButtonProps) {
  const [pending, onClick, setPending] = usePending(props.onClick)
  useEffect(() => {
    if (props.pending != null) setPending(props.pending)
  }, [props.pending])
  return (
    <button className={classMerge(classWithModifiers("admin-button", props.color), props.className)} type={props.type || "button"} onClick={onClick} disabled={pending || props.disabled}>
      {pending ? "Pending..." : props.children}
    </button>
  )
}

export default AdminButton
