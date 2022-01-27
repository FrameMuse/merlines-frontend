import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { FiltersType, TicketType, TripType } from "interfaces/Search"

// Create session
export const postTicketsAir = (trips: TripType[], travel_class: string, passengers?: Partial<{ adults: number, children: number, infants: number }>): Action<{ session: string }> => ({
  method: "POST",
  endpoint: "/tickets/air",
  body: { trips, travel_class, ...passengers }
})

export const getTicketsAir = (session: string, page: number, page_size: number, filters?: Partial<FiltersType>): Action<PaginationType<TicketType> & { in_progress: boolean }> => ({
  method: "GET",
  endpoint: "/tickets/air/" + session,
  params: { page, page_size, ...filters }
})

export const getTicketsAirFilters = (session: string): Action<{
  in_progress: boolean
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
    airports: {
      id: number
      code: string
      title: string
    }[]
  }[][]
}> => ({
  method: "GET",
  endpoint: "/tickets/air/" + session + "/filters"
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
  endpoint: "/tickets/air/segment/" + segmentId + "/about"
})

export const getTicketsAirTicketOffers = (ticketId: number): Action<PaginationType<{
  id: number
  gate_id: number
  title: string
  price: number
}>> => ({
  method: "GET",
  endpoint: "/tickets/air/ticket/" + ticketId + "/offers"
})

export const getTicketsAirOfferLink = (sessionId: string, id: number): Action => ({
  method: "GET",
  endpoint: `/tickets/air/${sessionId}/offer/${id}/link`
})
