import "./EditAvatar.scss"

import Icon from "components/common/Icon"
import { ChangeEvent, ReactNode, useState } from "react"
import { classWithModifiers } from "utils"

interface EditAvatarProps {
  name?: string
  image?: string
  children?: ReactNode
  onChange?(file: File, objectUrl: string): void | Promise<unknown>
}

function EditAvatar(props: EditAvatarProps) {
  const [pending, setPending] = useState(false)
  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    // checks
    const files = target.files
    if (files === null) return
    const file = files[0] as File | undefined
    if (file == null) return
    // awaits
    if (props.onChange) {
      setPending(true)
      await props.onChange?.(file, URL.createObjectURL(file))
      setPending(false)
    }
  }
  return (
    <div className={classWithModifiers("edit-avatar", pending && "pending")}>
      {props.children || (
        <img src={props.image} alt="avatar" className="edit-avatar__image" />
      )}
      <label className="edit-avatar__cover">
        <Icon className="edit-avatar__icon" name="edit" />
        <input className="edit-avatar__input" name={props.name} type="file" accept="image/*" onChange={onChange} aria-hidden={false} />
      </label>
    </div>
  )
}

export default EditAvatar
