import { TicketTimeline, TicketTimelineProps } from "components/Ticket/Ticket"

interface PriceCalendarDaysTicketProps {
  price: number
  timelines: TicketTimelineProps[]
}

function PriceCalendarDaysTicket(props: PriceCalendarDaysTicketProps) {
  return (
    <div className="ticket">
      <div className="ticket__container">
        <div className="ticket-info">
          <div className="ticket-info__timelines">
            {props.timelines.map((timeline, index) => (
              <TicketTimeline {...timeline} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="ticket-side">
        <div className="ticket-side__price">{props.price.toPrice("ru", "rub")}</div>
        <button className="ticket-side-button">
          <span className="ticket-side-button__text">Найти</span>
        </button>
      </div>
    </div>
  )
}

export default PriceCalendarDaysTicket
