import { createSlice } from '@reduxjs/toolkit';

export const accessDataSlice = createSlice({
  name: 'accessDataSlice',
  initialState: {
    userData: '',
    isOpen: false,
    isLogged: false,
    loginToken: sessionStorage.token ? sessionStorage.token : localStorage.token,
    isRememberMe: false,
    isChangedEmail: false,
    newEmail: '',
    errorMessage: ''
  },
  reducers: {
    setUserInfo: (state, action) => {
      console.log('setUserData', action.payload);
      state.userData = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    setIsRememberMe: (state, action) => {
      state.isRememberMe = !state.isRememberMe;
    },
    setIsChangedEmail: (state, action) => {
      state.isChangedEmail = action.payload;
    },
    setNewEmail: (state, action) => {
      state.newEmail = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  }
});

export const {
  setUserInfo,
  setIsOpen,
  setLoginToken,
  setIsRememberMe,
  setIsChangedEmail,
  setNewEmail,
  setErrorMessage
} = accessDataSlice.actions;

export const selectAccessData = state => state.accessData;
export default accessDataSlice.reducer;
