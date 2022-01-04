import { Route, Switch } from "react-router-dom"

import LkHistory from "../LkHistory"
import LkProfileEdit from "../LkProfileEdit"
import UserCabinetFavourites from "../UserCabinetFavourites"
import UserCabinetFeedback from "../UserCabinetFeedback"
import UserCabinetSubscription from "../UserCabinetSubscription"

function UserCabinetContent() {
  return (
    <div className="cabinet__col cabinet__col--content">
      <Switch>
        <Route path="/user"><UserCabinetFavourites /></Route>
        <Route path="/user/history"><LkHistory /></Route>
        <Route path="/user/subscribes"><UserCabinetSubscription /></Route>
        <Route path="/user/question"><UserCabinetFeedback /></Route>
        <Route path="/user/edit"><LkProfileEdit /></Route>
      </Switch>
    </div>
  )
}

export default UserCabinetContent
