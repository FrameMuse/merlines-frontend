import { Duration } from "luxon"
import React, { useState } from "react"
import { Link } from "react-router-dom"

import { dateMountWeekday, getSimpleTimeFromISO } from "../../../utils"
import Svg from "../../common/Svg"

function SearchResultTicketMini({
  carrier,
  maxDuration,
  arrivalDateTime,
  arrivalPointName,
  departureDatetime,
  departurePointName
}) {
  // const {flight_info} = voyage;
  const voyageDuration = Duration.fromObject({
    days: 0,
    hours: 0,
    minutes: maxDuration
  })
    .normalize()
    .toObject()

  const baggage = true
  const handbags = true

  const [isOpenAboutInfo, setIsOpenAboutInfoFrom] = useState(false)
  const openAboutInfo = () => setIsOpenAboutInfoFrom(!isOpenAboutInfo)
  return (
    <div
      className={`ticket-mini ${isOpenAboutInfo ? "ticket-mini--opened" : ""}`}
    >
      <div className="ticket-mini__top">
        <Link to="ticket-mini__logo">
          {/*<img className="ticket-mini__logo-img" src={`https://static.merlines.ru/img/air-logos/132/${voyage.carrier_id}.png`} width="66" height="24" alt={voyage.carrier_id} />*/}
        </Link>
        <div className="ticket-mini__flight">{carrier}</div>
        <time className="ticket-mini__top-time">{`${voyageDuration.hours}ч ${voyageDuration.minutes}м`}</time>
      </div>
      <div className="ticket-mini__middle">
        <div className="ticket-mini__col">
          <time className="ticket-mini__col-item">
            {getSimpleTimeFromISO(departureDatetime)}
          </time>
          <time className="ticket-mini__col-item">
            {getSimpleTimeFromISO(arrivalDateTime)}
          </time>
        </div>
        <div className="ticket-mini__col">
          <div className="ticket-mini__col-item ticket-mini__col-item--place">
            {departurePointName}
          </div>
          <div className="ticket-mini__col-item ticket-mini__col-item--place">
            {arrivalPointName}
          </div>
        </div>
        <div className="ticket-mini__col">
          <time className="ticket-mini__col-item">
            {dateMountWeekday(departureDatetime)}
          </time>
          <time className="ticket-mini__col-item">
            {dateMountWeekday(arrivalDateTime)}
          </time>
        </div>
      </div>
      <div className="ticket-mini__bottom">
        <div className="ticket-mini__bottom-item">
          {handbags ? (
            handbags === "" ? (
              <>
                <Svg
                  svgClass="ticket-mini__bottom-icon"
                  svgName="baggage"
                  svgWidth="30"
                  svgHeight="15"
                />{" "}
                'Нет информации'
              </>
            ) : (
              <>
                <Svg
                  svgClass="ticket-mini__bottom-icon"
                  svgName="baggage"
                  svgWidth="30"
                  svgHeight="15"
                />
                - ручная кладь включена{" "}
              </>
            )
          ) : (
            <>
              <Svg
                svgClass="ticket-mini__bottom-icon"
                svgName="baggage"
                svgWidth="30"
                svgHeight="15"
              />
              - ручная кладь не включена
            </>
          )}
        </div>
        <div className="ticket-mini__bottom-item">
          {baggage ? (
            baggage === "" ? (
              <>
                <Svg
                  svgClass="ticket-mini__bottom-icon"
                  svgName="baggageLg"
                  svgWidth="30"
                  svgHeight="15"
                />{" "}
                'Нет информации'
              </>
            ) : (
              <>
                <Svg
                  svgClass="ticket-mini__bottom-icon"
                  svgName="baggageLg"
                  svgWidth="30"
                  svgHeight="15"
                />{" "}
                - багаж включён{" "}
              </>
            )
          ) : (
            <>
              <Svg
                svgClass="ticket-mini__bottom-icon"
                svgName="baggageLg"
                svgWidth="30"
                svgHeight="15"
              />{" "}
              - багаж не включён
            </>
          )}
        </div>
        <button className="btn ticket-mini__btn-info" onClick={openAboutInfo}>
          о рейсе{" "}
          <Svg
            svgClass="btn__arrow-icon"
            svgName="arrow-open"
            svgWidth="8"
            svgHeight="8"
          />
        </button>
      </div>
      {isOpenAboutInfo ? (
        <div className="ticket-mini__info">
          <div className="ticket-mini__info-col">
            <span className="ticket-mini__info-item">
              Перевозчик: <b>{carrier || `Нет данных`}</b>
            </span>
            <span className="ticket-mini__info-item">
              Транспорт: <b>Автобус</b>
            </span>
            <span className="ticket-mini__info-item">
              Класс: <b>{`Нет данных`}</b>
            </span>
          </div>
          <div className="ticket-mini__info-col">
            <span className="ticket-mini__info-item">
              Еда: <b>{`Нет данных`}</b>
            </span>
            <span className="ticket-mini__info-item">
              Развлечения: <b>{`Нет данных`}</b>
            </span>
          </div>
          <div className="ticket-mini__info-col">
            <span className="ticket-mini__info-item">
              Напитки: <b>{`Нет данных`}</b>
            </span>
            <span className="ticket-mini__info-item">
              Зарядка: <b>{`Нет данных`}</b>
            </span>
            <span className="ticket-mini__info-item">
              Wi-Fi: <b>{`Нет данных`}</b>
            </span>
          </div>
        </div>
      ) : (
        <div className="ticket-mini__info">
          <p>Нет данных</p>
        </div>
      )}
    </div>
  )
}

export default SearchResultTicketMini
