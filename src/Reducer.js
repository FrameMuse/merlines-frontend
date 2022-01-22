
import accessDataSlice from "./reducers/accessDataSlice"
import lkDataSlice from "./reducers/lkDataSlice"
import mainSearchParamsSlice from "./reducers/mainSearchSlice"
import priceCalendarSlice from "./reducers/priceCalendarSlice"
import routesDataSlice from "./reducers/routesDataSlice"

const DEPRECATED__rootReducer__ = ({
  priceCalendar: priceCalendarSlice,
  mainSearchParams: mainSearchParamsSlice,
  accessData: accessDataSlice,
  routesData: routesDataSlice,
  lkData: lkDataSlice
})

export default DEPRECATED__rootReducer__
