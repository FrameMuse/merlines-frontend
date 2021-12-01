import React from 'react'
import { Link } from 'react-router-dom';


const FeedBack = () => {

  return (
    <>
    <section className="feedback">
      <h2 className="h2 feedback__h2">Здравствуйте!<br />
        Будем рады услышать ваше предложение.
      </h2>

      <div className="feedback__wrap">
        <form className="feedback__form" action="#">
          <div className="input-group feedback__input">
            <input id="email" className="input-group__input" type="email" placeholder="e-mail" />
              <label className="input-group__label" htmlFor="email">e-mail</label>
          </div>

          <textarea className="textarea feedback__textarea" placeholder="Введите текст..."></textarea>

          <input className="btn feedback__submit" type="submit" value="Отправить предложение" />
        </form>

        <div className="contacts">
          <div className="contacts__item">
            <h3 className="contacts__title">Телефон</h3>
            <Link className="contacts__info" to="tel:+74012722398">+7 4012-72-23-98</Link>
          </div>

          <div className="contacts__item">
            <h3 className="contacts__title">E-mail</h3>
            <Link className="contacts__info" to="#">contact@alladvertising.ru</Link>
          </div>

          <div className="contacts__item">
            <h3 className="contacts__title">Социальные сети</h3>

            <Link className="contacts__item-link contacts__item-link--instagram" to="#">
              <svg className="contacts__item-icon" width="15" height="15">
                <use href="img/sprite.svg#instagram"></use>
              </svg>
              Instagram</Link>

            <Link className="contacts__item-link contacts__item-link--facebook" href="#">
              <svg className="contacts__item-icon" width="15" height="15">
                <use href="img/sprite.svg#facebook"></use>
              </svg>
              Facebook</Link>
          </div>
        </div>
      </div>
    </section>

  </>
  )
}
export default FeedBack
