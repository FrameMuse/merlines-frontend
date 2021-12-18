import { createContext, Dispatch } from "react"
import { noop } from "utils"

import { DateCalendarAction, DateCalendarInitialState, DateCalendarState } from "./DropDownCalendarReducer"

const DateCalendarContext = createContext<[DateCalendarState, Dispatch<DateCalendarAction>]>([DateCalendarInitialState, noop])
export default DateCalendarContext
