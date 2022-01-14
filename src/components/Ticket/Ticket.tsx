// SCSS
import "./Ticket.style.scss"

import Icon from "components/common/Icon"
import { useState } from "react"
import { classWithModifiers } from "utils"

// DD
import DDPNG from "./Group.png"


interface TicketProps {

}

function Ticket(props: TicketProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [hasBaggage, setHasBaggage] = useState(false) // False if has only luggage
  return (
    <div className="ticket">
      <div className="ticket__container">
        <TicketInfo />
        <div className="ticket-side">
          <div className="ticket-baggage" aria->
            <button className={classWithModifiers("ticket-baggage__entry", !hasBaggage && "active")} type="button" aria-selected={!hasBaggage} onClick={() => setHasBaggage(false)}>
              <Icon className="ticket-baggage__icon" name="baggage" />
              <span className="ticket-baggage__text">бесплатно</span>
            </button>
            <button className={classWithModifiers("ticket-baggage__entry", hasBaggage && "active")} type="button" aria-selected={hasBaggage} onClick={() => setHasBaggage(true)}>
              <Icon className="ticket-baggage__icon ticket-baggage__icon--baggage" name="baggageLg" />
              <span className="ticket-baggage__text">+ 3 500 ₽</span>
            </button>
          </div>
          <div className="ticket-side__price">130 000 ₽</div>
          <button className={classWithModifiers("ticket-side-button", isDetailsExpanded && "pressed")} aria-details="toggle details" aria-pressed={isDetailsExpanded} onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}>
            <span className="ticket-side-button__text">Подробнее</span>
            <Icon className="ticket-side-button__icon" name="chevron" />
          </button>
        </div>
      </div>
      <div className={classWithModifiers("ticket__details", isDetailsExpanded && "expanded")} aria-expanded={isDetailsExpanded}>
        <TicketOffers />
      </div>
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
