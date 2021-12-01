import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Svg from "../../common/Svg"
import "./trasfer.scss"
import { selectSearchResult } from "../../../reducers/searchResultSlice"

function TicketRedirect() {
  const searchResultData = useSelector(selectSearchResult)

  return (
    <section className="transfer overlay">
      <div className="transfer__container">
        <div className="transfer__content">
          <Svg
            svgClass="transfer__loading"
            svgName="loading"
            svgWidth="32"
            svgHeight="32"
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
