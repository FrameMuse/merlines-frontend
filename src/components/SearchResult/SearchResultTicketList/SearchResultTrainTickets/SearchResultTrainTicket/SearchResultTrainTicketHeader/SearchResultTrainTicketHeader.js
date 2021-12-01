import { Link } from "react-router-dom"
import Svg from "../../../../../common/Svg"
import React, { useState } from "react"

const SearchResultTrainTicketHeader = ({ carriers }) => {
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
  )
}

export default SearchResultTrainTicketHeader
