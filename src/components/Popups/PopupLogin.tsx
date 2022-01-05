import { getAccountSocialFacebook, getAccountSocialInstagram } from "api/actions/account"
import { APIOuterLink } from "api/helpers"
import { Link } from "react-router-dom"

import Icon from "../common/Icon"


function PopupLogin() {
  return (
    <>
      <h2 className="modal__title">Войти через E-Mail</h2>
      <form className="modal__form">
        <div className="modal__form-group">
          <input className="modal__form-input" type="email" />
          <label className="modal__form-label">email</label>
        </div>
        <div className="modal__form-group">
          <input className="modal__form-input" type="email" />
          <label className="modal__form-label">email</label>
        </div>
        <div className="modal__bottom">
          <div className="checkbox checkbox--modal">
            <input className="checkbox-input" type="checkbox" id="check" />
            <label className="checkbox-label" htmlFor="check">
              <Icon name="checkbox" className="checkbox-icon" />
              Запомнить меня
            </label>
          </div>
        </div>
        <input
          className="modal__submit"
          type="submit"
          value="Войти"
        />
      </form>
      <div className="modal__middle">или</div>
      <h2 className="modal__title modal__title--social">Войти через...</h2>
      <div className="modal__social">
        <div className="modal__item">
          <APIOuterLink className="modal__link" action={getAccountSocialInstagram}>
            <Icon name="instagram" className="modal__link-icon" />
            Instagram
          </APIOuterLink>
        </div>
        <li className="modal__item">
          <APIOuterLink className="modal__link" action={getAccountSocialFacebook}>
            <Icon name="facebook" className="modal__link-icon" />
            Facebook
          </APIOuterLink>
        </li>
      </div>
    </>
  )
}

export default PopupLogin
