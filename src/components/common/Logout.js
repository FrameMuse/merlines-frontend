import "./logout.scss"

import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { logoutUser } from "redux/reducers/user"

import useLocalization from "../../plugins/localization/hook"
import Icon from "./Icon"

function Logout() {
  const ll = useLocalization(ll => ll)
  const history = useHistory()
  const dispatch = useDispatch()


  function onClick() {
    localStorage.removeItem("token")
    dispatch(logoutUser)

    history.push("/")
    toast.success("Вы успешно вышли")
  }

  return (
    <button className="cabinet__logout" type="button" onClick={onClick}>
      {ll.lk.exit}
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
