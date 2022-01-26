import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { useSuspenseQuery } from "react-fetching-library"
import { noop } from "utils"


export default function useTicketsQuery<T extends PaginationType & { in_progress: boolean; }>(action: Action<T>) {
  const response = useSuspenseQuery(action)

  if (response.error || !response.payload) {
    throw response.errorObject || response.payload?.error
  }

  if (response.payload.in_progress) {
    setTimeout(() => response.query(), 2500)
  }

  if (response.payload.count === 0) {
    throw new Promise(noop)
  }

  return response
}
