import { putAccountPassword } from "api/actions/account"
import ClientAPI from "api/client"
import { usePopupContext } from "plugins/popup"
import { FormEvent } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getFormElements } from "utils"

import InputPassword from "./InputPassword"

function PopupPasswordResetConfirm(props: { session: string }) {
  const { close: closeThisPopup } = usePopupContext()
  const history = useHistory()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const userData = getFormElements(form.elements, "password", "password-repeat")
    if (!userData) return

    if (userData.password !== userData["password-repeat"]) {
      toast.error("Пароли не совпадает")
      return
    }

    ClientAPI
      .query(putAccountPassword(userData.password, props.session))
      .then(({ error, payload }) => {
        if (error || !payload) return

        closeThisPopup()
        toast.success("Пароль успешно изменен.")
        history.push({ search: "token=" + payload.token })
      })
  }

  return (
    <div style={{ width: "25em" }}>
      <h2 className="modal__title modal__title--text">Ввод нового пароля</h2>
      <p className="modal__text">Ведите новый пароль.</p>
      <form onSubmit={onSubmit} className="modal__form">
        <InputPassword name="password" placeholder="Новый пароль" />
        <InputPassword name="password-repeat" placeholder="Новый пароль ещё раз" />
        <input className="modal__submit" type="submit" value="Подтвердить" />
      </form>
    </div>
  )
}

export default PopupPasswordResetConfirm
