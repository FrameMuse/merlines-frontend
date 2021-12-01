import React from 'react'
import Subscribe from "../Subscribe/Subscribe";
import { Link } from 'react-router-dom';

const AboutProject = () => {

  return (
    <>
      <section className="project">
        <div className="project__container">

          <h1 className="h1 project__h1">О Проекте</h1>
          <p className="text project__head-text">www.merlines.ru – это сервис, который поможет вам найти удобные и
            выгодные билеты
            на самолёт, поезд и автобус. С нами планировать путешествия по всему миру стало быстрее и проще!</p>

          <div className="project__cols">
            <div className="project__col">
              <h2 className="h2 project__h2">Кто мы?</h2>
            </div>

            <div className="project__col">
              <p className="text project__text">ООО «ТТК МерЛайнс» это современная транспортно-туристическая компания,
                предоставляющая услуги
                поиска билетов и составления маршрута соответственно вашим пожеланиям. Данный сервис выполняет быстрый и
                удобный
                поиск билетов в любую точку мира для пользователей любого пола и возраста.</p>
            </div>
          </div>

          <div className="project__cols">
            <div className="project__col">
              <h2 className="h2 project__h2">Почему наш поисковик билетов лучше конкурентов?</h2>
            </div>

            <div className="project__col">
              <p className="text project__text">У нас применяются самые передовые и прогрессивные технологии, которые
                делают подбор билетов
                максимально комфортным и увлекательным: благодаря набору фильтров вы можете детально ознакомиться как с
                видами
                транспорта (будь то самолёт, поезд или даже автобус), так и с разнообразными вариантами формирования
                маршрута
                (несколько возможных вариантов на ваш вкус).</p>
              <p className="text project__text">Несмотря на широкую узнаваемость и известность активно рекламируемых
                конкурирующих проектов, наш
                поисковик заметно:</p>

              <ul className="project__list uppercase">
                <li className="project__item">
                  <span className="project__item-number">01.</span>
                  <span className="project__item-text">СОВЕРШЕННЕЕ</span>
                </li>
                <li className="project__item">
                  <span className="project__item-number">02.</span>
                  <span className="project__item-text">ЭФФЕКТИВНЕЕ</span>
                </li>
                <li className="project__item">
                  <span className="project__item-number">03.</span>
                  <span className="project__item-text">БЫСТРЕЕ</span>
                </li>
              </ul>

              <p className="text project__text">Удобный интерфейс ресурса превратит выбор билетов и составление
                маршрутов в увлекательную и при
                этом полезную игру.</p>
              <p className="text project__text">Полностью автономные алгоритмы сделают вашу головную боль выбора билетов
                не более чем
                рассеявшимся без следа страшным сном, и подарят чувство облегчения и заинтересованности! </p>
            </div>
          </div>
        </div>

        <div className="project__mission">
          <div className="project__container">
            <Link className="logo project__mission-logo" to="/">
              <svg className="logo__icon" width="86" height="20">
                <use href="img/sprite.svg#merlines"></use>
              </svg>
            </Link>

            <h2 className="project__mission-title">“ MerLines откроет для вас весь мир “</h2>
          </div>
        </div>

        <div className="project__container">
          <div className="project__cols">
            <div className="project__col">
              <h2 className="h2 project__h2">И это всё?</h2>
            </div>

            <div className="project__col">
              <p className="text project__text">Нет! Для ещё большего удобства пользователей сервис использует
                сравнительную систему, которая
                поможет определиться с оптимальной стоимостью билета или маршрутом. Вы всегда можете вернуться к ней и
                перепроверить данные, изменить сравниваемые позиции.</p>
              <p className="text project__text">А также выбрать особые предложения, которые придутся Вам по душе!</p>
            </div>
          </div>

          <div className="project__cols project__cols--mt">
            <div className="project__col">
              <h2 className="h2 project__h2 project__h2--mt">Где посмотреть особые предложения?</h2>
            </div>

            <div className="project__col">
              <p className="text project__text">Действующие акции автоматически подбираются под ваши потребности, также
                вы всегда можете
                ознакомиться с ними на главной странице сайта и найти подходящую Вам категорию. Вся предоставленная
                информация
                абсолютно бесплатна.</p>
              <p className="text project__text">Ну, что ж… Когда основные приготовления завершены, пора оформлять
                заказ!</p>
            </div>
          </div>

          <div className="project__cols project__cols--mt">
            <div className="project__col">
              <h2 className="h2 project__h2 project__h2--mt">А что на счёт оформления заказа, бронирования или
                возврата?</h2>
            </div>

            <div className="project__col">
              <p className="text project__text">Наш сервис предоставляет услуги быстрого и удобного поиска билетов и
                маршрутов по вашим
                указаниям. Конечно же, все операции проходят на сайте организаторов и стоит обращаться к ним. И мы, в
                свою очередь,
                готовы подтвердить достоверность взятого ресурса и предоставить необходимые документы в случае возникших
                вопросов.</p>
              <p className="text project__text">Для этого стоит пояснить, как формируются цены на те или иные
                билеты.</p>
            </div>
          </div>

          <div className="project__cols project__cols--mt">
            <div className="project__col">
              <h2 className="h2 project__h2">Как формируются цены на билеты?</h2>
            </div>

            <div className="project__col">
              <p className="text project__text">Ценообразование нисколько не статично, и определяется подрядчиками.</p>
              <p className="text project__text">Цены могут зависеть от:</p>


              <ul className="project__list project__list--price">
                <li className="project__item">
                  <span className="project__item-number">01.</span>
                  <span className="project__item-text">Курса валюты</span>
                </li>
                <li className="project__item">
                  <span className="project__item-number">02.</span>
                  <span className="project__item-text">Сезона</span>
                </li>
                <li className="project__item">
                  <span className="project__item-number">03.</span>
                  <span className="project__item-text">Других внутренних факторов</span>
                </li>
              </ul>

              <strong className="project__text-strong">Наша система отображает чистую стоимость выбранной
                позиции.</strong>
              <p className="text project__text">Для того, чтобы следить за изменением цен, новыми выгодными
                предложениями и “горящими” билетами,
                мы предлагаем оформить бесплатную подписку на почту.</p>
            </div>
          </div>

          <div className="project__feedback">
            <h2 className="h2 project__h2 project__h2--big">Как же вам с нами связаться?</h2>

            <div className="project__feedback-wrap">
              <p className="text project__feedback-text-1">У нас есть рабочая почта, где вам ответит в течении
                нескольких минут
                служба
                поддержки</p>

              <div className="contacts project__contacts">
                <div className="contacts__item">
                  <h3 className="contacts__title">E-mail</h3>
                  <Link className="contacts__info" to="#">contact@alladvertising.ru</Link>
                </div>
              </div>

              <div className="project__middle">
                <span className="project__middle-text">ИЛИ</span>
              </div>

              <p className="text project__feedback-text">Вы можете отправить письмо прямо с нашего сервиса в пару
                кликов</p>

              <form className="project__form" action="#">
                <div className="input-group">
                  <input id="email" className="input-group__input" type="email" placeholder="e-mail" />
                    <label className="input-group__label" htmlFor="email">e-mail</label>
                </div>

                <textarea className="textarea project__textarea" placeholder="Введите текст..."></textarea>

                <input className="btn project__form-btn" type="submit" value="Задать вопрос" />
              </form>
            </div>
          </div>

        </div>
      </section>
      <Subscribe />
      </>
  )
}

export default AboutProject
