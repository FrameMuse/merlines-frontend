// Redux
import DEPRECATED__rootReducer__ from "Reducer"
import { combineReducers } from "redux"

import search from "./reducers/search"
import user from "./reducers/user"

const reducers = {
  user,
  search,
  // DEPRECATED
  ...(DEPRECATED__rootReducer__)
}

type RS = typeof reducers
export type ReducersType = { [key in keyof RS]: ReturnType<RS[key]> }

const combinedReducers = combineReducers(reducers)
export default combinedReducers
