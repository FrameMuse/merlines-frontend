import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Svg from "./Svg"
import api from "../../api/api"
import routes from "../../routes"
import { errorMessages } from "../../constants"
import { selectAccessData, setLoginToken } from "../../reducers/accessDataSlice"
import "./logout.scss"

function Logout() {
  const history = useHistory()
  const dispatch = useDispatch()
  const accessData = useSelector(selectAccessData)

  const unsetCurrentUser = () => {
    dispatch(setLoginToken(""))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const onLogout = async (evt) => {
    evt.preventDefault()

    try {
      const result = await api.logout(accessData.loginToken)
      if (result) {
        unsetCurrentUser()
        history.push(routes.main)
        toast.success("Вы успешно вышли.")
        console.info("Logout successful.")
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
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
            console.log(error.response.data)
            toast.error(error.response.data.detail)
            unsetCurrentUser()
        }
      }
    }
  }

  return (
    <Link className="cabinet__logout" onClick={onLogout} to="#">
      Выйти{" "}
      <Svg
        svgClass="cabinet__logout-icon"
        svgName="logout"
        svgWidth="15"
        svgHeight="15"
      />
    </Link>
  )
}

export default Logout
