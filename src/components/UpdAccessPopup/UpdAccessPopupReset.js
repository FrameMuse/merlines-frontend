import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import api from "../../api/api"
import { errorMessages } from "../../constants"
import { takeErrors } from "../../utils"
import Icon from "../common/Icon"

function UpdAccessPopupReset() {
  const [isOpen, setIsOpen] = useState(true)
  const [email, setEmail] = useState("")

  const resetPassword = async (evt) => {
    evt.preventDefault()

    try {
      const result = await api.resetPassword({ email })
      if (result) {
        toast.success("Ссылка на смену пароля отправлена на указанный email")
        // history.push('/login');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            return toast.error(
              error.response.statusText
                ? error.response.statusText
                : errorMessages.error404
            )
          case 500:
            return toast.error(
              error.response.statusText
                ? error.response.statusText
                : errorMessages.error500
            )
          default: {
            const errorsData = takeErrors(error.response.data)
            errorsData.map((errorText) => toast.error(errorText))
            console.log(error.response.data)
            console.log(error)
          }
        }
      }
    }
  }

  return (
    <section className={`modal ${isOpen ? "modal--opened" : ""}`}>
      <button onClick={() => setIsOpen(false)} className="modal__close">
        <span className="modal__close-text">закрыть</span>
        <Icon
          className="modal__close-icon"
          name="close"
          width="15"
          height="15"
        />
      </button>
      <div className="modal__container">
        <h2 className="modal__title modal__title--text">Смена пароля</h2>
        <p className="modal__text">
          Для смены пароля введите вашу почту, чтобы мы могли выслать письмо со
          ссылкой на смену пароля. Пожалуйста, проверьте почту и перейдете по
          ссылке из электронно письма, чтобы сменить пароль.
        </p>
        <form className="modal__form">
          <div className="input-group modal__form-group modal__form-group--margin">
            <input
              className="input-group__input"
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              autoComplete="off"
            />
            <label className="input-group__label" htmlFor="email">
              E-mail
            </label>
          </div>
          <input
            onClick={resetPassword}
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
    </section>
  )
}

export default UpdAccessPopupReset
