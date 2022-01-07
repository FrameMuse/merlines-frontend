import "./logout.scss"

import { deleteAccountToken } from "api/actions/account"
import ClientAPI from "api/client"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { logoutUser } from "redux/reducers/user"

import Icon from "./Icon"

function Logout() {
  const history = useHistory()
  const dispatch = useDispatch()


  function onClick() {
    ClientAPI
      .query(deleteAccountToken)
      .then(({ error }) => {
        if (error) return

        localStorage.removeItem("token")
        dispatch(logoutUser)

        history.push("/")
        toast.success("Вы успешно вышли")
      })
  }

  return (
    <button className="cabinet__logout" type="button" onClick={onClick}>
      Выйти
      {" "}
      <Icon
        className="cabinet__logout-icon"
        name="logout"
        width="15"
        height="15"
      />
    </button>
  )
}

export default Logout
