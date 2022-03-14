import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { SearchAirports, SearchPlace } from "redux/reducers/search"

export const getGeoIp: Action<{
  city: string
  region: string
}> = {
  method: "GET",
  endpoint: "/geo/ip"
}

export const getGeoAirCities = (title__icontains: string): Action<PaginationType<SearchAirports>> => ({
  method: "GET",
  endpoint: "/geo/air/cities",
  params: { page_size: 5, title__icontains }
})

export const getGeoAirCity = (id: number): Action<{
  id: number
  title: string
  code: string
}> => ({
  method: "GET",
  endpoint: `/geo/air/cities/${id}`
})

export const getGeoIpAir: Action<SearchPlace> = {
  method: "GET",
  endpoint: "/geo/ip/air"
}
