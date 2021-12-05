import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import api from "../api/api"
import { monthNamesDate } from "../constants"
import { formatDateToDayWeek } from "../utils"

export const detectCityByGeoIp = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    try {
      const resp = await api.getCurrentCity()

      if (!("error" in resp.data)) {
        sessionStorage.setItem("cityApiFrom", resp.data.data.air_code)
        sessionStorage.setItem("cityFrontFrom", resp.data.data.air_name)
        sessionStorage.setItem("cityBusId", resp.data.data.bus_city_id)

        return resp.data.data.air_name
      } else {
        sessionStorage.setItem("isCityGeoIpError", true)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

export const mainSearchParamsSlice = createSlice({
  name: "mainSearchParams",
  initialState: {
    date: {
      api: {
        from: DateTime.now().toISODate(),
        to: ""
      },
      front: {
        from: formatDateToDayWeek(),
        to: ""
      },
      changedInput: {
        from: formatDateToDayWeek(),
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
        ? formatDateToDayWeek(frontFrom)
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
      state.date.front.to = action.payload ? formatDateToDayWeek(frontTo) : ""
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
  },
  extraReducers: {
    [detectCityByGeoIp.fulfilled]: (state, action) => {
      state.route.front.from = action.payload
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

export const selectMainSearchParams = (state) => state.mainSearchParams
export default mainSearchParamsSlice.reducer
