import React from 'react'
import FeedBack from "../FeedBack/FeedBack";
import Subscribe from "../Subscribe/Subscribe";

const Advertising = () => {

  return (
    <>
      <section className="advertising">
        <div className="advertising__container">

          <h2 className="h2">Размещение рекламы</h2>

          <p className="text advertising__text">МерЛайнс предлагает хорошие условия и заметные позиции для размещения
            рекламы и публикаций - спец.размещения, большие баннеры, интересные кейсы и статьи.</p>
          <p className="text advertising__text">Сервис MerLines сегодня является уникальной информационной площадкой,
            которую ежемесячно посещают более 350 тысяч пользователей, заинтересованных в информации о лидерах рынка.
            Годовая аудитория сервиса MerLines
            составляет свыше 5 млн. человек.</p>

          <ul className="advertising__list">
            <li className="advertising__item">
              <h2 className="h2 advertising__list-title">На главной странице</h2>

              <div className="banner">
                <div className="banner__content">
                  <h3 className="banner__title">Баннер 980х100</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Баннер размещается на главной странице. На главной странице в главном
                      блоке размещение
                      сопровождается баннером №1.</p>
                  </div>

                  <span className="banner__price">30 000 &nbsp;₽ / месяц</span>
                </div>
              </div>
            </li>

            <li className="advertising__item">
              <h2 className="h2 advertising__list-title">На странице поиска</h2>

              <div className="banner">
                <div className="banner__content">
                  <h3 className="banner__title">Баннер 980х100</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Баннер размещается на странице поиск билетов. «Рейтинга». Размещение
                      сопровождается баннером и будет отображаться до окончания периода поиска билетов.</p>
                  </div>

                  <span className="banner__price">30 000 &nbsp;₽ / месяц</span>
                </div>
              </div>
            </li>

            <li className="advertising__item">
              <h2 className="h2 advertising__list-title">На странице билетов</h2>

              <div className="banner">
                <div className="banner__content">
                  <h3 className="banner__title">Баннер 980х100</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Баннер размещается на странице билеты. На странице размещение
                      сопровождается баннером в центральном блоке между билетами.</p>
                  </div>

                  <span className="banner__price">30 000 &nbsp;₽ / месяц</span>
                </div>

                <div className="banner__content">
                  <h3 className="banner__title">Ротация логотипа 255х255</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Ссылка с логотипа ведет на главную страницу, либо на страничку с
                      информацией на вашем сайте, что привлекает дополнительное внимание к вашей компании. Размещается
                      справа от главного блока с билетами.</p>
                  </div>

                  <span className="banner__price">6 000 &nbsp;₽ / месяц</span>
                </div>

                <div className="banner__content">
                  <h3 className="banner__title">Баннер 255х500</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Размещается справа от главного блока с билетами.</p>
                  </div>

                  <span className="banner__price">35 000 &nbsp;₽ / месяц</span>
                </div>
              </div>
            </li>

            <li className="advertising__item">
              <h2 className="h2 advertising__list-title">На страницах блога</h2>

              <div className="banner">
                <div className="banner__content">
                  <h3 className="banner__title">Баннер 980х100</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Баннер размещается на главной и внутренних страницах блога. На главной
                      странице блога размещение сопровождается баннером.</p>
                  </div>

                  <span className="banner__price">30 000 &nbsp;₽ / месяц</span>
                </div>

                <div className="banner__content">
                  <h3 className="banner__title">Ротация логотипа 300х300</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Ссылка с логотипа ведет на главную страницу, либо на страничку с
                      информацией на вашем сайте, что привлекает дополнительное внимание к вашей компании. Размещается
                      во всех рубриках блога справа от статьи рубрики, в разделе наши рекомендации.</p>
                  </div>

                  <span className="banner__price">6 000 &nbsp;₽ / месяц</span>
                </div>

                <div className="banner__content">
                  <h3 className="banner__title">Баннер 300х600</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Размещается во всех рубриках блога справа от статьи рубрики, в разделе
                      наши рекомендации.</p>
                  </div>

                  <span className="banner__price">35 000 &nbsp;₽ / месяц</span>
                </div>
              </div>
            </li>

            <li className="advertising__item">
              <h2 className="h2 advertising__list-title">Другие возможности</h2>

              <div className="banner">
                <div className="banner__content">
                  <h3 className="banner__title">Статья/обзор/интервью</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Размещение статьи/обзора/интервью в блоге нашего сервиса.</p>
                  </div>

                  <span className="banner__price">20 000 &nbsp;₽ / публикация</span>
                </div>

                <div className="banner__content">
                  <h3 className="banner__title">Брендирование сайта</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Сквозное размещение двух баннеров 980х100 и 255х500. Возможно изменение
                      фоновой картинки сайта.</p>
                  </div>

                  <span className="banner__price">45 000 &nbsp;₽ / месяц</span>
                </div>

                <div className="banner__content">
                  <h3 className="banner__title">Пакет спонсора</h3>

                  <div className="banner__content-text">
                    <p className="banner__text">Спонсорство — это не просто эксклюзивные условия для размещения рекламы,
                      но и поддержка важного и интересного проекта, подчеркивающие статус компании.</p>
                    <p className="banner__text">Спонсоры рейтинга получают возможность разместить логотип компании и
                      специальную страницу с описанием своих услуг. Для спонсора размещается баннер на главной странице
                      (ротация). Кроме того, в рамках спонсорского пакета предлагается размещение 3-х лучших работ из
                      портфолио.</p>
                  </div>

                  <span className="banner__price">90 000 &nbsp;₽ / <span className="nowrap">6 месяцев</span></span>
                </div>
              </div>
            </li>
          </ul>

          <FeedBack />
        </div>
      </section>
      <Subscribe />
      </>
  )
}

export default Advertising
