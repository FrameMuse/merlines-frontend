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
      return { ...state, ...payload }

    case "SEARCH_CALENDAR_DATES_UPDATE": {
      const dates = { ...state.dates, ...payload.dates }

      const firstTime = dates.first?.getTime()
      const secondTime = dates.second?.getTime()
      // Change mode if two the same dates were chosen
      const mode = firstTime === secondTime ? "single" : state.mode
      // Delete second if two the same dates were chosen
      if (firstTime === secondTime) {
        dates.second = null
      }
      // If second date is earlier, swap them
      if (secondTime < firstTime) {
        [dates.second, dates.first] = [dates.first, dates.second]
      }

      return { ...state, mode, dates }
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
  type: "SEARCH_CALENDAR_DATES_UPDATE",
  payload: { dates }
})

export const updateSearchCalendarCursorDate = cursorDate => ({
  type: "SEARCH_CALENDAR_UPDATE",
  payload: { cursorDate }
})
