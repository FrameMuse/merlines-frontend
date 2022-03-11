import "../form-profile.scss"

import { patchAccountMe, putAccountMePassword } from "api/actions/account"
import ClientAPI from "api/client"
import InputPassword from "components/Popups/InputPassword"
import { FormElements } from "interfaces/common"
import { FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { loginUser } from "redux/reducers/user"
import { getFormElements } from "utils"


function UserCabinetEdit() {
  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--profile">
        <h2 className="cabinet__title">Редактирование профиля</h2>
      </div>
      <div className="cabinet__edit">
        <FormProfileEditBasic />
        <FormProfileEditEmail />
        <FormProfileEditPassword />
      </div>
    </>
  )
}

function FormProfileEditBasic() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  // TODO: Validation
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    // TODO: Save

    const elements = form.elements as FormElements<"first_name" | "last_name">
    const userData = {
      first_name: elements.first_name.value,
      last_name: elements.last_name.value
    }
    if (!userData.first_name.length) return

    ClientAPI
      .query(patchAccountMe(userData))
      .then(({ error, payload }) => {
        if (error || !payload) return

        dispatch(loginUser(payload))
        toast.success("Data changed")
      })
  }
  if (!user.auth) return <>no auth</>
  return (
    <form onSubmit={onSubmit} className="form-profile">
      <label className="form-profile__row">
        <label className="input-group form-profile__group">
          <input
            className="input-group__input"
            type="text"
            name="first_name"
            defaultValue={user.first_name}
            placeholder="Имя"
          />
          <div className="input-group__label">Имя</div>
        </label>
        <div className="input-group">
          <input
            className="input-group__input"
            type="text"
            name="last_name"
            defaultValue={user.last_name}
            placeholder="Фамилия"
          />
          <div className="input-group__label">Фамилия</div>
        </div>
      </label>
      <input className="btn btn--profile" type="submit" value="Сохранить" />
    </form>
  )
}

function FormProfileEditEmail() {
  // TODO: Validation
  function onSubmit() {
    // TODO: Save

    // ClientAPI
    //   .query(patchAccountMe())
  }
  return (
    <form onSubmit={onSubmit} className="form-profile">
      <div className="form-profile__row">
        <label className="input-group">
          <input
            className="input-group__input"
            type="email"
            placeholder="Новый e-mail"
          />
          <div className="input-group__label">Новый e-mail</div>
        </label>
      </div>
      <input className="btn btn--profile" type="submit" value="Изменить" />
    </form>
  )
}

function FormProfileEditPassword() {
  // TODO: Validation
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    // TODO: Save

    const userData = getFormElements(form.elements, "old_password", "new_password")
    if (!userData) return

    ClientAPI
      .query(putAccountMePassword(userData))
      .then(({ error, payload }) => {
        if (error || !payload) return

        toast.success("Data changed")
      })
  }
  return (
    <form onSubmit={onSubmit} className="form-profile">
      <div className="form-profile__row">
        <InputPassword
          className="input-group__input"
          name="old_password"
          minLength={8}
          placeholder="Старый пароль"
          autoComplete="off"
        />
        <InputPassword
          className="input-group__input"
          name="new_password"
          minLength={8}
          placeholder="Новый пароль"
          autoComplete="off"
        />
      </div>
      <input className="btn btn--profile" type="submit" value="Изменить" />
    </form>
  )
}

export default UserCabinetEdit
