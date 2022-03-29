import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"

export interface IResult {
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

export const getHistory = (page: number, page_size: number): Action<PaginationType<IResult>> => ({
  method: "GET",
  endpoint: "/history",
  params: { page, page_size }
})

export const deleteHistory: Action = {
  method: "DELETE",
  endpoint: "/history"
}

export const deleteHistoryChunk = (id: number): Action => ({
  method: "DELETE",
  endpoint: `/history/${id}`
})
