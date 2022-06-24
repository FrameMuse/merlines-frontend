// SCSS
import "./Ticket.style.scss"

import { deleteFavourite, postFavourites } from "api/actions/favourites"
import { FreeEntry, getTicketsAirSegmentAbout, getTicketsAirTicketOffers } from "api/actions/tickets"
import { isValidResponse } from "api/client"
import Icon from "components/common/Icon"
import { searchSessionContext } from "components/SearchResult/SearchResult"
import { useContext, useState } from "react"
import { useClient, useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { classWithModifiers, createQuery, getDefaultSelectedCurrency, getDefaultSelectedLanguage } from "utils"

import { deleteTrackingTicket, postTrackingTicket } from "../../api/actions/tracking"
import useLocalization from "../../plugins/localization/hook"
import { humanizeDate, humanizeDateUTC } from "../SearchForm/SearchForm.utils"



interface TicketProps {
  id: number
  isFavourite: boolean
  isTracked: boolean
  baggagePrice?: number
  price: number
  logos: string[]

  bestOffer: TicketOfferProps
  timelines: TicketTimelineProps[]
  groups: TicketTraceGroupProps[]
}

function Ticket(props: TicketProps) {
  const ll = useLocalization(ll => ll)
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [hasBaggage, setHasBaggage] = useState(false) // False if has only luggage

  const formattedPrice = (props.price + (hasBaggage ? (props.baggagePrice ?? 0) : 0)).toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())
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
              <span className="ticket-baggage__text">{ll.searchResult.free}</span>
            </button>
            {props.baggagePrice && (
              <button className={classWithModifiers("ticket-baggage__entry", hasBaggage && "active")} type="button" aria-selected={hasBaggage} onClick={() => setHasBaggage(true)}>
                <Icon className="ticket-baggage__icon ticket-baggage__icon--baggage" name="baggageLg" />
                <span className="ticket-baggage__text">+ {props.baggagePrice.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())}</span>
              </button>
            )}
          </div>
          <div className="ticket-side__price">{formattedPrice}</div>
          <button className={classWithModifiers("ticket-side-button", isDetailsExpanded && "pressed")} aria-details="toggle details" aria-pressed={isDetailsExpanded} onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}>
            <span className="ticket-side-button__text">{ll.searchResult.detailed}</span>
            <span className="ticket-side-button__text-mobile">{formattedPrice}</span>
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
  const ll = useLocalization(ll => ll)
  const { session } = useContext(searchSessionContext)
  const [noticeChecked, setNoticeChecked] = useState(props.noticeChecked)
  const [favouriteChecked, setFavouriteChecked] = useState(props.favouriteChecked)
  const transport = useSelector(state => state.search.transport)
  const client = useClient()
  async function onFavourite() {
    setFavouriteChecked(!favouriteChecked)

    if (favouriteChecked) {
      const response = await client.query(deleteFavourite(transport, props.ticketId))
      if (!isValidResponse(response)) {
        setFavouriteChecked(true)
        return
      }
      toast.success(ll.searchResult.deleteFromFavSuccess, {
        autoClose: 2500,
        pauseOnHover: false,
        closeOnClick: true,
      })
      return
    }

    const response = await client.query(postFavourites(transport, props.ticketId))
    if (!isValidResponse(response)) {
      setFavouriteChecked(false)
      return
    }
  }
  async function onNotice() {
    setNoticeChecked(!noticeChecked)

    if (noticeChecked) {
      const response = await client.query(deleteTrackingTicket(transport, props.ticketId))
      if (!isValidResponse(response)) {
        setNoticeChecked(true)
        return
      }
      toast.success(ll.searchResult.noticeCanceled, {
        autoClose: 2500,
        pauseOnHover: false,
        closeOnClick: true,
      })
      return
    }

    const response = await client.query(postTrackingTicket(transport, session, props.ticketId))
    if (!isValidResponse(response)) {
      setNoticeChecked(false)
      return
    }
  }
  function onShare() {
    alert(ll.searchResult.shareLink + window.location)
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


export interface TicketTimelineProps {
  duration: number

  origin: string
  destination: string

  departureDate: Date
  arrivalDate: Date

  entries: {
    type: "travel" | "transfer"
    percentage: number
  }[]
}

export function TicketTimeline(props: TicketTimelineProps) {
  const ll = useLocalization(ll => ll)
  const duration = props.arrivalDate.getTime() - props.departureDate.getTime()
  return (
    <div className="ticket-timeline">
      <div className="ticket-timeline__dates">
        <span>{humanizeDateUTC(props.departureDate)}</span>
        <span>{humanizeDateUTC(props.arrivalDate)}</span>
      </div>
      <div className="ticket-timeline__times">
        <span>{props.departureDate.toLocaleTimeString("ru", { timeStyle: "short", timeZone: "UTC" })}</span>
        <div className="ticket-timeline-visual">
          <div className="ticket-timeline-visual__text">
            {humanizeSecondsDuration("ru", props.duration)} {ll.searchResult.inTransit}
          </div>
          <div className="ticket-timeline-entries">
            {props.entries.map((entry, index) => (
              <div className={classWithModifiers("ticket-timeline-entries__entry", entry.type)} style={{ "--percentage": entry.percentage }} key={index} />
            ))}
          </div>
        </div>
        <span>{props.arrivalDate.toLocaleTimeString("ru", { timeStyle: "short", timeZone: "UTC" })}</span>
      </div>
      <div className="ticket-timeline__cities">
        <span>{props.origin}</span>
        <span>{props.destination}</span>
      </div>
    </div>
  )
}


interface TicketOffersProps {
  ticketId: number
  bestOffer: TicketOfferProps
}

function TicketOffers(props: TicketOffersProps) {
  const ll = useLocalization(ll => ll)
  const { session } = useContext(searchSessionContext)
  const { error, payload, query } = useQuery(getTicketsAirTicketOffers(session, props.ticketId), false)
  const [expanded, setExpanded] = useState(false)
  if (error) {
    throw new Error("")
  }
  async function showMore() {
    if (payload == null) {
      await query()
    }

    setExpanded(true)
  }
  function showLess() {
    setExpanded(false)
  }
  return (
    <div className="ticket-prepositions">
      {/* {!expanded && ( */}
      <div className="ticket-prepositions__list">
        <TicketOffer {...props.bestOffer} />
      </div>
      {/* )} */}

      {expanded && (
        <button className="ticket-prepositions__more" type="button" onClick={showLess}>
          <span>{ll.searchResult.showLessOffer}</span>
          <Icon className="ticket-prepositions__icon" name="chevron" />
        </button>
      )}
      {!expanded && (
        <button className="ticket-prepositions__more" type="button" onClick={showMore}>
          <span>{ll.searchResult.showMoreOffer}</span>
          <Icon className="ticket-prepositions__icon" name="chevron" />
        </button>
      )}
      {expanded && payload != null && payload.results.map(offer => (
        <div className="ticket-prepositions__list">
          <TicketOffer {...offer} image={`https://pics.avs.io/gates/200/50/${offer.gate_id}.png`} />
        </div>
      ))}
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
  const ll = useLocalization(ll => ll)
  const { session } = useContext(searchSessionContext)

  function asd() {
    window.open("/#!/redirect?" + createQuery({
      id: props.id,
      session,
      image: props.image, title: props.title
    }), "_blank")

    // history.push("redirect", { action, image: props.image, title: props.title })
  }
  return (
    <div className="ticket-preposition">
      {/* <div className="ticket-preposition__group">
        <div className="ticket-preposition__title">{props.price.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency())}</div>
        <div className="ticket-preposition__desc">{ll.searchResult.pricePerOneAdult}</div>
      </div> */}
      <div className="ticket-preposition__group">
        <img className="ticket-preposition__image" src={props.image} />
        <div className="ticket-preposition__desc">{ll.searchResult.to} {props.title}</div>
      </div>
      <button className="ticket-prepositions__submit" type="button" onClick={asd}>{ll.searchResult.choose}</button>
      {/* <Modal visible={visible} onCancel={() => setVisible(false)}>
        <TicketRedirect action={action} image={props.image} title={props.title} />
      </Modal> */}
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
  transferDuration: number
  id: number
  index: number
  type: "departure" | "return" | "flight" | "transfer" | string
  trace: TicketTraceTableProps
  handbagsWeight: number | null
  baggageWeight: number | null
}

function TicketTraceGroup(props: TicketTraceGroupProps) {
  const ll = useLocalization(ll => ll)
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="ticket-trace__group">
      <div className={classWithModifiers("ticket-trace__header", props.type)}>
        {props.type === "transfer" && (
          <Icon className="ticket-trace__icon" name="transfer" />
        )}
        <div className="ticket-trace__title">
          {{
            departure: ll.main.there,
            return: ll.main.back,
            flight: ll.searchResult.flight + (props.index + 1),
            transfer: ll.searchResult.transferIn + " " + props.trace.departure.title
          }[props.type]}
        </div>
        <div className="ticket-trace__time">{humanizeSecondsDuration("ru", props.transferDuration)}</div>
      </div>
      <div className="ticket-trace__container">
        <TicketTraceTable {...props.trace} />
        <div className="ticket-trace__entries">
          <div className="ticket-trace__entry">
            <Icon className="ticket-trace__icon" name="baggage" />
            - {ll.searchResult.handLuggageIncluded}
            {props.handbagsWeight && (
              <span className="weak">({props.handbagsWeight} {ll.searchResult.kg})</span>
            )}
          </div>
          {props.baggageWeight && (
            <div className="ticket-trace__entry">
              <Icon className="ticket-trace__icon ticket-trace__icon--baggageLg" name="baggageLg" />
              - {ll.searchResult.baggageIncluded}
              <span className="weak">({props.baggageWeight} {ll.searchResult.kg})</span>
            </div>
          )}
          <button className={classWithModifiers("ticket-trace__button", isExpanded && "active")} onClick={() => setIsExpanded(!isExpanded)}>
            <span>{ll.searchResult.aboutFlight}</span>
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
  const ll = useLocalization(ll => ll)
  const { error, loading, payload } = useQuery(getTicketsAirSegmentAbout(props.segmentId))
  if (loading) return <>Loading...</>
  if (error || !payload) return <>Error</>
  const freeEntry = [ll.searchResult.no, ll.searchResult.free, ll.searchResult.forAFee]
  return (
    <div className="ticket-trace__details">
      <div className="entries">
        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.carrier}:</div>
          <div className="entries__value">{payload.airline}</div>
        </div>
        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.food}:</div>
          <div className="entries__value">{freeEntry[payload.food ?? FreeEntry.no]}</div>
        </div>

        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.drinks}:</div>
          <div className="entries__value">{freeEntry[payload.beverage ?? FreeEntry.no]}</div>
        </div>
        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.transport}:</div>
          <div className="entries__value">{payload.aircraft}</div>
        </div>

        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.entrainment}:</div>
          <div className="entries__value">{freeEntry[payload.entertainment ?? FreeEntry.no]}</div>
        </div>

        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.charger}:</div>
          <div className="entries__value">{freeEntry[payload.power ?? FreeEntry.no]}</div>
        </div>
        <div className="entries__entry">
          <div className="entries__key">{ll.main.class}:</div>
          <div className="entries__value">{payload.travel_class ? "Бизнес" : "Эконом"}</div>
        </div>
        <div className="entries__entry">
          <div className="entries__key">{ll.searchResult.alcohol}:</div>
          <div className="entries__value">{freeEntry[payload.alcohol ?? FreeEntry.no]}</div>
        </div>
        <div className="entries__entry">
          <div className="entries__key">Wi-Fi:</div>
          <div className="entries__value">{freeEntry[payload.wifi ?? FreeEntry.no]}</div>
        </div>
      </div>
    </div>
  )
}


interface TicketTraceTableProps {
  logo: string
  flight: string
  duration: number
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
  const ll = useLocalization(ll => ll)
  const departureTime = new Date(props.departure.time)
  const arrivalTime = new Date(props.arrival.time)
  return (
    <table className="ticket-trace-table">
      <thead>
        <tr>
          <th><img className="ticket-trace-table__icon" src={props.logo} /></th>
          <th>{ll.searchResult.flight}: {props.flight}</th>
          <th>{humanizeSecondsDuration("ru", props.duration)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{departureTime.toLocaleTimeString("ru", { timeStyle: "short", timeZone: "UTC" })}</td>
          <td>{props.departure.title} <span className="weak">({props.departure.code})</span></td>
          <td>{humanizeDateUTC(departureTime)}</td>
        </tr>
        <tr>
          <td>{arrivalTime.toLocaleTimeString("ru", { timeStyle: "short", timeZone: "UTC" })}</td>
          <td>{props.arrival.title} <span className="weak">({props.arrival.code})</span></td>
          <td>{humanizeDateUTC(arrivalTime)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Ticket

function humanizeSecondsDuration(lang: string, durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 60 / 60)
  const minutes = Math.floor((durationInSeconds % (60 * 60)) / (60))

  switch (lang) {
    case "ru":
      return `${hours}ч, ${minutes}м`
    case "en":
      return `${hours}h, ${minutes}m`
    default:
      return `${hours}:${minutes}`
  }
}
