import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../ticket.scss"

import Svg from "../../common/Svg"
import { separateThousand, toTranslateBaggageCode } from "../../../utils"
import { formatDuration, shortenDate } from "../utils"
import SearchResultTicketOffer from "./SearchResultTicketOffer"
import SearchResultTicketMini from "./SearchResultTicketMini"
import SearchResultTicketTransfer from "./SearchResultTicketTransfer"

function SearchResultTicket(props) {
  const { carriers, flight, maxDuration, sellers, voyages, transfers } = props

  const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false)

  const [isOpenAboutInfoTo, setIsOpenAboutInfoTo] = useState(false)
  const [moreSellers, setMoreSellers] = useState(false)
  const [isNoticeActive, setIsNoticeActive] = useState(false)
  const [isFavouritesActive, setIsFavouritesActive] = useState(false)
  const [isShareActive, setIsShareActive] = useState(false)

  const openMoreInfo = () => setIsOpenMoreInfo(!isOpenMoreInfo)
  // const openAboutInfoTo = () => setIsOpenAboutInfoTo(!isOpenAboutInfoTo);

  const [flightDuration, setFlightDuration] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const duration = (arr) => {
      let durationTime = 0
      arr.forEach((item) => (durationTime += item.duration))
      return durationTime
    }

    setFlightDuration(formatDuration(maxDuration))
    // eslint-disable-next-line
  }, [flight])

  const carrierLogoOne = carriers.length <= 1
  const carrierLogoSize = carrierLogoOne ? 132 : 48
  const carrierLogoWidth = carrierLogoSize / 2
  const carrierLogoHeight = 24

  const sellersSorted =
    sellers.length > 1
      ? [...sellers].sort((a, b) => a.price - b.price)
      : [...sellers]

  let durations = []
  voyages.forEach((_, i) => {
    if (i + 1 < voyages.length) {
      durations.push(
        {
          type: "item",
          name: `Вылет из ${voyages[i].departure_point_name_cases.po}, ${voyages[i].departure_point_name_airport}`,
          add: `в ${voyages[i].departure_date} ${voyages[i].departure_time}`,
          add2: `${formatDuration(voyages[i].duration)} в пути`,
          duration: voyages[i].duration
          //       fromDate: Date.parse(`${voyages[i].departure_date} ${voyages[i].departure_time}`),
          //       toDate: Date.parse(`${voyages[i].arrival_date} ${voyages[i].arrival_time}`)
        },
        {
          type: "stop",
          name: `Пересадка в ${voyages[i].arrival_point_name_cases.pr}, ${voyages[i].arrival_point_name_airport}`,
          add: `${formatDuration(
            (Date.parse(
              `${voyages[i + 1].departure_date}T${
                voyages[i + 1].departure_time
              }`
            ) -
              Date.parse(
                `${voyages[i].arrival_date}T${voyages[i].arrival_time}`
              )) /
              1000 /
              60
          )} ожидания`,
          duration:
            (Date.parse(
              `${voyages[i + 1].departure_date}T${
                voyages[i + 1].departure_time
              }`
            ) -
              Date.parse(
                `${voyages[i].arrival_date}T${voyages[i].arrival_time}`
              )) /
            1000 /
            60
        }
      )
    } else {
      durations.push({
        type: "item",
        name: `Вылет из ${voyages[i].departure_point_name_cases.po}, ${voyages[i].departure_point_name_airport}`,
        add: `в ${voyages[i].departure_date} ${voyages[i].departure_time}`,
        add2: `${formatDuration(voyages[i].duration)} в пути`,
        duration: voyages[i].duration
        //       fromDate: Date.parse(`${voyages[i].departure_date} ${voyages[i].departure_time}`),
        //       toDate: Date.parse(`${voyages[i].arrival_date} ${voyages[i].arrival_time}`)
      })
    }
  })
  const multiplierDuration =
    100 / Math.max(...durations.map(({ duration }) => duration))

  return (
    <div className={`ticket${isOpenMoreInfo ? " ticket--opened" : ""}`}>
      <div className="ticket__container">
        <div className="ticket__header">
          {carriers &&
            carriers.map((carrier, index) => (
              <span
                key={index}
                className={`ticket__logo${
                  carrierLogoOne ? "" : " ticket__logo--rounded"
                }`}
              >
                <img
                  src={`https://static.merlines.ru/img/air-logos/${carrierLogoSize}/${carrier.id}.png`}
                  width={carrierLogoWidth}
                  height={carrierLogoHeight}
                  alt={carrier.id}
                />
                <div className="ticket__pop-up">{carrier.name}</div>
              </span>
            ))}
          <div className="ticket__nav">
            <Link
              className={`ticket__item ${
                isNoticeActive ? "ticket__item--active" : ""
              }`}
              onClick={() => setIsNoticeActive(!isNoticeActive)}
              to="#"
            >
              <Svg
                svgClass="ticket__notice-icon"
                svgName="notice"
                svgWidth="15"
                svgHeight="15"
              />
              <div className="ticket__pop-up ticket__pop-up--multiline">
                {`
                  ${
                    !isNoticeActive
                      ? "Подписаться на уведомления об изменении цены на этот билет"
                      : "Вы подписались на уведомления об изменении цены на этот билет"
                  }
                `}
              </div>
            </Link>
            <Link
              className={`ticket__item ${
                isFavouritesActive ? "ticket__item--active" : ""
              }`}
              onClick={() => setIsFavouritesActive(!isFavouritesActive)}
              to="#"
            >
              <Svg
                svgClass="ticket__star-icon"
                svgName="star"
                svgWidth="15"
                svgHeight="15"
              />
              <div className="ticket__pop-up">
                {`
                  ${
                    !isFavouritesActive
                      ? "Добавить в избранное"
                      : "Вы добавили в избранное этот билет"
                  }
                `}
              </div>
            </Link>
            <Link
              className={`ticket__item ${
                isShareActive ? "ticket__item--active" : ""
              }`}
              onClick={() => setIsShareActive(!isShareActive)}
              to="#"
            >
              <Svg
                svgClass="ticket__share-icon"
                svgName="share"
                svgWidth="15"
                svgHeight="15"
              />
              <div className="ticket__pop-up">Поделиться</div>
            </Link>
          </div>
        </div>
        <div className="ticket__inner">
          <div className="ticket__inner-item ticket__inner-item--left">
            <time className="ticket__date">
              {shortenDate(flight[0].departure_date)}
            </time>
            <div className="ticket__time">{flight[0].departure_time}</div>
          </div>
          <div className="ticket__middle">
            <span className="ticket__flight-time">
              {`${flightDuration} в пути`}
            </span>
            <div className="ticket__union">
              {
                <>
                  {durations.map((duration) => (
                    <div
                      className={`ticket__union-${duration.type}`}
                      style={{
                        width: `${duration.duration * multiplierDuration}%`
                      }}
                    >
                      <div className="ticket__union-popup">
                        {duration.name}
                        <br />
                        {duration.add}
                        <br />
                        {duration.add2}
                      </div>
                    </div>
                  ))}
                </>
              }
              {/* <div className="ticket__union-item" style={{ width: '30%' }}>
                <div className="ticket__union-popup">Вылет из аэропорт Домодедово, в пути 5ч 5м</div>
              </div>
              <div className="ticket__union-stop" style={{ width: '20%' }}>
                <div className="ticket__union-popup">Ожидание в аэропорте Орли, 2ч 20м</div>
              </div>
              <div className="ticket__union-item">
                <div className="ticket__union-popup">Вылет из аэропорт Домодедово, в пути 5ч 5м</div>
              </div>
              <div className="ticket__union-stop">
                <div className="ticket__union-popup">Ожидание в аэропорте Орли, 2ч 20м</div>
              </div>
              <div className="ticket__union-item" style={{ width: '45%' }}>
                <div className="ticket__union-popup">Посадка аэропорт Орли, в 17:20</div>
              </div> */}
            </div>
          </div>
          <div className="ticket__inner-item ticket__inner-item--right">
            <time className="ticket__date">
              {shortenDate(flight[flight.length - 1].arrival_date)}
            </time>
            <div className="ticket__time">
              {flight[flight.length - 1].arrival_time}
            </div>
          </div>
        </div>
        <div className="ticket__point">
          <div className="ticket__point-item ticket__point-item--left">
            {voyages[0].departure_point_name}
          </div>
          <div className="ticket__point-item ticket__point-item--right">
            {voyages[voyages.length - 1].arrival_point_name}
          </div>
        </div>
      </div>
      <div className="ticket__footer">
        <div className="ticket__baggage">
          {voyages[0]?.flight_baggage || voyages[0]?.flights_handbags ? (
            <>
              <button
                className="ticket__btn ticket__btn--active"
                type="button"
                title={
                  "Ручная кладь " +
                  toTranslateBaggageCode(voyages[0].flights_handbags).place +
                  " места\n" +
                  "Багаж " +
                  toTranslateBaggageCode(voyages[0].flights_handbags).place +
                  " места"
                }
              >
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
                  voyages[0]?.flight_baggage &&
                  voyages[0]?.flight_baggage !== ""
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
                {voyages[0]?.flight_baggage
                  ? voyages[0]?.flight_baggage === ""
                    ? "нет информации"
                    : "багаж включен"
                  : "багаж не включён"}
              </button>
            </>
          ) : null}
        </div>
        <div className="ticket__price">
          {separateThousand(sellersSorted[0].price)} &nbsp;₽
        </div>
        <button
          className="btn btn--info ticket__btn-info"
          type="button"
          onClick={openMoreInfo}
        >
          Подробнее{" "}
          <Svg
            svgClass="btn__arrow-icon"
            svgName="arrow-open"
            svgWidth="8"
            svgHeight="8"
          />
        </button>
      </div>
      {isOpenMoreInfo && (
        <div className="ticket__content">
          <SearchResultTicketOffer
            price={sellersSorted[0].price}
            description="цена за 1 взрослого"
            ticketDealerName={sellersSorted[0].name}
            link={sellersSorted[0].link}
            // ticketDealerLogo="images/partners/mego.png"
          />
          {sellersSorted.length - 1 > 0 && (
            <div className="ticket__more">
              <button
                onClick={() => setMoreSellers(!moreSellers)}
                className="ticket__more-btn"
              >
                {`еще ${sellersSorted.length - 1} предложений`}{" "}
                <Svg
                  svgClass="btn__arrow-icon"
                  svgName="arrow-open"
                  svgWidth="8"
                  svgHeight="8"
                />
              </button>
              <div className="ticket__more-inner"></div>
            </div>
          )}
          {moreSellers &&
            sellersSorted.slice(1, sellers.length).map((seller, index) => (
              <SearchResultTicketOffer
                key={index}
                price={seller.price}
                description="цена за 1 взрослого"
                ticketDealerName={seller.name}
                link={seller.link}
                // ticketDealerLogo="images/partners/mego.png"
              />
            ))}
          <div className="ticket__content-inner">
            <div className="ticket__content-header">
              <h3 className="ticket__content-title">Туда</h3>
              <time className="ticket__content-time">{`${flightDuration} в пути`}</time>
            </div>
            {voyages?.length > 0 &&
              voyages.map((item, index) => {
                const isAirportChange = voyages?.[index + 1]
                  ? voyages?.[index + 1]?.departure_point_id !==
                    item?.arrival_point_id
                  : false
                return (
                  <>
                    <SearchResultTicketMini key={index} voyage={item} />
                    {transfers && transfers.length !== index ? (
                      <SearchResultTicketTransfer
                        transfers={item.arrival_point_name_cases.pr}
                        transfer_duration={transfers[index]?.duration_seconds}
                        isAirportChange={isAirportChange}
                      />
                    ) : null}
                  </>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResultTicket
