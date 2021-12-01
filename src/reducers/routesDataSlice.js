import { createSlice } from "@reduxjs/toolkit"

export const routesDataSlice = createSlice({
  name: "routesDataSlice",
  initialState: {
    historyRoute: "",
    priceCalendarSearchRoutes: {
      air: "",
      train: "",
      bus: ""
    }
  },
  reducers: {
    setHistoryRoute: (state, action) => {
      state.historyRoute = action.payload
    },
    setPriceCalendarSearchRouteAir: (state, action) => {
      state.priceCalendarSearchRoutes.air = action.payload
    },
    setPriceCalendarSearchRouteTrain: (state, action) => {
      state.priceCalendarSearchRoutes.train = action.payload
    },
    setPriceCalendarSearchRouteBus: (state, action) => {
      state.priceCalendarSearchRoutes.bus = action.payload
    }
  }
})

export const {
  setHistoryRoute,
  setPriceCalendarSearchRouteAir,
  setPriceCalendarSearchRouteTrain,
  setPriceCalendarSearchRouteBus
} = routesDataSlice.actions

export const selectRoutesData = (state) => state.routesData
export default routesDataSlice.reducer
