import "./UserAvatar.scss"

import React from "react"

interface UserAvatarProps {
  avatar?: string
  firstName: string
  size?: "small"
}

function UserAvatar(props: UserAvatarProps) {
  return (
    <div className={["user-avatar", props.size ? `user-avatar--${props.size}` : ""].join(" ")}>
      {props.avatar ?
        <img src={props.avatar} alt="avatar" className="nav__link-image" /> :
        props.firstName.substring(0, 1)}
    </div>
  )
}

export default UserAvatar
