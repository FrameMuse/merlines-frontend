import { useState } from "react"

import UserCabinetSwitcher from "../UserCabinetSwitcher"

function UserCabinetSubscription() {
  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title cabinet__title--history">Подписки</h2>
        <UserCabinetSwitcher basename="/user/subscribes" />
        {/* <LkContentClearAll subscribe /> */}
      </div>
      {/* {isActiveRoutes && (
        <div className="cabinet__col-list">
          <UserCabinetContentRoute />
          <UserCabinetContentRoute />
          <UserCabinetContentRoute />
        </div>
      )}
      {isActiveTickets && <div className="cabinet__col-list">Билеты</div>} */}
    </>
  )
}

export default UserCabinetSubscription
