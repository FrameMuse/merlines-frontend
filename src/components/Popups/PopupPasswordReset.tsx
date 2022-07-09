import { postAccountPassword } from "api/actions/account"
import ClientAPI from "api/client"
import { Popup, usePopupContext } from "plugins/popup"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import PopupPasswordResetConfirm from "./PopupPasswordResetConfirm"


function PopupPasswordReset() {
  const { close: closeThisPopup } = usePopupContext()

  const [email, setEmail] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    ClientAPI
      .query(postAccountPassword(email))
      .then(({ error }) => {
        if (error) return

        closeThisPopup()
        // Popup.open(PopupPasswordResetConfirm)

        toast.success("Ссылка на смену пароля отправлена на указанный email")
      })
  }

  return (
    <div style={{ maxWidth: "25em" }}>
      <h2 className="modal__title">Смена пароля</h2>
      <p className="modal__text">
        Для смены пароля введите вашу почту, чтобы мы могли выслать письмо со<br />
        ссылкой на смену пароля. Пожалуйста, проверьте почту и перейдете по<br />
        ссылке из электронно письма, чтобы сменить пароль.
      </p>
      <form className="modal__form" onSubmit={onSubmit}>
        <div className="input-group modal__form-group modal__form-group--margin">
          <input
            name="email"
            type="email"
            className="input-group__input"
            placeholder="email"
            onChange={event => setEmail(event.target.value)}
            autoComplete="off"
          />
          <div className="input-group__label">E-mail</div>
        </div>
        <input
          className="modal__submit"
          type="submit"
          value="Отправить"
        />
      </form>
      <p className="modal__info">
        Если вы не получили письмо - <Link to="#">нажмите здесь</Link>, мы
        отправим его еще раз
      </p>
    </div>
  )
}

export default PopupPasswordReset
