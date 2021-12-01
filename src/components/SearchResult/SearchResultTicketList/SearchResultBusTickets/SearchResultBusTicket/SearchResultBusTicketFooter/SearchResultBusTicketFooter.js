import React from "react";
// import {toTranslateBaggageCode} from "../../../../../utils";
import Svg from "../../../../../common/Svg";
import SearchResultTicketOffer from "../../../SearchResultTicketOffer";
import SearchResultTicketMini from "../../../SearchResultTicketMini";
import {separateThousand} from "../../../../../../utils";


const SearchResultBusTicketFooter = (
  {
    url,
    price,
    carrier,
    maxDuration,
    transfers,
    setIsOpenMoreInfo,
    isOpenMoreInfo,
    arrivalDateTime,
    arrivalPointName,
    departureDatetime,
    departurePointName
  }) => {

  // const sellersSorted = (sellers.length > 1) ? [...sellers].sort((a, b) => a.price - b.price) : [...sellers]
  const openMoreInfo = () => setIsOpenMoreInfo(!isOpenMoreInfo)

  return (
    <>
      <div className="ticket__footer ticket__footer--bus">
        <div className="ticket__price">{separateThousand(price)} ₽</div>
        <button className="btn btn--info ticket__btn-info" type="button" onClick={openMoreInfo}>
          Подробнее <Svg svgClass="btn__arrow-icon" svgName="arrow-open" svgWidth="8" svgHeight="8" />
        </button>
      </div>
      {
        isOpenMoreInfo
        &&
        <div className="ticket__content">
          <SearchResultTicketOffer
            price={price}
            description="цена за 1 взрослого"
            ticketDealerName={carrier}
            link={url}
            // ticketDealerLogo="images/partners/mego.png"
          />
          {/*{*/}
          {/*  (sellersSorted.length - 1) > 0*/}
          {/*  &&*/}
          {/*  <div className="ticket__more">*/}
          {/*    <button onClick={() => setMoreSellers(!moreSellers)} className="ticket__more-btn">*/}
          {/*      {`еще ${sellersSorted.length - 1} предложений`} <Svg svgClass="btn__arrow-icon" svgName="arrow-open" svgWidth="8" svgHeight="8" />*/}
          {/*    </button>*/}
          {/*    <div className="ticket__more-inner"></div>*/}
          {/*  </div>*/}
          {/*}*/}
          {/*{*/}
          {/*  moreSellers*/}
          {/*  &&*/}
          {/*  sellersSorted.slice(1, sellers.length).map((seller, index) =>*/}
          {/*    <SearchResultTicketOffer*/}
          {/*      key={index}*/}
          {/*      price={seller.price}*/}
          {/*      description="цена за 1 взрослого"*/}
          {/*      ticketDealerName={seller.name}*/}
          {/*      link={seller.link}*/}
          {/*      // ticketDealerLogo="images/partners/mego.png"*/}
          {/*    />)*/}
          {/*}*/}
          <div className="ticket__content-inner">
            <div className="ticket__content-header">
              <h3 className="ticket__content-title">Туда</h3>
              <time className="ticket__content-time">{`${maxDuration} в пути`}</time>
            </div>
            <>
              <SearchResultTicketMini
                carrier={carrier}
                maxDuration={maxDuration}
                arrivalDateTime={arrivalDateTime}
              arrivalPointName={arrivalPointName}
              departureDatetime={departureDatetime}
              departurePointName={departurePointName}/>
              {/*{transfers && transfers.length !== index ? <SearchResultTicketTransfer transfers={transfers[index]}/> : null}*/}
            </>
          </div>
        </div>
      }
      </>
  )
}

export default SearchResultBusTicketFooter
