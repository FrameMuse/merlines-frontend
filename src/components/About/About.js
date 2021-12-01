import React from 'react'
import Subscribe from "../Subscribe/Subscribe";

const  About = () => {

  return (
    <>
      <section className="about">
        <div className="about__container">

          <div className="about__intro">
            <div className="about__intro-content">
              <h1 className="h1 about__intro-title">О Нас</h1>
              <p className="text">«ТТК Merlines» – это современная <span
                className="nowrap">транспортно-туристическая</span> компания с имиджем технологичной, прогрессивной,
                современной <span className="nowrap">IT-компании</span>.</p>
            </div>
          </div>

          <section className="about__improvement">
            <h2 className="h2 about__improvement-title">С моменат основания мы</h2>

            <ul className="about__improvement-list">
              <li className="about__improvement-item about__improvement-item--mask">
                <span className="about__improvement-number">1.</span>

                <div className="about__improvement-box">
                  <span className="about__improvement-caption">6 350 000 людей</span>
                  <p className="about__improvement-text">Отправили в незабываемую поездку</p>
                </div>
              </li>

              <li className="about__improvement-item">
                <span className="about__improvement-number">2.</span>

                <div className="about__improvement-box">
                  <p className="about__improvement-text">Превратились в современную технологичную компанию с огромным
                    потенциалом</p>
                </div>
              </li>

              <li className="about__improvement-item">
                <span className="about__improvement-number">3.</span>

                <div className="about__improvement-box">
                  <p className="about__improvement-text">Создали крупный сервис по поиску билетов на поезд, самолёт и
                    автобус для путешествий по России, Европе и странам СНГ</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="about__mission">
            <h2 className="h2 about__mission-title">Наша миссия - <br />
              открыть вам весь мир.
            </h2>

            <p className="text about__mission-text">Это то, что заставляет нас делать всё возможное для расширения
              человеческого потенциала. Мы делаем это, создавая революционные туристические инновации, делая наш продукт
              Merlines более экологичным, создавая творческую и разнообразную глобальную команду и оказывая
              положительное влияние на сообщества, в которых мы живем и работаем.
            </p>

            <address className="about__author">
              <div className="about__author-name">Василий Егоров</div>
              <div className="about__author-company">Компания «ТТК МерЛайнс»</div>
            </address>
          </section>
        </div>
      </section>
      <Subscribe />
      </>
  )
}

export default About
