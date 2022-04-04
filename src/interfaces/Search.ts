export type TransportType = "airplane" | "train" | "bus"
export interface RouteType {
  origin: number
  destination: number
  date: string
}


/*

--------------------------------------
--------- AIR Search Results ---------
--------------------------------------

*/


export interface AirFiltersType {
  airlines: string
  destination_airports: string

  end_date__in: string
  end_time__gte: string
  end_time__lte: string

  offers: string
  origin_airports: string

  start_time__gte: string
  start_time__lte: string

  transfers: string
  transfer_airports: string
  transfer_time__gte: string
  transfer_time__lte: string

  travel_time__gte: string
  travel_time__lte: string
}

export interface AirTicketType {
  id: number
  price_with_baggage: number
  is_favorite: boolean
  is_tracked: boolean
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
}


/*

--------------------------------------
--------- BUS Search Results ---------
--------------------------------------

*/





/*

----------------------------------------
--------- TRAIN Search Results ---------
----------------------------------------

*/



