import { Action } from "api/client"

export const getCalendarAirWeek = (originId: number, destinationId: number, date: string): Action<{
  date: string
  price: number
}[]> => ({
  method: "GET",
  endpoint: `/calendar/air/${originId}/${destinationId}/week/${date}`
})
