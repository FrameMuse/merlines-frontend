import { createSlice } from "@reduxjs/toolkit"

export const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState: {
    transfers: {
      all: true,
      no: false,
      one: false,
      two: false,
      threeAndMore: false
    },
    duration: {
      min: 0,
      max: 0
    }
  },
  reducers: {
    transfersAll: (state) => {
      state.transfers = {
        all: true,
        no: false,
        one: false,
        two: false,
        threeAndMore: false
      }
    },
    transfersNo: (state) => {
      state.transfers = {
        all: false,
        no: true,
        one: false,
        two: false,
        threeAndMore: false
      }
    },
    transfersOne: (state) => {
      state.transfers = {
        all: false,
        no: false,
        one: true,
        two: false,
        threeAndMore: false
      }
    },
    transfersTwo: (state) => {
      state.transfers = {
        all: false,
        no: false,
        one: false,
        two: true,
        threeAndMore: false
      }
    },
    transfersThreeAndMore: (state) => {
      state.transfers = {
        all: false,
        no: false,
        one: false,
        two: false,
        threeAndMore: true
      }
    },
    setDurationMin: (state, action) => {
      state.duration.min = action.payload
    },
    setDurationMax: (state, action) => {
      state.duration.max = action.payload
    }
  }
})

export const {
  transfersAll,
  transfersNo,
  transfersOne,
  transfersTwo,
  transfersThreeAndMore,
  setDurationMin,
  setDurationMax
} = filtersSlice.actions

export const selectFilter = (state) => state.filter
export default filtersSlice.reducer
