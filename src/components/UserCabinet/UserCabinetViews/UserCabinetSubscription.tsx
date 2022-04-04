import {useEffect} from "react"
import {Route, Switch, useHistory} from "react-router-dom"

import UserCabinetSwitcher from "../UserCabinetSwitcher"
import UserCabinetSubscribedQueries from "./UserCabinetSubscribedQueries"
import UserCabinetSubscribedTickets from "./UserCabinetSubscribedTickets"

function UserCabinetSubscription() {
  const {replace, location} = useHistory()

  useEffect(() => {
    replace(location.pathname + "/routes")
  }, [])

  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title cabinet__title--history">Подписки</h2>
        <UserCabinetSwitcher basename="/user/subscribes" />
        {/* <LkContentClearAll subscribe /> */}
      </div>
      <div className={"cabinet__col cabinet__col--content"}>
        <Switch>
          <Route path="/user/subscribes/routes"><UserCabinetSubscribedQueries/></Route>
          <Route path="/user/subscribes/tickets"><UserCabinetSubscribedTickets/></Route>
        </Switch>
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
