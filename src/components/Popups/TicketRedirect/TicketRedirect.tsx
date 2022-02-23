import "./TicketRedirect.scss"

import { Link } from "react-router-dom"

import Icon from "../../common/Icon"

function TicketRedirect() {
  return (
    <section className="transfer overlay">
      <div className="transfer__container">
        <div className="transfer__content">
          <Icon className="transfer__loading" name="loading" />
          <p className="transfer__text">
            Немного терпения, переходим на сайт
            {" "}
            <Link className="transfer__link" to="#">
              {/* {searchResultData.ticketDilerName} */}
            </Link>
          </p>
          <Link className="transfer__logo" to="#">
            Лого перевозчика
            <img src="images/partners/mego-sm.png" alt="Mego travel" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TicketRedirect
