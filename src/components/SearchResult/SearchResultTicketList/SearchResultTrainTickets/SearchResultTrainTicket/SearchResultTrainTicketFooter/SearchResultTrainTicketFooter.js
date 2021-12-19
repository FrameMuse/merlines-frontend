import React, { useState } from "react"

import { separateThousand } from "../../../../../../utils"
import Icon from "../../../../../common/Icon"
import SearchResultTicketOffer from "../../../SearchResultTicketOffer"
import SearchResultTicketTransfer from "../../../SearchResultTicketTransfer"
import SearchResultTrainTicketMini from "./SearchResultTrainTicketMini"

const SearchResultTrainTicketFooter = ({
  voyages,
  sellers,
  transfers,
  flightDuration,
  setIsOpenMoreInfo,
  isOpenMoreInfo
}) => {
  const [moreSellers, setMoreSellers] = useState(false)

  const sellersSorted =
    sellers.length > 1
      ? [...sellers].sort((a, b) => a.price - b.price)
      : [...sellers]
  const openMoreInfo = () => setIsOpenMoreInfo(!isOpenMoreInfo)

  return (
    <>
      <div className="ticket__footer">
        <div className="ticket__trine-menu">
          <button
            className="ticket__trine-btn ticket__trine-btn--active"
            type="button"
          >
            Плацкарт
            <Icon
              className="btn__arrow-icon"
              name="arrow-open"
              width="8"
              height="8"
            />
          </button>
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
          <Icon
            className="btn__arrow-icon"
            name="arrow-open"
            width="8"
            height="8"
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
                <Icon
                  className="btn__arrow-icon"
                  name="arrow-open"
                  width="8"
                  height="8"
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
              voyages.map((item, index) => (
                <>
                  <SearchResultTrainTicketMini key={index} voyage={item} />
                  {transfers && transfers.length !== index ? (
                    <SearchResultTicketTransfer transfers={transfers[index]} />
                  ) : null}
                </>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchResultTrainTicketFooter
