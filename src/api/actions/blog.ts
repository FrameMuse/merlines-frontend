import { Action } from "api/client"

export const get: Action = {
  method: "GET",
  endpoint: "/blog/",
  config: {
    skipCache: true
  }
}
