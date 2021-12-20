import { Action as BaseAction, createClient, QueryResponse } from "react-fetching-library"
import { toast } from "react-toastify"
import { createQuery } from "utils"

import { cacheProvider } from "./cache"

declare module "react-fetching-library" {
  // https://marcin-piela.github.io/react-fetching-library/#/?id=config-object
  export interface Action<R = any, Ext = any> {
    params?: Record<string, unknown>
  }
}

interface APIResponseError {
  error: {
    type: "error" | "warning"
    code: string | number
    detail: any // For development
  }
}

interface ActionConfig {
  skipAuth: boolean
  skipCache: boolean
}

export type Action<P = unknown> = BaseAction<P & APIResponseError, Partial<ActionConfig>>

function requestInterceptor() {
  return async (action: Action) => {
    const endpoint = process.env.REACT_APP_BASE_URL + action.endpoint + "/"
    const query = createQuery(action.params)

    return {
      ...action,
      endpoint: endpoint + (query && "?" + query),
      headers: {
        // "content-type": "application/json",
        Authorization: !action.config?.skipAuth && localStorage.getItem("token") || ""
      }
    }
  }
}
function responseInterceptor() {
  return async (_action: Action, response: QueryResponse<APIResponseError>) => {
    if (response.payload?.error) {
      toast.error(response.payload.error)
    }

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

    return response
  }
}

export const ClientAPI = createClient({
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
  cacheProvider
})

export default ClientAPI

