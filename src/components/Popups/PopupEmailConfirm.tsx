import { useHistory } from "react-router-dom"


function PopupEmailConfirm() {
  const history = useHistory()

  // toast.success("Вы успешно изменили email.")
  // toast.success("Активация прошла успешно. Войдите в свой аккаунт.")
  // history.push("/login")

  return (
    <>
      <h2 className="modal__title modal__title--text">
        Подтверждение E-Mail
      </h2>
      <p className="modal__text">
        Для завершения регистраци, пожалуйста, проверьте свою электронную почту и перейдите по ссылке в письме, которое мы вам отправили.
      </p>
    </>
  )
}

export default PopupEmailConfirm
