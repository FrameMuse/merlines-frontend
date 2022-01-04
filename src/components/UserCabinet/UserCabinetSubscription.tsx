import { useState } from "react"

import LkContentClearAll from "./LkContent/LkContentClearAll"
import UserCabinetContentRoute from "./LkContent/UserCabinetContentRoute"
import LkSwitcher from "./LkSwitcher"

function UserCabinetSubscription() {
  const [isActiveRoutes, setIsActiveRoutes] = useState()
  const [isActiveTickets, setIsActiveTickets] = useState()

  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title cabinet__title--history">Подписки</h2>
        <LkSwitcher
          setIsActiveRoutes={setIsActiveRoutes}
          setIsActiveTickets={setIsActiveTickets}
          subscribes
        />
        <LkContentClearAll subscribe />
      </div>
      {isActiveRoutes && (
        <div className="cabinet__col-list">
          <UserCabinetContentRoute />
          <UserCabinetContentRoute />
          <UserCabinetContentRoute />
        </div>
      )}
      {isActiveTickets && <div className="cabinet__col-list">Билеты</div>}
    </>
  )
}

export default UserCabinetSubscription
