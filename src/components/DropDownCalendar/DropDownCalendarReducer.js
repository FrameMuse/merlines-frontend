const initialState = {
  mode: "single" || "double",
  isOpen: false,
  dates: {
    first: null,
    second: null
  },
  cursorDate: new Date
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case "SEARCH_CALENDAR_UPDATE":
      return {
        ...state,
        ...payload,
        dates: { ...state.dates, ...payload.dates }
      }

    default:
      return state
  }
}

export const updateSearchCalendarMode = mode => ({
  type: "SEARCH_CALENDAR_UPDATE",
  payload: { mode }
})

export const updateSearchCalendarIsOpen = isOpen => ({
  type: "SEARCH_CALENDAR_UPDATE",
  payload: { isOpen }
})

export const updateSearchCalendarDates = dates => ({
  type: "SEARCH_CALENDAR_UPDATE",
  payload: { dates }
})

export const updateSearchCalendarCursorDate = cursorDate => ({
  type: "SEARCH_CALENDAR_UPDATE",
  payload: { cursorDate }
})
