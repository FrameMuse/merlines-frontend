import "./airlines-ticket.scss"
import "./answers.scss"
import "./landing.scss"
import "./price-dynamics.scss"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { selectMainSearchParams } from "../../reducers/mainSearchSlice"
import Icon from "../common/Icon"
import MainHeader from "../Main/MainHeader/MainHeader"
import MainSpecialCard from "../Main/MainSpecial/MainSpecialCard"
import PriceCalendar from "../PriceCalendar/PriceCalendar"
import LandingAnswerItem from "./LandingAnswerItem"
import LandingCollectionItem from "./LandingCollectionItem"
import {
  aboutText,
  collectionData,
  popularDirections,
  specialData,
  specialTickets
} from "./landingMock"
import LandingPopularDirectionItem from "./LandingPopularDirectionItem"
import LandingPriceDynamic from "./LandingPriceDynamic/LandingPriceDynamic"
import LandingSpecialTicket from "./LandingSpecialTicket"
import LandingTransportSwitcher from "./LandingTransportSwitcher"

function LandingPage() {
  const mainSearchParams = useSelector(selectMainSearchParams)
  const currentRoute = `${mainSearchParams.route.front.from} - ${mainSearchParams.route.front.to}`

  return (
    <section className="landing">
      <MainHeader />
      <div className="landing__wrap">
        <PriceCalendar isLanding={true} />
        <section className="special landing__special-block">
          <div className="special__container">
            <div className="special__inner">
              <h2 className="special__title">Спецпредложения</h2>
              <LandingTransportSwitcher />
            </div>
          </div>
          <div className="special__wrap">
            <ul className="special__list">
              {specialData.map((special, index) => (
                <MainSpecialCard
                  key={index}
                  from={special.cardFrom}
                  to={special.cardTo}
                  city={special.cardToCity}
                  price={special.cardPrice}
                />
              ))}
            </ul>
          </div>
        </section>
        <section className="landing__about">
          <div className="landing__container">
            <h2 className="landing__about-title">{`Почему у нас самые дешёвые билеты ${currentRoute}?`}</h2>
            <p className="landing__about-text">{aboutText.firstPart}</p>
            <p className="landing__about-text">{aboutText.secondPart}</p>
            <div className="button-text landing__button-text">
              <button className="button-text__btn" type="button">
                загрузить еще
                <Icon
                  className="button-text__arrow"
                  name="arrow-open"
                  width="8"
                  height="8"
                />
              </button>
            </div>
          </div>
        </section>
        <section className="section section--index landing__section">
          <div className="section__container">
            <header className="section__header">
              <h2 className="section__title">Наши подборки</h2>
            </header>
            <p className="landing__section-text">
              Интересно, а порой и полезно, почитать перед путешествием!
            </p>
            <ul className="section__list">
              {collectionData.map((item, index) => (
                <LandingCollectionItem
                  key={index}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  tag={item.tag}
                  ISODate={item.ISODate}
                />
              ))}
            </ul>
          </div>
        </section>
        <section className="landing__special">
          <div className="landing__container">
            <h2 className="landing__special-title">
              Спецпредложения авиакомпаний
            </h2>
            <p className="landing__text-info">{`Направление: ${currentRoute}`}</p>
            <div className="landing__special-inner">
              {specialTickets.map((ticket, index) => (
                <LandingSpecialTicket
                  key={index}
                  imgSrc={ticket.imgSrc}
                  companyName={ticket.companyName}
                  price={ticket.price}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="landing__popular">
          <div className="landing__container">
            <h2 className="landing__popular-title">Популярные направления</h2>
            <div className="landing__popular-inner">
              {popularDirections.map((direction, index) => (
                <LandingPopularDirectionItem
                  key={index}
                  from={mainSearchParams.route.front.from}
                  to={mainSearchParams.route.front.to}
                  price={direction.price}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="price-dynamics landing__price-dynamics">
          <div className="price-dynamics__container">
            <div className="price-dynamics__title-wrap">
              <h2 className="price-dynamics__title">Динамика цен</h2>
              <LandingTransportSwitcher />
            </div>
            <p className="landing__text-info">{`Направление: ${currentRoute}`}</p>
            <div className="price-dynamics__nav">
              <Link
                className="price-dynamics__nav-link price-dynamics__nav-link--active"
                to="#"
              >
                Самый дешёвый
              </Link>
              <Link className="price-dynamics__nav-link" to="#">
                Самый быстрый
              </Link>
              <Link className="price-dynamics__nav-link" to="#">
                Оптимальный
              </Link>
            </div>
          </div>
          <LandingPriceDynamic />
        </section>
        <section className="answers landing__answers">
          <div className="answers__container">
            <h2 className="answers__title">Часто задаваемые вопросы</h2>
            <p className="answers__text-info">
              Остались ещё вопросы? Вы можете их задать{" "}
              <Link className="answers__text-link" to="#">
                по ссылке
              </Link>
              , а мы ответим как можно скорее!
            </p>
            <div className="answers__inner">
              <LandingAnswerItem currentRoute={currentRoute} />
              <LandingAnswerItem currentRoute={currentRoute} />
              <LandingAnswerItem currentRoute={currentRoute} />
              <LandingAnswerItem currentRoute={currentRoute} />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default LandingPage
