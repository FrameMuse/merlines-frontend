import { QueryResponse } from "react-fetching-library"
import { toast } from "react-toastify"
import { createQuery } from "utils"

import { Action, APIResponseError } from "./client"

export function requestInterceptor() {
  return async (action: Action) => {
    const endpoint = process.env.REACT_APP_BASE_URL + action.endpoint + "/"
    const query = createQuery(action.params)

    return {
      ...action,
      endpoint: endpoint + (query && "?" + query),
      headers: {
        Authorization: !action.config?.skipAuth && localStorage.getItem("token") || ""
      }
    }
  }
}
export function responseInterceptor() {
  return async (_action: Action, response: QueryResponse<APIResponseError>) => {
    try {
      if (process.env.NODE_ENV === "development") {
        if (response.errorObject instanceof Error) {
          toast.error(response.errorObject.message)
        }

        toast.error(JSON.stringify(response.payload?.error.detail))

        for (const field of Object.values(response.payload?.error.detail) as any) {
          for (const fieldError of Object.values(field) as any) {
            toast.error(fieldError.message)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }


    if (response.payload == null && response.status !== 204) {
      return {
        ...response,
        error: true
      }
    }

    if (response.payload?.error) {
      toast.error(response.payload.error.code)

      return {
        ...response,
        error: true
      }
    }

    return response
  }
}
