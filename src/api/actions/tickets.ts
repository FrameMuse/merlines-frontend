import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { FiltersType, TicketType, TripType } from "interfaces/Search"

// Create session
export const postTicketsAir = (trips: TripType[]): Action<{ session: string }> => ({
  method: "POST",
  endpoint: "/tickets/air",
  body: { trips }
})

export const getTicketsAir = (session: string, page: number, page_size: number, filters: Partial<FiltersType>): Action<PaginationType<TicketType> & { in_progress: boolean }> => ({
  method: "GET",
  endpoint: "/tickets/air/" + session,
  params: { page, page_size, ...filters }
})

export const getTicketsAirFilters = (session: string): Action<{
  in_progress: boolean
  transfers: number[]
  arrival_dates: string[][]
  travel_times: {
    list: {
      min: number
      max: number
    }[]
    type: "range" | "checkbox"
  }
  transfer_times: {
    min: number
    max: number
  }[]
  baggage_min_price: number
  airlines: {
    id: number
    code: string
    title: string
  }[]
  airports: {
    origin: {
      id: number
      code: string
      title: string
    }[]
    destination: {
      id: number
      code: string
      title: string
    }[]
    transfers: {
      id: number
      code: string
      title: string
    }[]
  }[]
  offers: {
    gate_id: number
    title: string
    price: number
  }[]
}> => ({
  method: "GET",
  endpoint: "/tickets/air/" + session
})
