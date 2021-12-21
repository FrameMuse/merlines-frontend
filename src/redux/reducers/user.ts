import { ValuesOf } from "interfaces/common"
import { AuthedUser, UnauthedUser, User } from "interfaces/user"

const initialState: UnauthedUser = {
  authed: false
}

interface Actions {
  USER_LOGIN: AuthedUser
  USER_LOGOUT: unknown
  USER_UPDATE: AuthedUser
}

type MapActions<Actions extends Record<string, any>> = {
  [key in keyof Actions]: {
    type: key
    payload: Actions[key]
  }
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): User => {
  switch (action.type) {

    case "USER_LOGIN":
      return { ...action.payload, authed: true }

    case "USER_LOGOUT":
      return initialState

    case "USER_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const loginUser = (payload: AuthedUser) => ({
  type: "USER_LOGIN",
  payload
})

export const logoutUser = {
  type: "USER_LOGOUT"
}

export const updateUser = (payload: Partial<AuthedUser>) => ({
  type: "USER_LOGIN",
  payload
})
