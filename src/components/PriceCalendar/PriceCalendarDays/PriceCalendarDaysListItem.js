import { Link } from "react-router-dom"
import { isPreviousDay } from "../../../utils"

function PriceCalendarDaysListItem({ date, price, betterPrice, notCurrent }) {
  const previousDay = isPreviousDay(date)

  return (
    <>
      {notCurrent ? (
        <Link to="#" className="days__card days__card--disabled">
          <span className="days__card-day"></span>
          <span className="days__card-price"></span>
        </Link>
      ) : (
        <>
          {previousDay ? (
            <Link to="#" className="days__card days__card--disabled">
              <span className="days__card-day">{date.day}</span>
              <span className="days__card-price">...</span>
            </Link>
          ) : (
            <Link
              to="#"
              className={`days__card ${
                price === betterPrice ? "days__card--current" : ""
              }`}
            >
              <span className="days__card-day">{date.day}</span>
              <span className="days__card-price">
                {price ? `от ${price} ₽` : "..."}
              </span>
            </Link>
          )}
        </>
      )}
      {
        // date && (date.day === 4 && <PriceCalendarDaysTicket />)
      }
    </>
  )
}

export default PriceCalendarDaysListItem
