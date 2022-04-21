import { getAccountSocialFacebook, getAccountSocialInstagram, postAccountToken } from "api/actions/account"
import ClientAPI from "api/client"
import { APIOuterLink } from "api/helpers"
import { Popup, usePopupContext } from "plugins/popup"
import { FormEvent, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getFormElements } from "utils"

import Icon from "../common/Icon"
import PopupPasswordReset from "./PopupPasswordReset"
import PopupRegistration from "./PopupRegistration"


function PopupLogin() {
  const { close: closeThisPopup } = usePopupContext()

  const history = useHistory()
  const user = useSelector(state => state.user)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    const userData = getFormElements(form.elements, "email", "password")
    if (!userData) return

    ClientAPI
      .query(postAccountToken(userData))
      .then(({ error, payload }) => {
        if (error || !payload) return

        history.push({ search: "token=" + payload.token })
      })
  }

  useEffect(() => {
    if (!user.auth) return
    closeThisPopup()
  }, [user.auth])

  return (
    <div style={{ width: "25em" }}>
      <div className="subnav subnav--modal modal__subnav">
        <button type="button" className="subnav-link subnav-link--active">Вход</button>
        <button type="button" className="subnav-link" onClick={() => (Popup.open(PopupRegistration), closeThisPopup())}>Регистрация</button>
      </div>
      <h2 className="modal__title">Войти через E-Mail</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        <div className="input-group modal__form-group">
          <input className="input-group__input" type="email" name="email" placeholder="Enter email" />
          <label className="input-group__label">email</label>
        </div>
        <div className="input-group modal__form-group">
          <input className="input-group__input" type="password" name="password" placeholder="Enter password" />
          <label className="input-group__label">password</label>
        </div>
        <div className="modal__bottom">
          <div className="checkbox checkbox--modal">
            <input className="checkbox-input" type="checkbox" id="check" />
            <label className="checkbox-label" htmlFor="check">
              <Icon name="checkbox" className="checkbox-icon" />
              Запомнить меня
            </label>
          </div>
          <button className="modal__link-recovery" type="button" onClick={() => Popup.open(PopupPasswordReset)}>Забыли пароль?</button>
        </div>
        <input className="modal__submit" type="submit" value="Войти" />
      </form>
      {/* <div className="modal__middle">или</div> */}
      {/* <h2 className="modal__title modal__title--social">Войти через...</h2> */}
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

export default PopupLogin
