import React, { useState } from "react"
import { Link } from "react-router-dom"
import { classWithModifiers } from "utils"

import Icon from "../../../common/Icon"

const SearchResultTicketHeader = ({ carriers }) => {
  const [isNoticeActive, setIsNoticeActive] = useState(false)
  const [isFavouritesActive, setIsFavouritesActive] = useState(false)
  const [isShareActive, setIsShareActive] = useState(false)

  const carrierLogoOne = carriers.length > 1 ? false : true
  const carrierLogoSize = carrierLogoOne ? 132 : 48
  const carrierLogoWidth = carrierLogoSize / 2
  const carrierLogoHeight = 24

  return (
    <div className="ticket__header">
      {carriers &&
        carriers.map((carrier, index) => (
          <span
            key={index}
            className={`ticket__logo${carrierLogoOne ? "" : " ticket__logo--rounded"}`}
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
        <button
          className={classWithModifiers("ticket__item", isNoticeActive && "active")}
          onClick={() => setIsNoticeActive(!isNoticeActive)}
          type="button"
        >
          <Icon name="notice" className="ticket__icon" />
          <div className="ticket__pop-up ticket__pop-up--multiline">
            Подписаться на уведомления об изменении цены на этот билет
            Вы подписались на уведомления об изменении цены на этот билет
          </div>
        </button>
        <button
          className={classWithModifiers("ticket__item", isFavouritesActive && "active")}
          onClick={() => setIsFavouritesActive(!isFavouritesActive)}
          type="button"
        >
          <Icon name="star" className="ticket__icon" />
          <div className="ticket__pop-up">
            Добавить в избранное"
            Вы добавили в избранное этот билет
          </div>
        </button>
        <button
          className={classWithModifiers("ticket__item", isShareActive && "active")}
          onClick={() => setIsShareActive(!isShareActive)}
          type="button"
        >
          <Icon name="share" className="ticket__icon" />
          <div className="ticket__pop-up">Поделиться</div>
        </button>
      </div>
    </div>
  )
}

export default SearchResultTicketHeader
