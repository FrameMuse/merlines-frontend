import { createSlice } from '@reduxjs/toolkit';

export const searchResultTrainTicketsSlice = createSlice({
  name: 'searchResultBusTicketsSlice',
  initialState: {
    searchData: '',
    isOpenRedirect: false,
    ticketDilerName: ''
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setIsOpenRedirect: (state, action) => {
      state.isOpenRedirect = action.payload;
    },
    setTicketDilerName: (state, action) => {
      state.ticketDilerName = action.payload;
    },
  }
});

export const {
  setSearchData,
  setIsOpenRedirect,
  setTicketDilerName
} = searchResultTrainTicketsSlice.actions;

export const selectSearchTrainTicketResult = state => state.searchResult;
export default searchResultTrainTicketsSlice.reducer;
