import { connectRouter } from "connected-react-router"
import { combineReducers } from "redux"
import search from "redux/reducers/search"

import searchCalendar from "./components/DropDownCalendar/DropDownCalendarReducer"
import { loginReducer } from "./components/Login/LoginReducer"
import { signupReducer } from "./components/Signup/SignupReducer"
import accessDataSlice from "./reducers/accessDataSlice"
import filterSlice from "./reducers/filtersSlice"
import lkDataSlice from "./reducers/lkDataSlice"
import mainSearchParamsSlice from "./reducers/mainSearchSlice"
import priceCalendarSlice from "./reducers/priceCalendarSlice"
import routesDataSlice from "./reducers/routesDataSlice"
import searchResultBusTicketsSlice from "./reducers/searchResultBusTicketsSlice"
import searchResultSlice from "./reducers/searchResultSlice"
import searchResultTrainTicketsSlice from "./reducers/searchResultTrainTicketsSlice"

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    priceCalendar: priceCalendarSlice,
    mainSearchParams: mainSearchParamsSlice,
    search,
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
