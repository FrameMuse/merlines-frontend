import "./trasfer.scss"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { selectSearchResult } from "../../../reducers/searchResultSlice"
import Icon from "../../common/Icon"

function TicketRedirect() {
  const searchResultData = useSelector(selectSearchResult)

  return (
    <section className="transfer overlay">
      <div className="transfer__container">
        <div className="transfer__content">
          <Icon
            className="transfer__loading"
            name="loading"
            width="32"
            height="32"
          />
          <p className="transfer__text">
            Немного терпения, переходим на сайт{" "}
            <Link className="transfer__link" to="#">
              {searchResultData.ticketDilerName}
            </Link>
          </p>
          <Link className="transfer__logo" to="#">
            Лого перевозчика
            {/* <img src="images/partners/mego-sm.png" alt="Mego travel" /> */}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TicketRedirect
