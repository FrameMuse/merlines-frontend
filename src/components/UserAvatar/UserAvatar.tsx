import "./UserAvatar.scss"

import React from "react"

interface props {
  avatar: string
  firstName: string
  size?:"small"
}

const UserAvatar: React.FC<props> = ({avatar, firstName, size}) => {
  return (
    <div className={["user-avatar", size ? `user-avatar--${size}` : ""].join(" ")}>
      {avatar ? <img src={avatar} alt="avatar" className="nav__link-image"/> : firstName.substring(0, 1)}
    </div>
  )
}

export default UserAvatar
