import { ChangeEvent, FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"

import { validationMessages } from "../../constants"

function PopupResetConfirm() {
  const history = useHistory()
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")
  const [newPasswordValidity, setNewPasswordValidity] = useState(true)
  const [isPasswordHide, setIsPasswordHide] = useState(true)

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value)
    setNewPasswordValidity(event.target.validity.valid)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()


    toast.success("Пароль успешно изменен.")
    history.push("/login")
  }

  return (
    <div style={{ width: "25em" }}>
      <h2 className="modal__title modal__title--text">Ввод нового пароля</h2>
      <p className="modal__text">Ведите новый пароль.</p>
      <form onSubmit={onSubmit} className="modal__form">
        <div className="input-group modal__form-group modal__form-group--margin">
          <input
            className="input-group__input"
            type={isPasswordHide ? "password" : "text"}
            id="newPassword"
            placeholder="новый пароль"
            minLength={8}
            autoComplete="off"
            onChange={handleOnChangeInput}
          />

          {!newPasswordValidity ? (
            <label
              className="input-group__label input-group__label--error"
              htmlFor="newPassword"
            >
              {validationMessages.password}
            </label>
          ) : (
            <label className="input-group__label" htmlFor="newPassword">новый пароль</label>
          )}
          <input
            className="input-group__input"
            type={isPasswordHide ? "password" : "text"}
            id="newPassword"
            placeholder="новый пароль"
            minLength={8}
            autoComplete="off"
            onChange={event => setNewPasswordConfirm(event.currentTarget.value)}
          />
          {!newPasswordValidity ? (
            <label
              className="input-group__label input-group__label--error"
              htmlFor="newPassword"
            >
              {validationMessages.password}
            </label>
          ) : (
            <label className="input-group__label" htmlFor="newPassword">новый пароль</label>
          )}
          <button
            className={`show-password ${isPasswordHide ? "show-password--active" : ""}`}
            onClick={() => setIsPasswordHide(!isPasswordHide)}
            type="button"
            aria-label="Показать пароль"
          >
            <svg className="show-password__icon" width="24" height="24">
              <use
                className="show-password__icon-on"
                href="img/sprite.svg#visibility"
              ></use>
              <use
                className="show-password__icon-off"
                href="img/sprite.svg#visibility-off"
              ></use>
            </svg>
          </button>
        </div>
        <input className="modal__submit" type="submit" value="Подтвердить" />
      </form>
    </div>
  )
}

export default PopupResetConfirm
