import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { AirFiltersType, AirTicketType, RouteType } from "interfaces/Search"

// Create session
export const postTicketsAir = (trips: RouteType[], travel_class: number, passengers?: Partial<{ adults: number, children: number, infants: number }>): Action<{ session: string }> => ({
  method: "POST",
  endpoint: "/tickets/air",
  body: { trips, travel_class, ...passengers, currency: "RUB" }
})

export const getTicketsAir = (session: string, page: number, page_size: number, filters?: Partial<AirFiltersType> & { ordering?: "best_price" | "final_time" }): Action<PaginationType<AirTicketType> & { in_progress: boolean, is_tracked: boolean }> => ({
  method: "GET",
  endpoint: "/tickets/air/" + session,
  params: { page, page_size, ...filters },
  config: {
    skipCache: true
  }
})

export const getTicketsAirFilters = (session: string): Action<{
  in_progress: boolean
  best_price_of_faster: number
  transfers: [
    number
  ]
  arrival_dates: string[][]
  travel_times: {
    min: number
    max: number
  }[]
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
    origins: {
      id: number
      code: string
      title: string
    }[]
    destinations: {
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
  trip_cities: {
    origin: {
      id: number
      code: string
      title: string
    }
    destination: {
      id: number
      code: string
      title: string
    }
  }[]
  transfer_cities: {
    id: number
    code: string
    title: string
    country: {
      code: string
      id: number
      title: string
    }
    airports: {
      id: number
      code: string
      title: string
    }[]
  }[][]
}> => ({
  method: "GET",
  endpoint: `/tickets/air/${session}/filters`,
  config: {
    skipCache: true
  }
})

enum FreeEntry {
  no, free, paid
}

export const getTicketsAirSegmentAbout = (segmentId: number): Action<{
  airline: number
  aircraft: string
  travel_class: number
  food: FreeEntry | null
  entertainment: FreeEntry | null
  alcohol: FreeEntry | null
  beverage: FreeEntry | null
  power: FreeEntry | null
  wifi: FreeEntry | null
}> => ({
  method: "GET",
  endpoint: `/tickets/air/segment/${segmentId}/about`
})

export const getTicketsAirTicketOffers = (ticketId: number): Action<PaginationType<{
  id: number
  gate_id: number
  title: string
  price: number
}>> => ({
  method: "GET",
  endpoint: `/tickets/air/ticket/${ticketId}/offers`
})

export const getTicketsAirOfferLink = (sessionId: string, id: number): Action => ({
  method: "GET",
  endpoint: `/tickets/air/${sessionId}/offer/${id}/link`
})
