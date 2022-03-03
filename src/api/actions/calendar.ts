import { Action } from "api/client"

export const getCalendarAirWeek = (originId: number, destinationId: number, year: string, month: string, day: string): Action<{
  date: string
  price: number
}[]> => ({
  method: "GET",
  endpoint: `/calendar/air/${originId}/${destinationId}/week/${year}/${month}/${day}`
})
