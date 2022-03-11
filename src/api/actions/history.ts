import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"

export const getHistory = (page: number, page_size: number): Action<PaginationType<{
  id: number
  origin: {
    id: number
    title: string
  }
  destination: {
    id: number
    title: string
  }
  date: string
  passengers: number
  travel_class: number
}>> => ({
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
