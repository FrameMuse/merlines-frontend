import { useState } from "react"
import LkSwitcher from "../LkSwitcher"

function LkFavourites() {
  const [isActiveRoutes, setIsActiveRoutes] = useState()
  const [isActiveTickets, setIsActiveTickets] = useState()

  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title">Подписки</h2>
        <LkSwitcher
          setIsActiveRoutes={setIsActiveRoutes}
          setIsActiveTickets={setIsActiveTickets}
        />
      </div>
      <div className="cabinet__empty cabinet__empty--subscription">
        {isActiveRoutes && (
          <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
        )}
        {isActiveTickets && (
          <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
        )}
      </div>
    </>
  )
}

export default LkFavourites
