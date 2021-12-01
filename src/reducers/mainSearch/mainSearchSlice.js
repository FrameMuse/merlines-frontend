import { createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"
import { monthNamesDate } from "../constants"
import { firstToUpperCase } from "../utils"

export const mainSearchParamsSlice = createSlice({
  name: "mainSearchParams",
  initialState: {
    date: {
      api: {
        from: "",
        to: ""
      },
      front: {
        from: "",
        to: ""
      },
      changedInput: {
        from: "",
        to: ""
      },
      mini: {
        from: "",
        to: ""
      }
    },
    route: {
      api: {
        from: "",
        to: ""
      },
      front: {
        from: "",
        to: ""
      }
    },
    passengers: {
      passengers_adults: 1,
      passengers_children: 0,
      passengers_infants: 0
    },
    airClasses: {
      economy: true,
      business: false
    },
    passengersInfo: "",
    passengersInfoMini: "",
    numberOfChanges: 0,
    transport: "air",
    one_way: true,
    searchParams: ""
  },
  reducers: {
    setDateFrom: (state, action) => {
      const apiFrom = DateTime.isDateTime(action.payload)
        ? action.payload.toISO().slice(0, 10)
        : action.payload
      const frontFrom = DateTime.isDateTime(action.payload)
        ? action.payload
        : DateTime.fromISO(action.payload)
      state.date.api.from = action.payload ? apiFrom : ""
      state.date.front.from = action.payload
        ? `${frontFrom.day} ${
            monthNamesDate[frontFrom.month]
          }, ${firstToUpperCase(frontFrom.weekdayShort)}`
        : ""
      state.date.mini.from = action.payload
        ? `${frontFrom.day} ${monthNamesDate[frontFrom.month]}`
        : ""
    },
    setDateTo: (state, action) => {
      const apiTo = DateTime.isDateTime(action.payload)
        ? action.payload.toISO().slice(0, 10)
        : action.payload
      const frontTo = DateTime.isDateTime(action.payload)
        ? action.payload
        : DateTime.fromISO(action.payload)
      state.date.api.to = action.payload ? apiTo : ""
      state.date.front.to = action.payload
        ? `${frontTo.day} ${monthNamesDate[frontTo.month]}, ${firstToUpperCase(
            frontTo.weekdayShort
          )}`
        : ""
      state.date.mini.to = action.payload
        ? `${frontTo.day} ${monthNamesDate[frontTo.month]}`
        : ""
    },
    reverseDate: (state) => {
      state.date.api.to = state.date.api.from
      state.date.front.to = state.date.front.from
    },
    resetDate: (state) => {
      state.date = ""
    },
    setChangedInputFrom: (state, action) => {
      state.date.changedInput.from = action.payload
    },
    setChangedInputTo: (state, action) => {
      state.date.changedInput.to = action.payload
    },
    setRouteFrom: (state, action) => {
      const { apiRoute, frontRoute } = action.payload
      state.route.api.from = apiRoute
      state.route.front.from = frontRoute
    },
    setRouteTo: (state, action) => {
      const { apiRoute, frontRoute } = action.payload
      state.route.api.to = apiRoute
      state.route.front.to = frontRoute
    },
    incrementPassengers: (state, action) => {
      const { type } = action.payload
      state.passengers = {
        ...state.passengers,
        [type]: state.passengers[type] + 1
      }
    },
    decrementPassengers: (state, action) => {
      const { type } = action.payload
      state.passengers = {
        ...state.passengers,
        [type]: state.passengers[type] - 1
      }
    },
    setPassengers: (state, action) => {
      state.passengers = { ...action.payload }
    },
    pickAirClass: (state, action) => {
      const { type } = action.payload
      const secondType = type === "economy" ? "business" : "economy"
      state.airClasses = {
        [type]: state.airClasses[type]
          ? state.airClasses[type]
          : !state.airClasses[type],
        [secondType]: state.airClasses[type]
          ? state.airClasses[secondType]
          : !state.airClasses[secondType]
      }
    },
    setPassengersInfo: (state, action) => {
      state.passengersInfo = action.payload
    },
    setPassengersInfoMini: (state, action) => {
      state.passengersInfoMini = action.payload
    },
    setNumberOfChanges: (state, action) => {
      state.numberOfChanges = action.payload
    },
    setAir: (state) => {
      state.transport = "air"
    },
    setBus: (state) => {
      state.transport = "bus"
    },
    setTrain: (state) => {
      state.transport = "train"
    },
    setOneWay: (state, action) => {
      state.one_way = action.payload
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload
    }
  }
})

export const {
  setDateFrom,
  setDateTo,
  reverseDate,
  resetDate,
  setChangedInputFrom,
  setChangedInputTo,
  setRouteFrom,
  setRouteTo,
  incrementPassengers,
  decrementPassengers,
  setPassengers,
  pickAirClass,
  setPassengersInfo,
  setPassengersInfoMini,
  setNumberOfChanges,
  setAir,
  setBus,
  setTrain,
  setOneWay,
  setSearchParams
} = mainSearchParamsSlice.actions

export default mainSearchParamsSlice.reducer
