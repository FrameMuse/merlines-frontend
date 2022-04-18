import { getAccountSocialFacebook, getAccountSocialInstagram, postAccountRegister } from "api/actions/account"
import ClientAPI from "api/client"
import { APIOuterLink } from "api/helpers"
import { Popup, usePopupContext } from "plugins/popup"
import { FormEvent } from "react"
import { useHistory } from "react-router-dom"
import { getFormElements } from "utils"

import Icon from "../common/Icon"
import PopupEmailConfirm from "./PopupEmailConfirm"
import PopupLogin from "./PopupLogin"


function PopupRegistration() {
  const { close: closeThisPopup } = usePopupContext()

  const history = useHistory()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    const userData = getFormElements(form.elements, "email", "password", "first_name", "last_name")
    if (!userData) return

    ClientAPI
      .query(postAccountRegister(userData))
      .then(({ error, payload }) => {
        if (error || !payload) return

        closeThisPopup()
        Popup.open(PopupEmailConfirm)
      })
  }
  return (
    <div style={{ width: "25em" }}>
      <div className="subnav subnav--modal modal__subnav">
        <button type="button" className="subnav-link" onClick={() => (Popup.open(PopupLogin), closeThisPopup())}>Вход</button>
        <button type="button" className="subnav-link subnav-link--active">Регистрация</button>
      </div>
      <h2 className="modal__title modal__title--registration">Регистрация через E-Mail</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        <label className="input-group modal__form-group">
          <input className="input-group__input" type="text" name="first_name" placeholder="Enter first name" />
          <div className="input-group__label">first name</div>
        </label>
        <label className="input-group modal__form-group">
          <input className="input-group__input" type="text" name="last_name" placeholder="Enter last name" />
          <div className="input-group__label">last name</div>
        </label>
        <label className="input-group modal__form-group">
          <input className="input-group__input" type="email" name="email" placeholder="Enter email" />
          <div className="input-group__label">email</div>
        </label>
        <label className="input-group modal__form-group">
          <input className="input-group__input" type="password" name="password" placeholder="Enter password" />
          <div className="input-group__label">password</div>
        </label>
        <label className="input-group modal__form-group">
          <input className="input-group__input" type="password" name="repeat-password" placeholder="Enter password once more" />
          <div className="input-group__label">password confirmation</div>
        </label>
        <div className="modal__bottom">
          <div className="checkbox checkbox--modal">
            <input className="checkbox-input" type="checkbox" id="check" />
            <label className="checkbox-label" htmlFor="check">
              <Icon name="checkbox" className="checkbox-icon" />
              Запомнить меня
            </label>
          </div>
        </div>
        <input className="modal__submit" type="submit" value="Зарегистрироваться" />
      </form>
      <div className="modal__middle">или</div>
      <h2 className="modal__title modal__title--social">Регистрация через...</h2>
      {/* <div className="modal__social">
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
      </div> */}
    </div>
  )
}

export default PopupRegistration
