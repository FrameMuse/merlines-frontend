import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import priceCalendarSlice from "./reducers/priceCalendarSlice"
import mainSearchParamsSlice from "./reducers/mainSearchSlice"
import accessDataSlice from "./reducers/accessDataSlice"
import searchResultSlice from "./reducers/searchResultSlice"
import searchResultBusTicketsSlice from "./reducers/searchResultBusTicketsSlice"
import searchResultTrainTicketsSlice from "./reducers/searchResultTrainTicketsSlice"
import filterSlice from "./reducers/filtersSlice"
import routesDataSlice from "./reducers/routesDataSlice"
import lkDataSlice from "./reducers/lkDataSlice"

import { loginReducer } from "./components/Login/LoginReducer"
import { signupReducer } from "./components/Signup/SignupReducer"
import searchCalendar from "./components/DropDownCalendar/DropDownCalendarReducer"

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    priceCalendar: priceCalendarSlice,
    mainSearchParams: mainSearchParamsSlice,
    searchCalendar,
    auth: loginReducer,
    createUser: signupReducer,
    accessData: accessDataSlice,
    searchResult: searchResultSlice,
    filter: filterSlice,
    routesData: routesDataSlice,
    lkData: lkDataSlice,
    searchResultBusTicketsSlice: searchResultBusTicketsSlice,
    searchResultTrainTicketsSlice: searchResultTrainTicketsSlice
  })

export default rootReducer
