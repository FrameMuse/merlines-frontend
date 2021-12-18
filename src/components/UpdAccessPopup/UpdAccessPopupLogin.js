import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import api from "../../api/api"
import { accessPopupFieldsData } from "../../constants"
import { setLoginToken } from "../../reducers/accessDataSlice"
import Icon from "../common/Icon"
import UpdAccessPopupField from "./UpdAccessPopupField"

function UpdAccessPopupLogin({ userData, takeUserData, setPopupName }) {
  const dispatch = useDispatch()

  const onSubmitLoginForm = async (e) => {
    e.preventDefault()
    console.log(userData)

    try {
      const loginToken = await api.login(userData)
      console.log(loginToken)
      setPopupName("Подтверждение")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2 className="modal__title">Войти через E-Mail</h2>
      <form className="modal__form">
        {accessPopupFieldsData.login.data.map((field) => (
          <UpdAccessPopupField
            key={field.id}
            fieldId={field.id}
            fieldType={field.type}
            fieldName={field.name}
            inputName={field.inputName}
            fieldClass={field.class}
            inputValue={userData[field.inputName]}
            takeUserData={takeUserData}
          />
        ))}
        <div className="modal__bottom">
          <div className="checkbox checkbox--modal">
            <input className="checkbox-input" type="checkbox" id="check" />
            <label className="checkbox-label" htmlFor="check">
              <Icon
                className="checkbox-icon"
                name="checkbox"
                width="13"
                height="13"
              />
              Запомнить меня
            </label>
          </div>
        </div>
        <input
          onClick={onSubmitLoginForm}
          className="modal__submit"
          type="submit"
          value="Войти"
        />
      </form>
      <div className="modal__middle">или</div>
      <h2 className="modal__title modal__title--social">Войти через...</h2>
      <ul className="modal__social">
        <li className="modal__item">
          <Link className="modal__link" to="#">
            <Icon
              className="modal__link-icon"
              name="instagram"
              width="15"
              height="15"
            />
            Instagram
          </Link>
        </li>
        <li className="modal__item">
          <Link className="modal__link" to="#">
            <Icon
              className="modal__link-icon"
              name="facebook"
              width="15"
              height="15"
            />
            Facebook
          </Link>
        </li>
      </ul>
    </>
  )
}

export default UpdAccessPopupLogin
