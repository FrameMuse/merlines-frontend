import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { daysFromInterval } from '../utils';

export const dropDownCalendarSlice = createSlice({
  name: 'dropDownCalendar',
  initialState: {
    isOpenCalendar: false,
    isOneClick: true,
    dateInterval: {
      from: '',
      to: ''
    },
    dateIntervalArr: [],
    isDateInterval: false,
    twoMonthsDates: {
      current: DateTime.now(),
      next: DateTime.now().plus({ month: 1 })
    },
    twoMonthsIntervals: {
      current: daysFromInterval(DateTime.now()),
      next: daysFromInterval(DateTime.now().plus({ month: 1 }))
    }
  },
  reducers: {
    setIsOpenCalendar: (state, action) => {
      if (typeof action.payload === 'boolean')
        state.isOpenCalendar = action.payload;
      else {
        state.isOpenCalendar = !state.isOpenCalendar;
      }
    },
    setIsOneClick: (state, action) => {
      state.isOneClick = action.payload;
    },
    setDateIntervalFrom: (state, action) => {
      state.dateInterval.from = action.payload;
    },
    setDateIntervalTo: (state, action) => {
      state.dateInterval.to = action.payload;
    },
    setDateIntervalArr: (state, action) => {
      state.dateIntervalArr = action.payload;
    },
    setIsDateInterval: (state, action) => {
      state.isDateInterval = action.payload;
    },
    setCalendarToInitial: (state) => {
      state.dateInterval = {
        from: '',
        to: ''
      };
      state.dateIntervalArr = [];
    },
    setTwoMonthsPlus: (state) => {
      state.twoMonthsDates = {
        current: state.twoMonthsDates.current.plus({ month: 1 }),
        next: state.twoMonthsDates.next.plus({ month: 1 })
      };
    },
    setTwoMonthsMinus: (state) => {
      state.twoMonthsDates = {
        current: state.twoMonthsDates.current.minus({ month: 1 }),
        next: state.twoMonthsDates.next.minus({ month: 1 })
      };
    },
    setTwoMonthsCurrent: (state, action) => {
      state.twoMonthsDates = {
        current: DateTime.fromISO(action.payload),
        next: DateTime.fromISO(action.payload).plus({ month: 1 })
      };
    },
    setTwoMonthsNext: (state, action) => {
      state.twoMonthsDates = {
        current: DateTime.fromISO(action.payload).minus({ month: 1 }),
        next: DateTime.fromISO(action.payload)
      };
    },
    setTwoMonthsIntervals: (state) => {
      state.twoMonthsIntervals = {
        current: daysFromInterval(state.twoMonthsDates.current),
        next: daysFromInterval(state.twoMonthsDates.next)
      };
    }
  }
});

export const {
  setIsOpenCalendar,
  setIsOneClick,
  setDateIntervalFrom,
  setDateIntervalTo,
  setDateIntervalArr,
  setIsDateInterval,
  setTwoMonthsPlus,
  setTwoMonthsMinus,
  setTwoMonthsIntervals,
  setTwoMonthsCurrent,
  setTwoMonthsNext,
  setCalendarToInitial
} = dropDownCalendarSlice.actions;
export const selectDropDownCalendar = (state) => state.dropDownCalendar;
export default dropDownCalendarSlice.reducer;
