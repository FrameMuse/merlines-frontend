import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Svg from "../common/Svg"
import api from "../../api/api"
import routes from "../../routes"
import { toast } from "react-toastify"
import { takeErrors } from "../../utils"
import { errorMessages } from "../../constants"
import {
  selectAccessData,
  setIsChangedEmail
} from "../../reducers/accessDataSlice"
import { setLkEmail } from "../../reducers/lkDataSlice"

function UpdAccessPopupConfirm() {
  const [isOpen, setIsOpen] = useState(true)
  let { uid, token } = useParams()
  const history = useHistory()
  const [activationCodeFromInput, setactivAtionCodeFromInput] = useState("")
  const dispatch = useDispatch()
  const accessData = useSelector(selectAccessData)

  const activate = async (evt) => {
    evt.preventDefault()

    try {
      const activationCodeParams = activationCodeFromInput.split("/")
      const result = await api.activation({
        uid: activationCodeParams[0],
        token: activationCodeParams[1]
      })
      if (result) {
        if (accessData.isChangedEmail) {
          toast.success("Вы успешно изменили email.")
          console.log("success change email done")
          history.push(routes.lk.base)
          dispatch(setLkEmail(accessData.newEmail))
          dispatch(setIsChangedEmail(false))
        } else {
          toast.success("Активация прошла успешно. Войдите в свой аккаунт.")
          console.log("success registration done")
          history.push("/login")
        }
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return console.log(error.response)
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

  useEffect(() => {
    setactivAtionCodeFromInput(`${uid}/${token}`)
  }, [uid, token])

  return (
    <section className={`modal ${isOpen ? "modal--opened" : ""}`}>
      <button onClick={() => setIsOpen(false)} className="modal__close">
        <span className="modal__close-text">закрыть</span>
        <Svg
          svgClass="modal__close-icon"
          svgName="close"
          svgWidth="15"
          svgHeight="15"
        />
      </button>
      <div className="modal__container">
        <h2 className="modal__title modal__title--text">
          {accessData.isChangedEmail
            ? "Подтверждение нового E-Mail"
            : "Подтверждение E-Mail"}
        </h2>
        <p className="modal__text">
          {`Для завершения ${accessData.isChangedEmail ? "обновления email" : "регистрации"}, пожалуйста, проверьте свою электронную почту и перейдите по ссылке в письме, которое мы вам отправили. Или, введите код из письма в поле ниже.`}
        </p>
        <form className="modal__form">
          <div className="input-group modal__form-group modal__form-group--margin">
            <input
              className="input-group__input"
              type="text"
              id="code"
              placeholder="код из письма"
              value={activationCodeFromInput}
              onChange={(evt) => setactivAtionCodeFromInput(evt.target.value)}
            />
            <label className="input-group__label" htmlFor="code">
              код из письма
            </label>
          </div>
          <input
            onClick={activate}
            className="modal__submit"
            type="submit"
            value="Подтвердить"
          />
        </form>
      </div>
    </section>
  )
}

export default UpdAccessPopupConfirm
