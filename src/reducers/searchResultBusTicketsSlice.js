import { createSlice } from "@reduxjs/toolkit"

export const searchResultBusTicketsSlice = createSlice({
  name: "searchResultBusTicketsSlice",
  initialState: {
    searchData: "",
    isOpenRedirect: false,
    ticketDilerName: ""
  },
  reducers: {
    setSearchData: (state, action) => {
      console.log(action.payload)
      state.searchData = action.payload
    },
    setIsOpenRedirect: (state, action) => {
      state.isOpenRedirect = action.payload
    },
    setTicketDilerName: (state, action) => {
      state.ticketDilerName = action.payload
    }
  }
})

export const { setSearchData, setIsOpenRedirect, setTicketDilerName } =
  searchResultBusTicketsSlice.actions

export const selectSearchBusTicketResult = (state) =>
  state.searchResultBusTicketsSlice
export default searchResultBusTicketsSlice.reducer
