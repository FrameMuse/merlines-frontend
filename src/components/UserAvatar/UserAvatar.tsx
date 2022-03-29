import "./UserAvatar.scss"

import React from "react"

interface props {
  avatar: string
  firstName: string
}

const UserAvatar: React.FC<props> = ({avatar, firstName}) => {
  return (
    <>
      {avatar ? <img src={avatar} alt="avatar" className="nav__link-image"/> :
        <div className={"user-avatar__placeholder"}>
          {firstName.substring(0, 1)}
        </div>
      }
    </>
  )
}

export default UserAvatar
