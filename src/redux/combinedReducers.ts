// Redux
import searchCalendar from "components/DropDownCalendar/DropDownCalendarReducer"
import { combineReducers } from "redux"

import search from "./reducers/search"
import user from "./reducers/user"

const reducers = {
  user,
  search,
  searchCalendar
}

const combinedReducers = combineReducers(reducers)
export default combinedReducers
