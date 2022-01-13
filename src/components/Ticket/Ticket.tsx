// SCSS
import "./Ticket.style.scss"

import Icon from "components/common/Icon"
import { classWithModifiers } from "utils"

// DD
import DDPNG from "./Group.png"


interface TicketProps {

}

function Ticket(props: TicketProps) {
  return (
    <div className="ticket">
      <TicketInfo />
      {/* <div className="ticket-side"></div>
      <div className="ticket__details">
        <TicketOffers />
      </div> */}
    </div>
  )
}

function TicketInfo() {
  return (
    <div className="ticket-info">
      <div className="ticket-info__header">
        <div className="ticket-info__logos">
          <img src={DDPNG} />
        </div>
        <TicketEvents />
      </div>
      <TicketTimeline />
    </div>
  )
}

function TicketEvents() {
  const active = true
  return (
    <div className="ticket-events">
      <button className={classWithModifiers("ticket-events__button", active && "active")} type="button" aria-label="notice me if changes" aria-checked={false}>
        <Icon className="ticket-events__icon" name="notice" />
      </button>
      <button className={classWithModifiers("ticket-events__button")} type="button" aria-label="add to favorites" aria-checked={false}>
        <Icon className="ticket-events__icon" name="star" />
      </button>
      <button className="ticket-events__button" type="button" aria-label="share it">
        <Icon className="ticket-events__icon" name="share" />
      </button>
    </div>
  )
}

function TicketTimeline() {
  return (
    <div className="ticket-timeline">
      <div className="ticket-timeline__dates">
        <span>20 Янв, Пн</span>
        <span>21 Янв, Вт</span>
      </div>
      <div className="ticket-timeline__times">
        <span>02:15</span>
        <div className="ticket-timeline-visual">
          <div className="ticket-timeline-visual__text">25ч 55м в пути</div>
          <div className="ticket-timeline-entries">
            <div className="ticket-timeline-entries__travel" style={{ "--percentage": 50 }} />
            <div className="ticket-timeline-entries__transfer" style={{ "--percentage": 15 }} />
            <div className="ticket-timeline-entries__travel" style={{ "--percentage": 35 }} />
          </div>
        </div>
        <span>17:20</span>
      </div>
      <div className="ticket-timeline__cities">
        <span>Москва, Домодедово</span>
        <span>Париж, Орли</span>
      </div>
    </div>
  )
}

function TicketOffers() {
  return (
    <div className="ticket-orders">
      <div className="ticket-order"></div>
      <div className="ticket-orders__more"></div>
    </div>
  )
}

function TicketTravelTrace() {
  return (
    <div className="ticket-travel-trace">

    </div>
  )
}

export default Ticket
