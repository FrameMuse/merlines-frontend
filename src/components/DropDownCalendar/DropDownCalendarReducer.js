const initialState = {
  mode: "single" || "double",
  isOpen: false,
  dates: {
    first: new Date,
    second: null
  },
  cursorDate: new Date,
  hoveredDate: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case "SEARCH_CALENDAR_UPDATE":
      return { ...state, ...payload }

    case "SEARCH_CALENDAR_MODE_UPDATE":
      return {
        ...state,
        ...payload,
        // If mode gonna be changed to single, delete second date
        dates: {
          ...state.dates,
          second: payload.mode === "single" ? null : state.dates.second
        }
      }

    case "SEARCH_CALENDAR_DATES_UPDATE": {
      const dates = { ...state.dates, ...payload.dates }

      const firstTime = dates.first?.getTime()
      const secondTime = dates.second?.getTime()
      // If second date is earlier, swap them
      if (secondTime < firstTime) {
        [dates.second, dates.first] = [dates.first, dates.second]
      }

      return { ...state, dates }
    }

    default:
      return state
  }
}

export const updateSearchCalendarMode = mode => ({
  type: "SEARCH_CALENDAR_MODE_UPDATE",
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

export const updateSearchCalendarHoveredDate = hoveredDate => ({
  type: "SEARCH_CALENDAR_UPDATE",
  payload: { hoveredDate }
})
