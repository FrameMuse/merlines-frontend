import { Action as BaseAction, createClient, QueryResponse } from "react-fetching-library"
import { toast } from "react-toastify"

import { cacheProvider } from "./cache"

interface APIResponseError {
  error: {
    type: "error" | "warning"
    code: string | number
  }
}

interface ActionConfig {
  skipAuth: boolean
  skipCache: boolean
}

export type Action<P = unknown> = BaseAction<P & APIResponseError, Partial<ActionConfig>>

function requestInterceptor() {
  return async (action: Action) => {
    return {
      ...action,
      headers: {
        "content-type": "application/json",
        Authorization: !action.config?.skipAuth && localStorage.getItem("token") || ""
      }
    }
  }
}
function responseInterceptor() {
  return async (_action: BaseAction, response: QueryResponse) => {
    if (response.payload?.error) {
      toast.error(response.payload.error)
    }
    if (process.env.NODE_ENV === "development") {
      if (response.errorObject instanceof Error) {
        toast.error(response.errorObject.message)
      }
    }
    return response
  }
}

export const ClientAPI = createClient({
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
  cacheProvider
})

export default ClientAPI

