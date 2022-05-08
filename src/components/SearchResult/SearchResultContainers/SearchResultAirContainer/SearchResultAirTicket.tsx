import Ticket from "components/Ticket/Ticket"
import { AirTicketType } from "interfaces/Search"

import { getAgentLogo, getAirlineLogo } from "./helpers"


interface SearchResultAirTicketProps extends AirTicketType { }

function SearchResultAirTicket(props: SearchResultAirTicketProps) {
  return (
    <Ticket
      id={props.id}
      isFavourite={props.is_favorite}
      isTracked={props.is_tracked}
      logos={[...new Set(props.trips.flatMap(trip => trip.segments.map(seg => getAirlineLogo(seg.marketing_airline.code))))]}
      price={props.best_offer.price}
      baggagePrice={props.price_with_baggage}
      timelines={props.trips.map(trip => ({
        departureDate: new Date(trip.start_time),
        arrivalDate: new Date(trip.end_time),
        origin: trip.segments[0].departure.city.title + ", " + trip.segments[0].departure.title,
        destination: trip.segments.slice(-1)[0].arrival.city.title + ", " + trip.segments.slice(-1)[0].arrival.title,
        entries: trip.segments.flatMap((seg, index) => {
          const startTime = new Date(trip.start_time).getTime()
          const endTime = new Date(trip.end_time).getTime()
          const duration = endTime - startTime

          const arrivalTime = new Date(seg.arrival_time).getTime()
          const departureTime = new Date(seg.departure_time).getTime()
          const N = arrivalTime - departureTime

          const percentage = N / duration * 100


          const nextSeg = trip.segments[index + 1]

          if (trip.segments.length === index || !nextSeg) {
            return { type: "travel", percentage }
          }

          const nextArrivalTime = new Date(nextSeg.arrival_time).getTime()
          const nextDepartureTime = new Date(nextSeg.departure_time).getTime()
          const nextN = nextDepartureTime - arrivalTime
          const nextPercentage = nextN / duration * 100

          return [
            { type: "travel", percentage },
            { type: "transfer", percentage: nextPercentage }
          ]
        })
      }))}
      bestOffer={{
        ...props.best_offer,
        image: getAgentLogo(props.best_offer.gate_id)
      }}
      groups={props.trips.flatMap((trip, index) => {
        let type = ""
        if (props.trips.length > 2) {
          type = "flight"
        } else {
          type = index === 0 ? "departure" : "return"
        }

        return trip.segments.map((seg, segIndex) => ({
          duration: Number(seg.duration),
          index,
          id: seg.id,
          type: segIndex === 0 ? type : "transfer",
          baggageWeight: seg.baggage_weight,
          handbagsWeight: seg.handbags_weight,
          trace: {
            flight: seg.flight,
            logo: getAirlineLogo(seg.marketing_airline.code),
            arrival: {
              title: seg.arrival.city.title + ", " + seg.arrival.title,
              code: seg.arrival.code,
              time: new Date(seg.arrival_time)
            },
            departure: {
              title: seg.departure.city.title + ", " + seg.departure.title,
              code: seg.departure.code,
              time: new Date(seg.departure_time)
            }
          }
        }))
      })}
    />
  )
}


export default SearchResultAirTicket
