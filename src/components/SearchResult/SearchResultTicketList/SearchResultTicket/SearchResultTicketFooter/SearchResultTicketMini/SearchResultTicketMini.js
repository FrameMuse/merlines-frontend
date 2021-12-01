import React, {useState} from "react";
import { Duration } from 'luxon';
import Svg from '../../../../../common/Svg';
import {dateMountWeekday, translateTripClassFromCodeToName} from "../../../../../../utils";
import {toTranslateBaggageCode} from "../../../../../../utils";
import { Link } from 'react-router-dom';


const SearchResultTicketMini = ({ voyage }) =>  {
  const {flight_info} = voyage;
  const voyageDuration = Duration.fromObject({ days: 0, hours: 0, minutes: voyage.duration }).normalize().toObject();

  const baggage = toTranslateBaggageCode(voyage.flight_baggage)
  const handbags = toTranslateBaggageCode(voyage.flights_handbags)

  const [isOpenAboutInfo, setIsOpenAboutInfoFrom] = useState(false);
  const openAboutInfo = () => setIsOpenAboutInfoFrom(!isOpenAboutInfo);
  return (
    <div className={`ticket-mini ${isOpenAboutInfo ? "ticket-mini--opened" : ""}`}>
      <div className="ticket-mini__top">
        <Link to="ticket-mini__logo">
          <img className="ticket-mini__logo-img" src={`https://static.merlines.ru/img/air-logos/132/${voyage.carrier_id}.png`} width="66" height="24" alt={voyage.carrier_id} />
        </Link>
        <div className="ticket-mini__flight">рейс: {voyage.flight_number}</div>
        <time className="ticket-mini__top-time">{`${voyageDuration.hours}ч ${voyageDuration.minutes}м`}</time>
      </div>
      <div className="ticket-mini__middle">
        <div className="ticket-mini__col">
          <time className="ticket-mini__col-item">{voyage.departure_time}</time>
          <time className="ticket-mini__col-item">{voyage.arrival_time}</time>
        </div>
        <div className="ticket-mini__col">
          <div className="ticket-mini__col-item ticket-mini__col-item--place">
            {voyage.departure_point_name} <span>{`(${voyage.departure_point_id})`}</span></div>
          <div className="ticket-mini__col-item ticket-mini__col-item--place">
            {voyage.arrival_point_name} <span>{`(${voyage.arrival_point_id})`}</span></div>
        </div>
        <div className="ticket-mini__col">
          <time className="ticket-mini__col-item">{dateMountWeekday(voyage.departure_date)}</time>
          <time className="ticket-mini__col-item">{dateMountWeekday(voyage.arrival_date)}</time>
        </div>
      </div>
      <div className="ticket-mini__bottom">
        <div className="ticket-mini__bottom-item">
          {handbags
            ? handbags === ''
              ? <><Svg svgClass="ticket-mini__bottom-icon" svgName="baggage" svgWidth="30" svgHeight="15" /> 'Нет информации'</>
              : <><Svg svgClass="ticket-mini__bottom-icon" svgName="baggage" svgWidth="30" svgHeight="15" />- ручная кладь включена <span>({handbags.weight || 5}кг)</span></>
            : <><Svg svgClass="ticket-mini__bottom-icon" svgName="baggage" svgWidth="30" svgHeight="15" />- ручная кладь не включена</>}

        </div>
        <div className="ticket-mini__bottom-item">
          {baggage
            ? baggage === ''
              ?  <><Svg svgClass="ticket-mini__bottom-icon" svgName="baggageLg" svgWidth="30" svgHeight="15" /> 'Нет информации'</>
              : <><Svg svgClass="ticket-mini__bottom-icon" svgName="baggageLg" svgWidth="30" svgHeight="15" /> - багаж включён <span>({baggage.weight}кг)</span></>
            : <><Svg svgClass="ticket-mini__bottom-icon" svgName="baggageLg" svgWidth="30" svgHeight="15" /> - багаж не включён</>}
        </div>
        <button className="btn ticket-mini__btn-info" onClick={openAboutInfo}>
          о рейсе <Svg svgClass="btn__arrow-icon" svgName="arrow-open" svgWidth="8" svgHeight="8" />
        </button>
      </div>
      {
        isOpenAboutInfo?
          <div className="ticket-mini__info">
            <div className="ticket-mini__info-col">
              <span className="ticket-mini__info-item">Перевозчик: <b>{voyage.airline_name || `Нет данных`}</b></span>
              <span className="ticket-mini__info-item">Транспорт: <b>{voyage.id}</b></span>
              <span className="ticket-mini__info-item">Класс: <b>{translateTripClassFromCodeToName(voyage.flight_class) || 'Нет данных'}</b></span>
            </div>
            <div className="ticket-mini__info-col">
            <span className="ticket-mini__info-item">Еда: <b>{`${
              flight_info?.amenities.food.exists
                ? flight_info.amenities.food.paid? 'Платный': 'Бесплатный': 'Нет'}`
            }</b></span>
              <span className="ticket-mini__info-item">Развлечения: <b>{`${flight_info?.amenities.entertainment.exists? 'Есть': 'Нет'}`}</b></span>
              <span className="ticket-mini__info-item">Алкоголь: <b>{`${
                flight_info?.amenities.beverage.exists
                  ? flight_info.amenities.beverage.nonalcoholic_paid? 'Платный': 'Бесплатный': 'Нет'}`
              }</b></span>
            </div>
            <div className="ticket-mini__info-col">
            <span className="ticket-mini__info-item">Напитки: <b>{`${
              flight_info?.amenities.beverage.exists
                ? flight_info.amenities.beverage.nonalcoholic_paid? 'Платный': 'Бесплатный': 'Нет'}`
            }</b></span>
              <span className="ticket-mini__info-item">Зарядка: <b>{`${flight_info?.amenities.power.exists? 'Есть': 'Нет'}`}</b></span>
              <span className="ticket-mini__info-item">Wi-Fi: <b>{`${flight_info?.amenities.wifi.exists? 'Есть': 'Нет'}`}</b></span>
            </div>
          </div>
          :
          <div className="ticket-mini__info">
            <p>Нет данных</p>
          </div>
      }
    </div>
  )
};


export default SearchResultTicketMini;
