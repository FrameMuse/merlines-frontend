import { AuthedUser, UnauthedUser, User } from "interfaces/user"

const initialState: UnauthedUser = {
  authed: false
}

interface Action {
  type: "USER_LOGIN" | "USER_LOGOUT" | "USER_UPDATE"
  payload: User
}

export default (state = initialState, action: Action): User => {
  switch (action.type) {

    case "USER_LOGIN": return action.payload
    case "USER_LOGOUT": return initialState
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
