import React from "react"

import Icon from "../../../../../common/Icon"

const SearchResultTicketFlightBaggage = ({ flightBaggage, flightHandbags }) => {
  return (
    <>
      {flightBaggage || flightHandbags ? (
        <>
          <button className="ticket__btn ticket__btn--active" type="button">
            <Icon
              className="ticket__btn-icon"
              name="baggage"
              width="20"
              height="20"
            />
            бесплатно
          </button>
          <button
            className={
              flightBaggage && flightHandbags !== ""
                ? "ticket__btn ticket__btn--active"
                : "ticket__btn"
            }
            type="button"
          >
            <Icon
              className="ticket__btn-icon"
              name="baggageLg"
              width="40"
              height="20"
            />
            {flightBaggage
              ? flightBaggage === ""
                ? "нет информации"
                : "багаж включен"
              : "багаж не включён"}
          </button>
        </>
      ) : null}
    </>
  )
}

export default SearchResultTicketFlightBaggage
