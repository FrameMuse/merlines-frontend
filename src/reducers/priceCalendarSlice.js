import { createSlice } from "@reduxjs/toolkit"

import { addNoPriceMonths,getBetterPrice } from "../utils"

export const priceCalendarSlice = createSlice({
  name: "priceCalendar",
  initialState: {
    air: {
      transport: "air",
      months: [],
      betterPrice: 0
    },
    train: {
      transport: "train",
      months: [],
      betterPrice: 0
    },
    bus: {
      transport: "bus",
      months: [],
      betterPrice: 0
    },
    pickedMonthData: {
      previousMonth: null,
      currentMonth: null,
      nextMonth: null,
      pickedMonthName: null,
      betterPrice: null
    },
    daysInterval: "",
    monthDate: "",
    currentMonthDate: ""
  },
  reducers: {
    setData: (state, action) => {
      const { transport, months } = action.payload

      if (months.length < 12) {
        state[transport] = {
          months: addNoPriceMonths(months),
          betterPrice: getBetterPrice(months, transport)
        }
      } else {
        state[transport] = {
          ...action.payload,
          betterPrice: getBetterPrice(months, transport)
        }
      }
    },

    clearData: (state) => {
      state.air = {
        months: "",
        betterPrice: ""
      }
      state.train = {
        months: "",
        betterPrice: ""
      }
      state.bus = {
        months: "",
        betterPrice: ""
      }
    },

    setPickedMonthData: (state, action) => {
      const {
        days,
        currentMonthDate,
        transport,
        previousMonthDate,
        nextMonthDate,
        pickedMonthName
      } = action.payload
      const currentMonth = days.filter(
        (item) => item.date.slice(0, 7) === currentMonthDate
      )
      const previousMonth =
        previousMonthDate !== currentMonthDate &&
        days.filter((item) => item.date.slice(0, 7) === previousMonthDate)
      const nextMonth =
        nextMonthDate !== currentMonthDate &&
        days.filter((item) => item.date.slice(0, 7) === nextMonthDate)

      state.pickedMonthData = {
        previousMonth,
        currentMonth,
        transport,
        nextMonth,
        pickedMonthName,
        currentMonthDate,
        betterPrice: getBetterPrice(currentMonth, transport)
      }
    },

    clearPickedMonthData: (state) => {
      state.pickedMonthData = {
        ...state.pickedMonthData,
        currentMonth: null,
        pickedMonthName: null
      }
    },

    setDaysInterval: (state, action) => {
      state.daysInterval = action.payload
    },

    setMonthDate: (state, action) => {
      state.monthDate = action.payload
    },

    setCurrentMonthDate: (state, action) => {
      state.currentMonthDate = action.payload
    }
  }
})

export const {
  setData,
  clearData,
  setPickedMonthData,
  clearPickedMonthData,
  setDaysInterval,
  setMonthDate,
  setCurrentMonthDate
} = priceCalendarSlice.actions

export const selectPriceCalendar = (state) => state.priceCalendar
export default priceCalendarSlice.reducer
