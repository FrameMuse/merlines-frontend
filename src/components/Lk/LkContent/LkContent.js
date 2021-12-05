import { useLocation } from "react-router-dom"

import routes from "../../../routes"
import LkFavourites from "../LkFavourites/LkFavourites"
import LkFeedback from "../LkFeedback/LkFeedback"
import LkHistory from "../LkHistory/LkHistory"
import LkProfileEdit from "../LkProfileEdit/LkProfileEdit"
import LkSubscription from "../LkSubscription/LkSubscription"

function LkContent() {
  const path = useLocation().pathname

  return (
    <div className="cabinet__col cabinet__col--content">
      {path === routes.lk.base && <LkFavourites />}
      {path === routes.lk.history && <LkHistory />}
      {path === routes.lk.subscribes && <LkSubscription />}
      {path === routes.lk.question && <LkFeedback />}
      {path === routes.lk.edit && <LkProfileEdit />}
    </div>
  )
}

export default LkContent
