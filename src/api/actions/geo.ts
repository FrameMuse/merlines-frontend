import { Action } from "api/client"

export const getGeoIp: Action<{
  city: string
  region: string
}> = {
  method: "GET",
  endpoint: "/geo/ip"
}
