import "./Feedback.scss"

const FeedBack = () => {
  return (
    <section className="feedback">
      <h2 className="h2 feedback__h2">Здравствуйте!<br />Будем рады услышать ваше предложение.</h2>
      <div className="feedback__wrap">
        <form className="feedback__form" action="#">
          <div className="input-group feedback__input"><input id="email" className="input-group__input" type="email" placeholder="e-mail" /> <label className="input-group__label" for="email">e-mail</label></div><textarea className="textarea" placeholder="Введите текст..."></textarea> <input className="btn feedback__submit" type="submit" value="Отправить предложение" />
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
            <a className="contacts__item-link contacts__item-link--facebook" href="#"><svg className="contacts__item-icon" width="15" height="15">
              <use href="img/sprite.svg#facebook"></use>
            </svg>Facebook</a>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeedBack
