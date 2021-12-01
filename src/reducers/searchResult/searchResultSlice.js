import { createSlice } from '@reduxjs/toolkit';

export const searchResultSlice = createSlice({
  name: 'searchResultSlice',
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
} = searchResultSlice.actions;

export default searchResultSlice.reducer;
