import Icon from "components/common/Icon"
import { classWithModifiers } from "utils"


interface SearchResultTicketFlightBaggageProps {
  flightBaggage: string
  flightHandbags: string
}

function SearchResultTicketFlightBaggage(props: SearchResultTicketFlightBaggageProps) {
  if (!props.flightBaggage || !props.flightHandbags) return <>no content</>
  return (
    <>
      <button className="ticket__btn ticket__btn--active" type="button">
        <Icon name="baggage" className="ticket__icon" />
        бесплатно
      </button>
      <button className={classWithModifiers("ticket__btn", !!props.flightHandbags && "active")} type="button">
        <Icon name="baggageLg" className="ticket__icon" />
        {props.flightBaggage ? "багаж включен" : "багаж не включён"}
      </button>
    </>
  )
}

export default SearchResultTicketFlightBaggage
