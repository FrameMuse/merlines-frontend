import {PaginationType} from "../../interfaces/Django"
import {SearchDetails} from "../../redux/reducers/search"
import {Action} from "../client"

const endpoint = "/tracking/"

export interface ITrackingTicket {
  id: number,
  best_offer: {
    id: number,
    gate_id: number,
    title: string,
    price: number
  },
  price_with_baggage: number,
  trips: [
    {
      start_time: string,
      end_time: string,
      segments: [
        {
          id: number,
          departure: {
            id: number,
            code: string,
            title: string,
            city: {
              id: number,
              code: string,
              title: string
            }
          },
          arrival: {
            id: number,
            code: string,
            title: string,
            city: {
              id: number,
              code: string,
              title: string
            }
          },
          departure_time: string,
          arrival_time: string,
          duration: string,
          marketing_airline: {
            id: number,
            code: string,
            title: string
          },
          flight: string,
          handbags_weight: number,
          baggage_weight: number
        }
      ]
    }
  ],
  is_favorite: boolean,
  is_tracked: boolean,
  currency: string
}
export interface ITrackingTicketResponse {
  count: number,
  results: ITrackingTicket[]
}

export interface ITrackingQueryResult {
  id: number,
  travel_class: number,
  adults: number,
  children: number,
  infants: number,
  trips: [
    {
      origin: {
        id: number,
        title: string
      },
      destination: {
        id: number,
        title: string
      },
      date: string
    }
  ]
}

export interface ITrackingQueryResponse {
  count: number,
  results: ITrackingQueryResult[]
}

export const getTrackingTickets = (type: SearchDetails["transport"], page: number, page_size: number): Action<ITrackingTicketResponse> => ({
  method: "GET",
  endpoint: endpoint + type + "/tickets",
  params: {page, page_size}
})

export const postTrackingTicket = (type: SearchDetails["transport"], session_id: string, ticket: number): Action<{id: number}> => ({
  method: "POST",
  endpoint: endpoint + type + "/tickets/" + session_id,
  body: {ticket}
})

export const deleteTrackingTicket = (type: SearchDetails["transport"], ticketId: number): Action => ({
  method: "DELETE",
  endpoint: endpoint + type + "/tickets/" + ticketId
})

export const deleteAllTrackingTickets = (type: SearchDetails["transport"]): Action => ({
  method: "DELETE",
  endpoint: endpoint + type + "/tickets"
})

export const getTrackingQueries = (type: SearchDetails["transport"], page: number, page_size: number): Action<ITrackingQueryResponse> => ({
  method: "GET",
  endpoint: endpoint + type + "/queries",
  params: {page, page_size}
})


export const postTrackingQuery = (type: SearchDetails["transport"], session_id: string): Action<{id: number}> => ({
  method: "POST",
  endpoint: endpoint + type + "/queries/" + session_id,
  body: {}
})

export const deleteTrackingQuery = (type: SearchDetails["transport"], queryId: number): Action => ({
  method: "DELETE",
  endpoint: endpoint + type + "/queries/" + queryId
})

export const deleteAllTrackingQueries = (type: SearchDetails["transport"]): Action => ({
  method: "DELETE",
  endpoint: endpoint + type + "/queries"
})
