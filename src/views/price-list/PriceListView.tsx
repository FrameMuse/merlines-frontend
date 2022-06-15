import "./PriceListView.scss"

function PriceListView() {
  return (
    <section className="partners">
      <div className="partners__container">
        <div className="partners__head">
          <h1 className="h1 partners__h1">Партнёрам</h1>
          <p className="text text--grey">Наша компания безусловно планирует расти. Мы будем рады партнёрам, которые
            расположенным к взаимовыгодному сотрудничеству. Но давайте обо всём по порядку.</p>
        </div>
      </div>
      <section className="partners__advantages">
        <div className="partners__container">
          <h2 className="h2">Почему именно мы?</h2>
          <ul className="partners__advantages-list">
            <li className="partners__advantages-item"><span className="partners__advantages-number">01.</span>
              <h3 className="h3 partners__advantages-h3">Прогрессивные технологии</h3>
              <p className="text">Наша компания идёт в ногу со временем, поэтому ООО «ТТК МерЛайнс» использует все
                возможные преимущества современного мира. Такой подход поможет и клиентам, которые смогут проще найти
                билеты с помощью умных фильтров, и партнёрам, которым не придётся тратить много времени на обмен
                полезной информацией.</p>
            </li>
            <li className="partners__advantages-item"><span className="partners__advantages-number">02.</span>
              <h3 className="h3 partners__advantages-h3">Во главе угла стоит комфорт пользователей</h3>
              <p className="text">Наша компания ищет умные решения, которые направлены на создание комфортных условий.
                Например, возьмём дизайн сайта. Он разработан так, чтобы человек мог быстро найти то, что ему нужно,
                не напрягая глаза. И это желание находить оптимальное решение проявляется на всех уровнях нашей
                компании.</p>
            </li>
            <li className="partners__advantages-item"><span className="partners__advantages-number">03.</span>
              <h3 className="h3 partners__advantages-h3">Молодая компания</h3>
              <p className="text">Мы не так давно на рынке, а это значит, что хороший сервис будет продолжать расти и
                развиваться. Также мы не будем останавливаться на достигнутом, так как каждый сотрудник желает выйти
                на новый уровень. Это помогает и всей компании расти и развиваться.</p>
            </li>
            <li className="partners__advantages-item"><span className="partners__advantages-number">04.</span>
              <h3 className="h3 partners__advantages-h3">Надёжность</h3>
              <p className="text">Вы не услышите много отрицательных отзывов от клиентов, потому что наш сайт честно
                рассказывает о всех доступных предложениях. Мы выполняем свои обещания, что позволяет нам с лёгкостью
                находить всё новых и новых клиентов.</p>
            </li>
          </ul>
        </div>
      </section>
      <div className="partners__container">
        <section className="partners__profit">
          <div className="partners__profit-col">
            <h2 className="h2 partners__profit-h2">Какую выгоду получит ваша компания</h2>
            <p className="text partners__profit-text">Так как мы собираем информацию о билетах, то мы будем рады получать
              её из первых рук. Поэтому, если вы продаёте билеты на выбранные направления или организовываете поездки
              и путешествия, то мы будем рады сотрудничать с вами. Тем более, каждая из сторон получит свою выгоду.
            </p>
          </div>
          <ul className="partners__profit-list">
            <li className="partners__profit-item partners__profit-item--client">
              <h3 className="partners__profit-h3">1. Больше клиентов</h3>
              <p className="text text--grey">Вы сможете получить больше клиентов, которые узнают о вас через сайт нашей
                компании. Да-да, вам больше не нужно будет платить за рекламу, ведь о вас будут узнавать совершенно
                бесплатно на нашем сайте. А свободные деньги вы сможете направить на развитие своего бизнеса.</p>
            </li>
            <li className="partners__profit-item partners__profit-item--sale">
              <h3 className="partners__profit-h3">2. Реклама акций</h3>
              <p className="text text--grey">А ещё наш сайт – прекрасная возможность рекламировать акции, скидки и другие
                новости. Мы информируем наших клиентов обо всех изменениях цен и наличии «Горячих билетов». А это
                значит, что о ваших выгодных предложениях узнает большое количество людей.</p>
            </li>
            <li className="partners__profit-item partners__profit-item--promotion">
              <h3 className="partners__profit-h3">3. Продвижение</h3>
              <p className="text text--grey">А ещё мы поможем вам в продвижении вашего сайта. Благодаря сотрудничеству к
                вам на сайт будет переходить большое количество пользователей, что позволит вам улучшить свои позиции
                в поисковой выдачи, не нанимая для этого специалистов.</p>
            </li>
          </ul>
        </section>
        <section className="partners__special">
          <h2 className="h2">Уникальные предложения</h2>
          <p className="text partners__special-text">Для своих партнёров мы регулярно продумываем уникальные предложения,
            которые должны сделать сотрудничество более приятным.</p>
          <ul className="cards partners__special-cards">
            <li className="cards__item"><span className="cards__number">1</span>
              <p className="cards__text">Самое популярное из них – настройка автоматической передачи данных по API.
                Благодаря этому вам не нужно будет самостоятельно отправлять нам информацию о билетах и маршрутах. Она
                будет доставляться нам с помощью автоматических алгоритмов.</p>
            </li>
            <li className="cards__item"><span className="cards__number">2</span>
              <p className="cards__text">Самое популярное из них – настройка автоматической передачи данных по API.
                Благодаря этому вам не нужно будет самостоятельно отправлять нам информацию о билетах и маршрутах. Она
                будет доставляться нам с помощью автоматических алгоритмов.</p>
            </li>
            <li className="cards__item"><span className="cards__number">3</span>
              <p className="cards__text">Самое популярное из них – настройка автоматической передачи данных по API.
                Благодаря этому вам не нужно будет самостоятельно отправлять нам информацию о билетах и маршрутах. Она
                будет доставляться нам с помощью автоматических алгоритмов.</p>
            </li>
            <li className="cards__item"><span className="cards__number">4</span>
              <p className="cards__text">Самое популярное из них – настройка автоматической передачи данных по API.
                Благодаря этому вам не нужно будет самостоятельно отправлять нам информацию о билетах и маршрутах. Она
                будет доставляться нам с помощью автоматических алгоритмов.</p>
            </li>
          </ul>
        </section>
        <section className="feedback">
          <h2 className="h2 feedback__h2">Здравствуйте!<br />Будем рады услышать ваше предложение.</h2>
          <div className="feedback__wrap">
            <form className="feedback__form" action="#">
              <div className="input-group feedback__input"><input id="email" className="input-group__input" type="email" placeholder="e-mail" />
                <label className="input-group__label" htmlFor="email">e-mail</label></div><textarea className="textarea" placeholder="Введите текст..."></textarea> <input className="btn feedback__submit" type="submit" value="Отправить предложение" />
            </form>
            <div className="contacts">
              <div className="contacts__item">
                <h3 className="contacts__title">Телефон</h3><a className="contacts__info" href="tel:+74012722398">+7
                  4012-72-23-98</a>
              </div>
              <div className="contacts__item">
                <h3 className="contacts__title">E-mail</h3><a className="contacts__info"
                  href="#">contact@alladvertising.ru</a>
              </div>
              <div className="contacts__item">
                <h3 className="contacts__title">Социальные сети</h3><a
                  className="contacts__item-link contacts__item-link--instagram" href="#"><svg className="contacts__item-icon"
                    width="15" height="15">
                    <use href="img/sprite.svg#instagram"></use>
                  </svg>Instagram</a>
                <a className="contacts__item-link contacts__item-link--facebook" href="#"><svg
                  className="contacts__item-icon" width="15" height="15">
                  <use href="img/sprite.svg#facebook"></use>
                </svg>Facebook</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default PriceListView