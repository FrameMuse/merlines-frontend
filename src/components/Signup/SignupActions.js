import axios from "axios"
import { push } from "connected-react-router"
import { toast } from "react-toastify"

import api from "../../api/api"
import { BASE_URL, errorMessages } from "../../constants"
import { setErrorMessage } from "../../reducers/accessDataSlice"
import { takeErrors } from "../../utils"
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS
} from "./SignupTypes"

axios.defaults.baseURL = BASE_URL

export const signupNewUser = (userData) => (dispatch) => {
  dispatch({ type: CREATE_USER_SUBMITTED }) // set submitted state
  api
    .registration(userData)
    // .post('/users/', userData)
    .then((response) => {
      console.log(response)
      console.info(
        `Account for ${userData.username} (${userData.email}) created successfully. Please login.`
      )
      dispatch({ type: CREATE_USER_SUCCESS })
      toast.success(
        `Спасибо за регистрацию ${response.data.first_name}${response.data.last_name && ` ${response.data.last_name}`
        }.`
      )
      dispatch(push("/activate/_/_"))
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
          default: {
            const errorsData = takeErrors(error.response.data)
            errorsData.map((errorText) => toast.error(errorText))
            console.error(JSON.stringify(error.response.data))
            dispatch(setErrorMessage(error.response.data))
            dispatch({
              type: CREATE_USER_ERROR,
              errorData: error.response.data
            })
          }
        }
      } else if (error.message) {
        // the error message is available,
        // let's display it on error toast
        console.error("error message", JSON.stringify(error.message))
      } else {
        // strange error, just show it
        console.error(JSON.stringify(error))
      }
    })
}
