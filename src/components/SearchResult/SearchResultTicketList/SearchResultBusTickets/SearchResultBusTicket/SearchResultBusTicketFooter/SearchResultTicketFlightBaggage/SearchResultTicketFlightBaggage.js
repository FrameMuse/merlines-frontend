import React from "react"

import Svg from "../../../../../../common/Svg"

const SearchResultTicketFlightBaggage = ({ flightBaggage, flightHandbags }) => {
  return (
    <>
      {flightBaggage || flightHandbags ? (
        <>
          <button className="ticket__btn ticket__btn--active" type="button">
            <Svg
              svgClass="ticket__btn-icon"
              svgName="baggage"
              svgWidth="20"
              svgHeight="20"
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
            <Svg
              svgClass="ticket__btn-icon"
              svgName="baggageLg"
              svgWidth="40"
              svgHeight="20"
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
