// SCSS
import "./Ticket.style.scss"

import { deleteFavourite, postFavourites } from "api/actions/favourites"
import { getTicketsAirOfferLink, getTicketsAirSegmentAbout, getTicketsAirTicketOffers } from "api/actions/tickets"
import ClientAPI from "api/client"
import { APIOuterLink } from "api/helpers"
import Icon from "components/common/Icon"
import { searchSessionContext } from "components/SearchResult/SearchResult"
import { useContext, useState } from "react"
import { useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import {classWithModifiers, getDefaultSelectedCurrency, getDefaultSelectedLanguage} from "utils"

import {deleteTrackingTicket, postTrackingTicket} from "../../api/actions/tracking"
import {humanizeDate} from "../SearchForm/SearchForm.utils"


interface TicketProps {
  id: number
  isFavourite:boolean
  isTracked: boolean
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
            <TicketEvents noticeChecked={props.isTracked} favouriteChecked={props.isFavourite} ticketId={props.id} />
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
                <span className="ticket-baggage__text">+ {props.baggagePrice.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())}</span>
              </button>
            )}
          </div>
          <div className="ticket-side__price">{(props.price + (hasBaggage ? props.bestOffer.price : 0)).toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())}</div>
          <button className={classWithModifiers("ticket-side-button", isDetailsExpanded && "pressed")} aria-details="toggle details" aria-pressed={isDetailsExpanded} onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}>
            <span className="ticket-side-button__text">Подробнее</span>
            <Icon className="ticket-side-button__icon" name="chevron" />
          </button>
        </div>
      </div>
      <div className="ticket__details" aria-expanded={isDetailsExpanded}>
        <TicketOffers ticketId={props.id} bestOffer={props.bestOffer} />
        <TicketTrace groups={props.groups} />
      </div>
    </div>
  )
}

interface TicketEventsProps {
  ticketId: number
  noticeChecked?: boolean
  favouriteChecked?: boolean
}

function TicketEvents(props: TicketEventsProps) {
  const {session} = useContext(searchSessionContext)
  const [noticeChecked, setNoticeChecked] = useState(props.noticeChecked)
  const [favouriteChecked, setFavouriteChecked] = useState(props.favouriteChecked)
  const transport = useSelector(state => state.search.transport)
  function onFavourite() {
    if (favouriteChecked) {
      ClientAPI
        .query(deleteFavourite(transport, props.ticketId))
        .then(() => {
          setFavouriteChecked(false)
          toast.success("Маршрут был удален из списка избранного!", {
            autoClose: 2500,
            pauseOnHover: false,
            closeOnClick: true,
          })
        })
      return
    }

    ClientAPI
      .query(postFavourites(transport, props.ticketId))
      .then(() => {
        setFavouriteChecked(true)
      })
  }
  function onNotice() {
    if (noticeChecked) {
      ClientAPI
        .query(deleteTrackingTicket(transport, props.ticketId))
        .then(() => {
          setNoticeChecked(false)
          toast.success("Билет больше не отслеживается!", {
            autoClose: 2500,
            pauseOnHover: false,
            closeOnClick: true,
          })
        })
      return
    }

    ClientAPI
      .query(postTrackingTicket(transport, session, props.ticketId))
      .then(() => {
        setNoticeChecked(true)
      })
  }
  function onShare() {
    alert("Поделитесь этой ссылкой " + window.location)
  }
  return (
    <div className="ticket-events">
      <button className={classWithModifiers("ticket-events__button", noticeChecked && "active")} type="button" onClick={onNotice} aria-label="notice me if changed" aria-checked={noticeChecked}>
        <Icon className="ticket-events__icon" name="notice" />
      </button>
      <button className={classWithModifiers("ticket-events__button", favouriteChecked && "active")} type="button" onClick={onFavourite} aria-label="add to favorites" aria-checked={favouriteChecked}>
        <Icon className="ticket-events__icon" name="star" />
      </button>
      <button className="ticket-events__button" type="button" onClick={onShare} aria-label="share it">
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
        <span>{humanizeDate(props.departureTime)}</span>
        <span>{humanizeDate( props.arrivalTime)}</span>
      </div>
      <div className="ticket-timeline__times">
        <span>{props.departureTime.toLocaleTimeString("ru", { timeStyle: "short", timeZone: "UTC" })}</span>
        <div className="ticket-timeline-visual">
          <div className="ticket-timeline-visual__text">{getDetailedTime("ru", duration)} в пути</div>
          <div className="ticket-timeline-entries">
            {props.entries.map((entry, index) => (
              <div className={classWithModifiers("ticket-timeline-entries__entry", entry.type)} style={{ "--percentage": entry.percentage }} key={index} />
            ))}
          </div>
        </div>
        <span>{props.arrivalTime.toLocaleTimeString("ru", { timeStyle: "short", timeZone: "UTC" })}</span>
      </div>
      <div className="ticket-timeline__cities">
        <span>{props.departurePoint}</span>
        <span>{props.arrivalPoint}</span>
      </div>
    </div>
  )
}


interface TicketOffersProps {
  ticketId: number
  bestOffer: TicketOfferProps
}

function TicketOffers(props: TicketOffersProps) {
  const { error, loading, payload, query } = useQuery(getTicketsAirTicketOffers(props.ticketId), false)
  if (!loading && (error && !payload)) throw new Error()
  return (
    <div className="ticket-prepositions">
      <div className="ticket-prepositions__list">
        {!payload && (
          <TicketOffer {...props.bestOffer} />
        )}
        {!!payload && payload.results.map(result => (
          <TicketOffer {...result} image={`https://pics.avs.io/gates/200/50/${result.gate_id}.png`} />
        ))}
      </div>
      {!payload && (
        <button className="ticket-prepositions__more" type="button" onClick={() => query()}>
          <span>показать ещё предложения</span>
          <Icon className="ticket-prepositions__icon" name="chevron" />
        </button>
      )}
    </div>
  )
}


interface TicketOfferProps {
  id: number
  price: number
  title: string
  image: string
}

function TicketOffer(props: TicketOfferProps) {
  const { session } = useContext(searchSessionContext)
  return (
    <div className="ticket-preposition">
      <div className="ticket-preposition__group">
        <div className="ticket-preposition__title">{props.price.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())}</div>
        <div className="ticket-preposition__desc">цена за 1 взрослого</div>
      </div>
      <div className="ticket-preposition__group">
        <img className="ticket-preposition__image" src={props.image} />
        <div className="ticket-preposition__desc">на {props.title}</div>
      </div>
      <APIOuterLink className="ticket-prepositions__submit" action={getTicketsAirOfferLink(session, props.id)}>Выбрать</APIOuterLink>
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
  id: number
  index: number
  type: "departure" | "return" | "flight" | "transfer" | string
  trace: TicketTraceTableProps
  handbagsWeight: number | null
  baggageWeight: number | null
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
        <div className="ticket-trace__entries">
          <div className="ticket-trace__entry">
            <Icon className="ticket-trace__icon" name="baggage" />
            - ручная кладь включена
            {props.handbagsWeight && (
              <span className="weak">({props.handbagsWeight} кг)</span>
            )}
          </div>
          {props.baggageWeight && (
            <div className="ticket-trace__entry">
              <Icon className="ticket-trace__icon ticket-trace__icon--baggageLg" name="baggageLg" />
              - багаж включён
              <span className="weak">({props.baggageWeight} кг)</span>
            </div>
          )}
          <button className={classWithModifiers("ticket-trace__button", isExpanded && "active")} onClick={() => setIsExpanded(!isExpanded)}>
            <span>о рейсе</span>
            <Icon className={classWithModifiers("ticket-trace__icon", "chevron", isExpanded && "up")} name="chevron" />
          </button>
        </div>
        {isExpanded && (
          <About segmentId={props.id} />
        )}
      </div>
    </div>
  )
}

function About(props: { segmentId: number }) {
  const { error, loading, payload } = useQuery(getTicketsAirSegmentAbout(props.segmentId))
  if (loading) return <>Loading...</>
  if (error || !payload) return <>Error</>
  const freeEntry = ["Нет", "Бесплатно", "Платно"]
  return (
    <div className="ticket-trace__details">
      <div className="entries">
        <div className="entries__entry">
          <div className="entries__key">Перевозчик:</div>
          <div className="entries__value">{payload.airline}</div>
        </div>
        {payload.food && (
          <div className="entries__entry">
            <div className="entries__key">Еда:</div>
            <div className="entries__value">{freeEntry[payload.food]}</div>
          </div>
        )}
        {payload.beverage && (
          <div className="entries__entry">
            <div className="entries__key">Напитки:</div>
            <div className="entries__value">{freeEntry[payload.beverage]}</div>
          </div>
        )}
        <div className="entries__entry">
          <div className="entries__key">Транспорт:</div>
          <div className="entries__value">{payload.aircraft}</div>
        </div>
        {payload.entertainment && (
          <div className="entries__entry">
            <div className="entries__key">Развлечения:</div>
            <div className="entries__value">{freeEntry[payload.entertainment]}</div>
          </div>
        )}
        {payload.power && (
          <div className="entries__entry">
            <div className="entries__key">Зарядка:</div>
            <div className="entries__value">{freeEntry[payload.power]}</div>
          </div>
        )}
        {payload.travel_class && (
          <div className="entries__entry">
            <div className="entries__key">Класс:</div>
            <div className="entries__value">{payload.travel_class ? "Бизнес" : "Эконом"}</div>
          </div>
        )}
        {payload.alcohol && (
          <div className="entries__entry">
            <div className="entries__key">Алкоголь:</div>
            <div className="entries__value">{freeEntry[payload.alcohol]}</div>
          </div>
        )}
        {payload.wifi && (
          <div className="entries__entry">
            <div className="entries__key">Wi-Fi:</div>
            <div className="entries__value">{freeEntry[payload.wifi]}</div>
          </div>
        )}
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
          <td>{humanizeDate(departureTime)}</td>
        </tr>
        <tr>
          <td>{arrivalTime.toLocaleTimeString("ru", { timeStyle: "short" })}</td>
          <td>{props.arrival.title} <span className="weak">({props.arrival.code})</span></td>
          <td>{humanizeDate(arrivalTime)}</td>
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

// function getShortDate(lang: string, date: Date) {
//   return date.toLocaleDateString(lang, { month: "short", day: "numeric", weekday: "short" })
// }
