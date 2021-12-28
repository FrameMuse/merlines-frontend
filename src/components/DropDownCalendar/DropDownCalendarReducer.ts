export interface DateCalendarAction {
  type: string
  payload: Partial<DateCalendarState>
}

export interface DateCalendarState {
  hasGrouping?: boolean
  dates: {
    first: Date
    second: Date | null
  }
  cursorDate: Date
  hoveredDate: Date | null
}

export const DateCalendarInitialState: DateCalendarState = {
  dates: {
    first: new Date,
    second: null
  },
  cursorDate: new Date,
  hoveredDate: null
}

export default (state = DateCalendarInitialState, { type, payload }: DateCalendarAction): DateCalendarState => {
  switch (type) {

    case "CALENDAR_UPDATE":
      return { ...state, ...payload }

    case "CALENDAR_DATES_UPDATE": {
      const dates = { ...state.dates, ...payload.dates }

      if (dates.first && dates.second) {
        const firstTime = dates.first.getTime()
        const secondTime = dates.second.getTime()
        // If second date is earlier, swap them
        if (secondTime < firstTime) {
          [dates.second, dates.first] = [dates.first, dates.second]
        }
      }

      return { ...state, dates }
    }

    case "CALENDAR_HAS_GROUPING_UPDATE":
      return {
        ...state,
        ...payload,
        dates: {
          ...state.dates,
          second: null
        }
      }

    default:
      return state
  }
}

export const updateDateCalendarHasGrouping = (hasGrouping: DateCalendarState["hasGrouping"]) => ({
  type: "CALENDAR_HAS_GROUPING_UPDATE",
  payload: { hasGrouping }
})

export const updateDateCalendarDates = (dates: DateCalendarState["dates"]) => ({
  type: "CALENDAR_DATES_UPDATE",
  payload: { dates }
})

export const updateDateCalendarCursorDate = (cursorDate: DateCalendarState["cursorDate"]) => ({
  type: "CALENDAR_UPDATE",
  payload: { cursorDate }
})

export const updateDateCalendarHoveredDate = (hoveredDate: DateCalendarState["hoveredDate"]) => ({
  type: "CALENDAR_UPDATE",
  payload: { hoveredDate }
})
