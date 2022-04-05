import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { SearchDetails } from "redux/reducers/search"

export const getSpecialsByCityIdByTransport = (cityId: number, transport: SearchDetails["transport"], page?: number, pageSize?: number): Action<PaginationType<{
  price: number
  destination: {
    id: number
    title: string
    country: {
      id: number
      title: string
    }
  }
  date: string
}>> => ({
  method: "GET",
  endpoint: `/specials/${cityId}/${transport}`,
  params: { page, pageSize }
})