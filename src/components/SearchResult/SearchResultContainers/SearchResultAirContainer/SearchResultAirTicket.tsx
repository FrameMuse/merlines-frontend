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
        duration: trip.segments.reduce((result, segment, index) => {
          let transfersDuration = 0

          const prevSegment = trip.segments[index - 1]
          if (prevSegment != null) {
            const prevSegmentArrival = new Date(prevSegment.arrival_time)
            const segmentDeparture = new Date(segment.departure_time)

            transfersDuration = segmentDeparture.getTime() - prevSegmentArrival.getTime()
          }

          return result + Number(segment.duration) + transfersDuration
        }, 0),
        departureDate: new Date(trip.start_time),
        arrivalDate: new Date(trip.end_time),
        origin: trip.segments[0].departure.city.title + ", " + trip.segments[0].departure.title,
        destination: trip.segments.slice(-1)[0].arrival.city.title + ", " + trip.segments.slice(-1)[0].arrival.title,
        entries: trip.segments.flatMap((segment, index) => {
          const duration = Number(segment.duration)

          const arrivalTime = new Date(segment.arrival_time).getTime()
          const departureTime = new Date(segment.departure_time).getTime()
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

        const startTime = new Date(trip.start_time).getTime()
        const endTime = new Date(trip.end_time).getTime()
        let duration = endTime - startTime

        return trip.segments.map((segment, index) => {
          const prevSegment = trip.segments[index - 1]
          if (prevSegment != null) {
            const prevSegmentArrival = new Date(prevSegment.arrival_time)
            const segmentDeparture = new Date(segment.departure_time)

            duration = segmentDeparture.getTime() - prevSegmentArrival.getTime()
          }
          return {
            transferDuration: duration / 1000,
            index,
            id: segment.id,
            type: index === 0 ? type : "transfer",
            baggageWeight: segment.baggage_weight,
            handbagsWeight: segment.handbags_weight,
            trace: {
              duration: Number(segment.duration),
              flight: segment.flight,
              logo: getAirlineLogo(segment.marketing_airline.code),
              arrival: {
                title: segment.arrival.city.title + ", " + segment.arrival.title,
                code: segment.arrival.code,
                time: new Date(segment.arrival_time)
              },
              departure: {
                title: segment.departure.city.title + ", " + segment.departure.title,
                code: segment.departure.code,
                time: new Date(segment.departure_time)
              }
            }
          }
        })
      })}
    />
  )
}


export default SearchResultAirTicket
