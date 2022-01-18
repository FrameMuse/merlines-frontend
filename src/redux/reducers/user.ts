import { ValuesOf } from "interfaces/common"
import { Anonymous, Client, User } from "interfaces/user"
import { MapActions } from "redux/helpers"

const initialState: Anonymous = {
  auth: false
}

interface Actions {
  USER_LOGIN: Client
  USER_LOGOUT: unknown
  USER_UPDATE: Client
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): User => {
  switch (action.type) {

    case "USER_LOGIN":
      return { ...action.payload, auth: true }

    case "USER_LOGOUT":
      return initialState

    case "USER_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const loginUser = (payload: Client) => ({
  type: "USER_LOGIN",
  payload
})

export const logoutUser = {
  type: "USER_LOGOUT"
}

export const updateUser = (payload: Partial<Client>) => ({
  type: "USER_LOGIN",
  payload
})
