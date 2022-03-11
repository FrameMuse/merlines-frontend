import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { SearchDetails } from "redux/reducers/search"

export const getFavourites = (type: SearchDetails["transport"], page: number, page_size: number): Action<PaginationType<{
  id: number
  price_with_baggage: number
  best_offer: {
    id: number
    gate_id: number
    title: string
    price: number
  }
  trips: [
    {
      start_time: string
      end_time: string
      segments: [
        {
          id: number
          departure: {
            id: number
            code: string
            title: string
            city: {
              id: number
              code: string
              title: string
            }
          }
          arrival: {
            id: number
            code: string
            title: string
            city: {
              id: number
              code: string
              title: string
            }
          }
          departure_time: string
          arrival_time: string
          duration: string
          marketing_airline: {
            id: number
            code: string
            title: string
          }
          flight: string
          handbags_weight: number
          baggage_weight: number
        }
      ]
    }
  ]
  is_favorite: boolean
  type: string
}>> => ({
  method: "GET",
  endpoint: `/favourites/${type}`,
  params: { page, page_size }
})

export const postFavourites = (type: SearchDetails["transport"], ticket: number): Action<{}> => ({
  method: "POST",
  endpoint: `/favourites/${type}`,
  body: { ticket }
})

export const deleteFavourite = (type: SearchDetails["transport"], ticketId: number): Action => ({
  method: "DELETE",
  endpoint: `/favourites/${type}/${ticketId}`
})
