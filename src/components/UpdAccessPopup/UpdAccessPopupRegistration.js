import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectAccessData, setUserInfo } from "../../reducers/accessDataSlice"
import Svg from "../common/Svg"
import { accessPopupFieldsData } from "../../constants"
import api from "../../api/api"
import UpdAccessPopupField from "./UpdAccessPopupField"

function UpdAccessPopupRegistration({
  userData,
  takeUserData,
  setPopupName,
  setUserData
}) {
  const dispatch = useDispatch()
  const accessData = useSelector(selectAccessData)
  console.log(accessData.userData)

  const onSubmitRegisterForm = async (e) => {
    e.preventDefault()
    try {
      const regData = await api.registration(userData)
      console.log(userData)
      console.log(regData.data)
      dispatch(setUserInfo(regData.data))
      setPopupName("Вход")
      setUserData("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2 className="modal__title modal__title--registration">
        Регистрация через E-Mail
      </h2>
      <form className="modal__form">
        {accessPopupFieldsData.registration.data.map((field) => (
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
              <Svg
                svgClass="checkbox-icon"
                svgName="checkbox"
                svgWidth="13"
                svgHeight="13"
              />
              Запомнить меня
            </label>
          </div>
        </div>
        <input
          onClick={onSubmitRegisterForm}
          className="modal__submit"
          type="submit"
          value="Зарегистрироваться"
        />
      </form>
      <div className="modal__middle">или</div>
      <h2 className="modal__title modal__title--social">
        Регистрация через...
      </h2>
      <ul className="modal__social">
        <li className="modal__item">
          <Link className="modal__link" to="#">
            <Svg
              svgClass="modal__link-icon"
              svgName="instagram"
              svgWidth="15"
              svgHeight="15"
            />
            Instagram
          </Link>
        </li>
        <li className="modal__item">
          <Link className="modal__link" to="#">
            <Svg
              svgClass="modal__link-icon"
              svgName="facebook"
              svgWidth="15"
              svgHeight="15"
            />
            Facebook
          </Link>
        </li>
      </ul>
    </>
  )
}

export default UpdAccessPopupRegistration
