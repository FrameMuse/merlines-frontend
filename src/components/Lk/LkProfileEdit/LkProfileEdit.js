import { useState } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { errorMessages } from "../../../constants"
import api from "../../../api/api"
import { useSelector, useDispatch } from "react-redux"
import {
  selectLkData,
  setLkFirstName,
  setLkLastName
} from "../../../reducers/lkDataSlice"
import {
  selectAccessData,
  setIsChangedEmail,
  setNewEmail
} from "../../../reducers/accessDataSlice"
import { validationMessages } from "../../../constants"

function LkProfileEdit() {
  const history = useHistory()
  const dispatch = useDispatch()
  const accessData = useSelector(selectAccessData)
  const lkData = useSelector(selectLkData)
  const userData = JSON.parse(localStorage.getItem("user"))

  const [firstName, setFirstName] = useState(userData.first_name)
  const [lastName, setLastName] = useState(userData.last_name)
  const [email, setEmail] = useState(userData.email)
  const [isSaved, setIsSaved] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [currentPasswordValidity, setCurrentPasswordValidity] = useState(true)
  const [isCurrentPasswordHide, setIsCurrentPasswordHide] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordValidity, setNewPasswordValidity] = useState(true)
  const [isNewPasswordHide, setIsNewPasswordHide] = useState(true)
  const [isSamePasswords, setIsSamePasswords] = useState(false)

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value)
    dispatch(setNewEmail(evt.target.value))
  }

  const onChangeOldPassword = (evt) => {
    setCurrentPassword(evt.target.value)
    setCurrentPasswordValidity(evt.target.validity.valid)
  }

  const onChangeNewPassword = (evt) => {
    setNewPassword(evt.target.value)
    setNewPasswordValidity(evt.target.validity.valid)
    setIsSamePasswords(currentPassword === evt.target.value)
  }

  const createParams = () => {
    let paramsObj = {}
    if (lkData.firstName !== firstName) {
      paramsObj.first_name = firstName
    }
    if (lkData.lastName !== lastName) {
      paramsObj.last_name = lastName
    }
    if (lkData.email !== email) {
      paramsObj.email = email
    }
    if (currentPassword) {
      paramsObj.current_password = currentPassword
    }
    if (newPassword) {
      paramsObj.new_password = newPassword
    }

    return paramsObj
  }

  const editUserData = async (evt) => {
    evt.preventDefault()

    const paramsData = createParams()
    console.log(paramsData)

    if (paramsData.first_name || paramsData.last_name || paramsData.email) {
      try {
        const result = await api.editUserInfo(accessData.loginToken, {
          ...paramsData
        })
        if (result) {
          console.log(result)
          localStorage.setItem("user", JSON.stringify(result.data))
          setIsSaved(true)
          dispatch(setLkFirstName(result.data.first_name))
          dispatch(setLkLastName(result.data.last_name))

          if (paramsData.email) {
            dispatch(setIsChangedEmail(true))
            history.push("/activate/_/_")
            toast.success(
              "Для изменения почты необходимо повторно пройти активацию."
            )
          }
        }
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              console.log(error.response)
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
            default:
              toast.error(error.response.data.detail)
              // const errorsData = takeErrors(error.response.data);
              // errorsData.map(errorText => toast.error(errorText));
              console.log(error.response.data)
              console.log(error.response.data)
              console.log(error)
          }
        }
      }
    }

    if (paramsData.current_password && paramsData.new_password) {
      if (isSamePasswords) {
        toast.error("Новый пароль совпадает с текущим.")
      } else {
        try {
          const passwordResult = await api.changePassword(
            accessData.loginToken,
            {
              current_password: paramsData.current_password,
              new_password: paramsData.new_password
            }
          )
          if (passwordResult) {
            toast.success("Пароль успешно изменен.")
          }
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                return toast.error(
                  error.response.data.current_password[0] &&
                    "Вы ввели неправильный текущий пароль"
                )
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
              default:
                toast.error(error.response.data.detail)
                // const errorsData = takeErrors(error.response.data);
                // errorsData.map(errorText => toast.error(errorText));
                console.log(error.response.data)
                console.log(error.response.data)
                console.log(error)
            }
          }
        }
      }
    }
  }

  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--profile">
        <h2 className="cabinet__title">Редактирование профиля</h2>
        {isSaved && (
          <span className="cabinet__edit-info cabinet__edit-info--active">
            Изменения сохранены
          </span>
        )}
      </div>
      <form onSubmit={editUserData} className="form-profile">
        <div className="form-profile__row">
          <div className="input-group form-profile__group">
            <input
              className="input-group__input"
              type="text"
              id="name"
              value={firstName}
              placeholder="Имя"
              onChange={(evt) => setFirstName(evt.target.value)}
            />
            <label className="input-group__label" htmlFor="name">
              Имя
            </label>
          </div>
          <div className="input-group">
            <input
              className="input-group__input"
              type="text"
              id="surname"
              value={lastName}
              placeholder="Фамилия"
              onChange={(evt) => setLastName(evt.target.value)}
            />
            <label className="input-group__label" htmlFor="surname">
              Фамилия
            </label>
          </div>
        </div>
        {currentPassword || newPassword ? (
          <p>Нельзя одновременно менять пароль и email</p>
        ) : (
          <div className="form-profile__row">
            <div className="input-group">
              <input
                className="input-group__input"
                type="email"
                id="email"
                value={email}
                placeholder="Новый e-mail"
                onChange={onChangeEmail}
              />
              <label className="input-group__label" htmlFor="email">
                Новый e-mail
              </label>
            </div>
          </div>
        )}
        {!accessData.newEmail || accessData.newEmail === lkData.email ? (
          <>
            <div className="form-profile__row">
              <div className="input-group form-profile__group">
                <input
                  className="input-group__input"
                  type={isCurrentPasswordHide ? "password" : "text"}
                  id="old_password"
                  value={currentPassword}
                  onChange={onChangeOldPassword}
                  minLength={8}
                  placeholder="Старый пароль"
                  autoComplete="off"
                />
                {!currentPasswordValidity ? (
                  <label
                    className="input-group__label input-group__label--error"
                    htmlFor="old_password"
                  >
                    {validationMessages.password}
                  </label>
                ) : (
                  <label className="input-group__label" htmlFor="old_password">
                    Старый пароль
                  </label>
                )}
                <button
                  className={`show-password ${
                    isCurrentPasswordHide ? "show-password--active" : ""
                  }`}
                  onClick={() =>
                    setIsCurrentPasswordHide(!isCurrentPasswordHide)
                  }
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
              <div className="input-group">
                <input
                  className="input-group__input"
                  type={isNewPasswordHide ? "password" : "text"}
                  id="new_password"
                  value={newPassword}
                  onChange={onChangeNewPassword}
                  minLength={8}
                  placeholder="Новый пароль"
                  autoComplete="off"
                />
                {!newPasswordValidity ? (
                  <label
                    className="input-group__label input-group__label--error"
                    htmlFor="new_password"
                  >
                    {validationMessages.password}
                  </label>
                ) : isSamePasswords ? (
                  <label
                    className="input-group__label input-group__label--error"
                    htmlFor="new_password"
                  >
                    Новый пароль совпадает с текущим
                  </label>
                ) : (
                  <label className="input-group__label" htmlFor="new_password">
                    Новый пароль
                  </label>
                )}
                <button
                  className={`show-password ${
                    isNewPasswordHide ? "show-password--active" : ""
                  }`}
                  onClick={() => setIsNewPasswordHide(!isNewPasswordHide)}
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
            </div>
          </>
        ) : (
          <p>Нельзя одновременно менять пароль и email</p>
        )}
        <input className="btn btn--profile" type="submit" value="Сохранить" />
      </form>
    </>
  )
}

export default LkProfileEdit
