import axios from "axios"
import { push } from "connected-react-router"
import { BASE_URL, errorMessages } from "../../constants"
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes"
import { setAxiosAuthToken, simpleOnError, takeErrors } from "../../utils"
import routes from "../../routes"
import { setLoginToken } from "../../reducers/accessDataSlice"
import { toast } from "react-toastify"
import {
  setLkFirstName,
  setLkLastName,
  setLkEmail
} from "../../reducers/lkDataSlice"
import api from "../../api/api"

axios.defaults.baseURL = BASE_URL

const login = (userData, redirectTo, isRememberMe) => (dispatch) => {
  api
    .login(userData)
    .then((response) => {
      const { auth_token } = response.data
      setAxiosAuthToken(auth_token)
      dispatch(setToken(auth_token, isRememberMe))

      dispatch(setLoginToken(auth_token))
      toast.success("Вы успешно вошли.")
      dispatch(getCurrentUser(redirectTo, isRememberMe))
    })
    .catch((error) => {
      console.log(error.response)
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return toast.error(error.response.data.detail)
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
            const errorsData = takeErrors(error.response.data)
            errorsData.map((errorText) => toast.error(errorText))
            dispatch(unsetCurrentUser())
            simpleOnError(error)
        }
      }
    })
}

const getCurrentUser = (redirectTo, isRememberMe) => (dispatch) => {
  axios
    .get("/users/me/")
    .then((response) => {
      const user = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email
      }
      dispatch(setCurrentUser(user, redirectTo, isRememberMe))
      dispatch(setLkFirstName(user.first_name))
      dispatch(setLkLastName(user.last_name))
      dispatch(setLkEmail(user.email))
    })
    .catch((error) => {
      dispatch(unsetCurrentUser())
      simpleOnError(error)
    })
}

const setCurrentUser = (user, redirectTo, isRememberMe) => (dispatch) => {
  !isRememberMe
    ? localStorage.setItem("user", JSON.stringify(user))
    : sessionStorage.setItem("user", JSON.stringify(user))
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  })

  console.log("set user" + redirectTo)
  // dispatch(push(routes.main));

  if (redirectTo !== "") {
    dispatch(push(redirectTo))
  }
}

const setToken = (token, isRememberMe) => (dispatch) => {
  setAxiosAuthToken(token)
  !isRememberMe
    ? localStorage.setItem("token", token)
    : sessionStorage.setItem("token", token)
  dispatch({
    type: SET_TOKEN,
    payload: token
  })
}

const unsetCurrentUser = () => (dispatch) => {
  setAxiosAuthToken("")
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  dispatch({
    type: UNSET_CURRENT_USER
  })
}

const logout = () => (dispatch) => {
  axios
    .post("/token/logout/")
    .then((response) => {
      dispatch(unsetCurrentUser())
      dispatch(push(routes.main))
      dispatch(setLoginToken(""))
      toast.success("Вы успешно вышли.")
      console.info("Logout successful.")
    })
    .catch((error) => {
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
            dispatch(unsetCurrentUser())
            simpleOnError(error)
        }
      }
    })
}

export {
  login,
  logout,
  setToken,
  getCurrentUser,
  setCurrentUser,
  unsetCurrentUser
}
