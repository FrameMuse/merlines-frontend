// SCSS
import "./Ticket.style.scss"

import Icon from "components/common/Icon"
import { useState } from "react"
import { classWithModifiers } from "utils"


interface TicketProps {
  id: number
  baggagePrice?: number
  price: number
  logos: string[]

  bestOffer: TicketOfferProps
  timelines: TicketTimelineProps[]
  groups: TicketTraceGroupProps[]
}

function Ticket(props: TicketProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [hasBaggage, setHasBaggage] = useState(false) // False if has only luggage
  return (
    <div className={classWithModifiers("ticket", isDetailsExpanded && "expanded")}>
      <div className="ticket__container">
        <div className="ticket-info">
          <div className="ticket-info__header">
            <div className="ticket-info__logos">
              {props.logos.map((logo, index) => (
                <img src={logo} key={index} />
              ))}
            </div>
            <TicketEvents />
          </div>
          <div className="ticket-info__timelines">
            {props.timelines.map((timeline, index) => (
              <TicketTimeline {...timeline} key={index} />
            ))}
          </div>
        </div>
        <div className="ticket-side">
          <div className="ticket-baggage">
            <button className={classWithModifiers("ticket-baggage__entry", !hasBaggage && "active")} type="button" aria-selected={!hasBaggage} onClick={() => setHasBaggage(false)}>
              <Icon className="ticket-baggage__icon" name="baggage" />
              <span className="ticket-baggage__text">бесплатно</span>
            </button>
            {props.baggagePrice && (
              <button className={classWithModifiers("ticket-baggage__entry", hasBaggage && "active")} type="button" aria-selected={hasBaggage} onClick={() => setHasBaggage(true)}>
                <Icon className="ticket-baggage__icon ticket-baggage__icon--baggage" name="baggageLg" />
                <span className="ticket-baggage__text">+ {props.baggagePrice.toPrice("ru", "rub")}</span>
              </button>
            )}
          </div>
          <div className="ticket-side__price">{props.price.toPrice("ru", "rub")}</div>
          <button className={classWithModifiers("ticket-side-button", isDetailsExpanded && "pressed")} aria-details="toggle details" aria-pressed={isDetailsExpanded} onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}>
            <span className="ticket-side-button__text">Подробнее</span>
            <Icon className="ticket-side-button__icon" name="chevron" />
          </button>
        </div>
      </div>
      <div className="ticket__details" aria-expanded={isDetailsExpanded}>
        <TicketOffers bestOffer={props.bestOffer} />
        <TicketTrace groups={props.groups} />
      </div>
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


interface TicketTimelineProps {
  departureTime: Date
  arrivalTime: Date
  departurePoint: string
  arrivalPoint: string
  entries: {
    type: "travel" | "transfer"
    percentage: number
  }[]
}

function TicketTimeline(props: TicketTimelineProps) {
  const duration = props.arrivalTime.getTime() - props.departureTime.getTime()
  return (
    <div className="ticket-timeline">
      <div className="ticket-timeline__dates">
        <span>{getShortDate("ru", props.departureTime)}</span>
        <span>{getShortDate("ru", props.arrivalTime)}</span>
      </div>
      <div className="ticket-timeline__times">
        <span>{props.departureTime.toLocaleTimeString("ru", { timeStyle: "short" })}</span>
        <div className="ticket-timeline-visual">
          <div className="ticket-timeline-visual__text">{getDetailedTime("ru", duration)} в пути</div>
          <div className="ticket-timeline-entries">
            {props.entries.map((entry, index) => (
              <div className={classWithModifiers("ticket-timeline-entries__entry", entry.type)} style={{ "--percentage": entry.percentage }} key={index} />
            ))}
          </div>
        </div>
        <span>{props.arrivalTime.toLocaleTimeString("ru", { timeStyle: "short" })}</span>
      </div>
      <div className="ticket-timeline__cities">
        <span>{props.departurePoint}</span>
        <span>{props.arrivalPoint}</span>
      </div>
    </div>
  )
}


interface TicketOffersProps {
  bestOffer: TicketOfferProps
}

function TicketOffers(props: TicketOffersProps) {
  return (
    <div className="ticket-prepositions">
      <div className="ticket-prepositions__list">
        <TicketOffer {...props.bestOffer} />
      </div>
      <div className="ticket-prepositions__more">
        <span>ещё 7 предложений</span>
        <Icon className="ticket-prepositions__icon" name="chevron" />
      </div>
    </div>
  )
}


interface TicketOfferProps {
  price: number
  title: string
  image: string
}

function TicketOffer(props: TicketOfferProps) {
  return (
    <div className="ticket-preposition">
      <div className="ticket-preposition__group">
        <div className="ticket-preposition__title">{props.price.toPrice("ru", "rub")}</div>
        <div className="ticket-preposition__desc">цена за 1 взрослого</div>
      </div>
      <div className="ticket-preposition__group">
        <img className="ticket-preposition__image" src={props.image} />
        <div className="ticket-preposition__desc">на {props.title}</div>
      </div>
      <button className="ticket-prepositions__submit">Выбрать</button>
    </div>
  )
}


interface TicketTraceProps {
  groups: TicketTraceGroupProps[]
}

function TicketTrace(props: TicketTraceProps) {
  return (
    <div className="ticket-trace">
      {props.groups.map((group, index) => (
        <TicketTraceGroup {...group} key={index} />
      ))}
    </div>
  )
}


interface TicketTraceGroupProps {
  duration: Date
  index: number
  type: "departure" | "return" | "flight" | "transfer" | string
  trace: TicketTraceTableProps
}

function TicketTraceGroup(props: TicketTraceGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="ticket-trace__group">
      <div className={classWithModifiers("ticket-trace__header", props.type)}>
        {props.type === "transfer" && (
          <Icon className="ticket-trace__icon" name="transfer" />
        )}
        <div className="ticket-trace__title">{{ departure: "Туда", return: "Обратно", flight: "Рейс " + (props.index + 1), transfer: "Пересадка в " + props.trace.departure.title }[props.type]}</div>
        <div className="ticket-trace__time">{getDetailedTime("ru", props.duration)}</div>
      </div>
      <div className="ticket-trace__container">
        <TicketTraceTable {...props.trace} />
        {/* <div className="ticket-trace__entries">
          <div className="ticket-trace__entry">
            <Icon className="ticket-trace__icon" name="baggage" />
            - ручная кладь включена
            <span className="weak">(8 кг)</span>
          </div>
          <div className="ticket-trace__entry">
            <Icon className="ticket-trace__icon ticket-trace__icon--baggageLg" name="baggageLg" />
            - багаж включён
            <span className="weak">(20 кг)</span>
          </div>
          <button className={classWithModifiers("ticket-trace__button", isExpanded && "active")} onClick={() => setIsExpanded(!isExpanded)}>
            <span>о рейсе</span>
            <Icon className={classWithModifiers("ticket-trace__icon", "chevron", isExpanded && "up")} name="chevron" />
          </button>
        </div> */}
        {/* <div className={classWithModifiers("ticket-trace__details", isExpanded && "active")}>
          <div className="entries">
            <div className="entries__entry">
              <div className="entries__key">Перевозчик:</div>
              <div className="entries__value">Аэрофлот</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Еда:</div>
              <div className="entries__value">Бесплатно</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Напитки:</div>
              <div className="entries__value">Платно</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Транспорт:</div>
              <div className="entries__value">AIRBUS A321-100/200</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Развлечения:</div>
              <div className="entries__value">Нет</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Зарядка:</div>
              <div className="entries__value">Есть</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Класс:</div>
              <div className="entries__value">Бизнес</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Алкоголь:</div>
              <div className="entries__value">Бесплатно</div>
            </div>
            <div className="entries__entry">
              <div className="entries__key">Wi-Fi:</div>
              <div className="entries__value">Нет</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}


interface TicketTraceTableProps {
  logo: string
  flight: string
  departure: {
    time: Date
    title: string
    code: string
  }
  arrival: {
    time: Date
    title: string
    code: string
  }
}

function TicketTraceTable(props: TicketTraceTableProps) {
  const departureTime = new Date(props.departure.time)
  const arrivalTime = new Date(props.arrival.time)
  const duration = arrivalTime.getTime() - departureTime.getTime()
  return (
    <table className="ticket-trace-table">
      <thead>
        <tr>
          <th><img className="ticket-trace-table__icon" src={props.logo} /></th>
          <th>рейс: {props.flight}</th>
          <th>{getDetailedTime("ru", duration)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{departureTime.toLocaleTimeString("ru", { timeStyle: "short" })}</td>
          <td>{props.departure.title} <span className="weak">({props.departure.code})</span></td>
          <td>{getShortDate("ru", departureTime)}</td>
        </tr>
        <tr>
          <td>{arrivalTime.toLocaleTimeString("ru", { timeStyle: "short" })}</td>
          <td>{props.arrival.title} <span className="weak">({props.arrival.code})</span></td>
          <td>{getShortDate("ru", arrivalTime)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Ticket

function getDetailedTime(lang: string, date: Date | string | number) {
  const duration = new Date(date).getTime()
  const hours = Math.floor(duration / 1000 / 60 / 60)
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}ч, ${minutes}м`
}

function getShortDate(lang: string, date: Date) {
  return date.toLocaleDateString(lang, { month: "short", day: "numeric", weekday: "short" })
}
