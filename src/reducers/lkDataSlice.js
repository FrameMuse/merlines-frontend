import { createSlice } from '@reduxjs/toolkit';

const userData = JSON.parse(localStorage.getItem('user'));
const userDataSession = JSON.parse(sessionStorage.getItem('user'));

export const lkDataSlice = createSlice({
  name: 'lkDataSlice',
  initialState: {
    isOpenClearHistory: false,
    isHistoryRoute: false,
    firstName: (userDataSession && userDataSession) ? userDataSession.first_name : (userData && userData.first_name),
    lastName: (userDataSession && userDataSession) ? userDataSession.last_name : (userData && userData.last_name),
    email: (userDataSession && userDataSession) ? userDataSession.email : (userData && userData.email),
  },
  reducers: {
    setIsOpenClearHistory: (state, action) => {
      state.isOpenClearHistory = action.payload;
    },
    setIsHistoryRoute: (state, action) => {
      state.isHistoryRoute = action.payload;
    },
    setLkFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLkLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setLkEmail: (state, action) => {
      state.email = action.payload;
    },
  }
});

export const {
  setIsOpenClearHistory,
  setIsHistoryRoute,
  setLkFirstName,
  setLkLastName,
  setLkEmail
} = lkDataSlice.actions;

export const selectLkData = state => state.lkData;
export default lkDataSlice.reducer;
