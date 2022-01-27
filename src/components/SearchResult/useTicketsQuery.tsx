import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { useSuspenseQuery } from "react-fetching-library"
import { noop } from "utils"

const suspender = (new Promise(noop)).then(() => { 1 }, () => { 1 })

export default function useTicketsQuery<T extends PaginationType & { in_progress: boolean; }>(action: Action<T>) {
  const response = useSuspenseQuery(action)

  if (response.error || !response.payload) {
    throw response.errorObject || response.payload?.error
  }

  if (response.payload.count === 0) {
    setTimeout(() => response.query(), 2500)
    throw suspender
  }

  return response
}
