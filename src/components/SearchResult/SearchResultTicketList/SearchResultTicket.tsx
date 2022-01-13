/* eslint-disable no-constant-condition */
import "../ticket.scss"

import { useState } from "react"
import { Link } from "react-router-dom"

import { separateThousand } from "../../../utils"
import Icon from "../../common/Icon"
import { shortenDate } from "../utils"

function SearchResultTicket(props: any) {
  const sellers: string | any[] = []
  const carriers: any[] = []





  const [isDetailedOpen, setIsOpenMoreInfo] = useState(false)

  const [isNoticeActive, setIsNoticeActive] = useState(false)
  const [isFavouritesActive, setIsFavouritesActive] = useState(false)
  const [isShareActive, setIsShareActive] = useState(false)

  const openMoreInfo = () => setIsOpenMoreInfo(!isDetailedOpen)

  const [flightDuration] = useState(0)

  const carrierLogoOne = carriers.length <= 1
  const carrierLogoSize = carrierLogoOne ? 132 : 48
  const carrierLogoWidth = carrierLogoSize / 2
  const carrierLogoHeight = 24

  const sellersSorted =
    sellers.length > 1
      ? [...sellers].sort((a, b) => a.price - b.price)
      : [...sellers]

  const durations: { type: string; name: string; add: string; add2: string; duration: any }[] = []
  // voyages.forEach((_, i) => {
  //   if (i + 1 < voyages.length) {
  //     durations.push(
  //       {
  //         type: "item",
  //         name: `Вылет из ${voyages[i].departure_point_name_cases.po}, ${voyages[i].departure_point_name_airport}`,
  //         add: `в ${voyages[i].departure_date} ${voyages[i].departure_time}`,
  //         add2: `${formatDuration(voyages[i].duration)} в пути`,
  //         duration: voyages[i].duration
  //         //       fromDate: Date.parse(`${voyages[i].departure_date} ${voyages[i].departure_time}`),
  //         //       toDate: Date.parse(`${voyages[i].arrival_date} ${voyages[i].arrival_time}`)
  //       },
  //       {
  //         type: "stop",
  //         name: `Пересадка в ${voyages[i].arrival_point_name_cases.pr}, ${voyages[i].arrival_point_name_airport}`,
  //         add: `${formatDuration(
  //           (Date.parse(
  //             `${voyages[i + 1].departure_date}T${voyages[i + 1].departure_time
  //             }`
  //           ) -
  //             Date.parse(
  //               `${voyages[i].arrival_date}T${voyages[i].arrival_time}`
  //             )) /
  //           1000 /
  //           60
  //         )} ожидания`,
  //         duration:
  //           (Date.parse(
  //             `${voyages[i + 1].departure_date}T${voyages[i + 1].departure_time
  //             }`
  //           ) -
  //             Date.parse(
  //               `${voyages[i].arrival_date}T${voyages[i].arrival_time}`
  //             )) /
  //           1000 /
  //           60
  //       }
  //     )
  //   } else {
  //     durations.push({
  //       type: "item",
  //       name: `Вылет из ${voyages[i].departure_point_name_cases.po}, ${voyages[i].departure_point_name_airport}`,
  //       add: `в ${voyages[i].departure_date} ${voyages[i].departure_time}`,
  //       add2: `${formatDuration(voyages[i].duration)} в пути`,
  //       duration: voyages[i].duration
  //       //       fromDate: Date.parse(`${voyages[i].departure_date} ${voyages[i].departure_time}`),
  //       //       toDate: Date.parse(`${voyages[i].arrival_date} ${voyages[i].arrival_time}`)
  //     })
  //   }
  // })
  const multiplierDuration =
    100 / Math.max(...durations.map(({ duration }) => duration))

  return (
    <div className={`ticket${isDetailedOpen ? " ticket--opened" : ""}`}>
      <div className="ticket__container">
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
            <Link
              className={`ticket__item ${isNoticeActive ? "ticket__item--active" : ""}`}
              onClick={() => setIsNoticeActive(!isNoticeActive)}
              to="#"
            >
              <Icon
                className="ticket__notice-icon"
                name="notice"
                width="15"
                height="15"
              />
              <div className="ticket__pop-up ticket__pop-up--multiline">
                Подписаться на уведомления об изменении цены на этот билет
                Вы подписались на уведомления об изменении цены на этот билет
              </div>
            </Link>
            <Link
              className={`ticket__item ${isFavouritesActive ? "ticket__item--active" : ""}`}
              onClick={() => setIsFavouritesActive(!isFavouritesActive)}
              to="#"
            >
              <Icon
                className="ticket__star-icon"
                name="star"
                width="15"
                height="15"
              />
              <div className="ticket__pop-up">
                Добавить в избранное
                Вы добавили в избранное этот билет
              </div>
            </Link>
            <Link
              className={`ticket__item ${isShareActive ? "ticket__item--active" : ""}`}
              onClick={() => setIsShareActive(!isShareActive)}
              to="#"
            >
              <Icon name="share" className="ticket__icon" />
              <div className="ticket__pop-up">Поделиться</div>
            </Link>
          </div>
        </div>
        <div className="ticket__inner">
          <div className="ticket__inner-item ticket__inner-item--left">
            <time className="ticket__date">
              {shortenDate("2022-11-2")}
            </time>
            <div className="ticket__time">{"10:30"}</div>
          </div>
          <div className="ticket__middle">
            <span className="ticket__flight-time">{`${flightDuration} в пути`}</span>
            <div className="ticket__union">
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
              {shortenDate("peoe")}
            </time>
            <div className="ticket__time">
              {"peoe"}
            </div>
          </div>
        </div>
        <div className="ticket__point">
          <div className="ticket__point-item ticket__point-item--left">
            {"peoe"}
          </div>
          <div className="ticket__point-item ticket__point-item--right">
            {"peoe"}
          </div>
        </div>
      </div>
      <div className="ticket__footer">
        <div className="ticket__baggage">
          <button
            className="ticket__btn ticket__btn--active"
            type="button"
            title={
              `Ручная кладь
                  места
                  Багаж
                  места`
            }
          >
            <Icon name="baggage" className="ticket__btn-icon" />
            бесплатно
          </button>
          <button
            className={"ticket__btn ticket__btn--active"}
            type="button"
          >
            <Icon
              className="ticket__btn-icon"
              name="baggageLg"
              width="40"
              height="20"
            />
            {true
              ? false
                ? "нет информации"
                : "багаж включен"
              : "багаж не включён"}
          </button>
        </div>
        <div className="ticket__price">10 000 rub</div>
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
      {/* {isDetailedOpen && <Detailed />} */}
    </div>
  )
}

// function Detailed() {
//   return (
//     <div className="ticket__content">
//       <SearchResultTicketOffer
//         price={sellersSorted[0].price}
//         description="цена за 1 взрослого"
//         ticketDealerName={sellersSorted[0].name}
//         link={sellersSorted[0].link}
//       // ticketDealerLogo="images/partners/mego.png"
//       />
//       {sellersSorted.length - 1 > 0 && (
//         <div className="ticket__more">
//           <button
//             onClick={() => setMoreSellers(!moreSellers)}
//             className="ticket__more-btn"
//           >
//             {`еще ${sellersSorted.length - 1} предложений`}{" "}
//             <Icon
//               className="btn__arrow-icon"
//               name="arrow-open"
//               width="8"
//               height="8"
//             />
//           </button>
//           <div className="ticket__more-inner"></div>
//         </div>
//       )}
//       {moreSellers &&
//         sellersSorted.slice(1, sellers.length).map((seller, index) => (
//           <SearchResultTicketOffer
//             key={index}
//             price={seller.price}
//             description="цена за 1 взрослого"
//             ticketDealerName={seller.name}
//             link={seller.link}
//           // ticketDealerLogo="images/partners/mego.png"
//           />
//         ))}
//       <div className="ticket__content-inner">
//         <div className="ticket__content-header">
//           <h3 className="ticket__content-title">Туда</h3>
//           <time className="ticket__content-time">{`${flightDuration} в пути`}</time>
//         </div>
//         {voyages?.length > 0 &&
//           voyages.map((item, index) => {
//             const isAirportChange = voyages?.[index + 1]
//               ? voyages?.[index + 1]?.departure_point_id !==
//               item?.arrival_point_id
//               : false
//             return (
//               <>
//                 <SearchResultTicketMini key={index} voyage={item} />
//                 {transfers && transfers.length !== index ? (
//                   <SearchResultTicketTransfer
//                     transfers={item.arrival_point_name_cases.pr}
//                     transfer_duration={transfers[index]?.duration_seconds}
//                     isAirportChange={isAirportChange}
//                   />
//                 ) : null}
//               </>
//             )
//           })}
//       </div>
//     </div>
//   )
// }

export default SearchResultTicket
