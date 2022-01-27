import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { useRef } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import { noop } from "utils"

const suspender = (new Promise(noop)).then(() => { 1 }, () => { 1 })

export default function useTicketsQuery<T extends PaginationType & { in_progress: boolean; }>(action: Action<T>) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const response = useSuspenseQuery(action)

  if (response.error || !response.payload) {
    throw response.errorObject || response.payload?.error
  }

  timeoutRef.current && clearTimeout(timeoutRef.current)
  if (response.payload.count === 0 && response.payload.in_progress) {
    timeoutRef.current = setTimeout(() => response.query(), 2500)
    throw suspender
  }

  if (response.payload.count === 0 && !response.payload.in_progress) {
    throw new Error("There is no results")
  }

  return response
}
