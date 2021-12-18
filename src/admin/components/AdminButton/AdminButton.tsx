import "./AdminButton.style.scss"

import { MouseEvent, useState } from "react"
import { classMerge, classWithModifiers } from "utils"


interface AdminButtonProps {
  color?: "red" | "gray"
  className?: string
  children: any

  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<unknown> | void
}

function AdminButton(props: AdminButtonProps) {
  const [pending, setPending] = useState(false)
  async function onClick(event: MouseEvent<HTMLButtonElement>) {
    setPending(true)
    await props.onClick?.(event)
    setPending(false)
  }
  return (
    <button className={classMerge(classWithModifiers("admin-button", props.color, pending && "pending"), props.className)} type="button" onClick={onClick} disabled={pending}>
      {pending ? "Pending..." : props.children}
    </button>
  )
}

export default AdminButton
