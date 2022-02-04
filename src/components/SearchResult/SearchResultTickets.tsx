import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import { ReactNode, useRef } from "react"
import { useQuery } from "react-fetching-library"

import mock from "./mock.json"


export function useTicketsSuspenseQuery<T extends PaginationType & { in_progress: boolean }>(action: Action<T>) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const response = useQuery(action, false)

  // if (response.error || !response.payload) {
  //   throw response.errorObject || response.payload?.error
  // }

  // timeoutRef.current && clearTimeout(timeoutRef.current)
  // if (response.payload.count === 0 && response.payload.in_progress) {
  //   timeoutRef.current = setTimeout(() => response.query(), 2500)
  //   throw new Promise(noop)
  // }

  // if (response.payload.count === 0 && !response.payload.in_progress) {
  //   throw new Error("There is no results")
  // }

  // ClientAPI.cache?.add(action, response)

  return {
    ...response,
    payload: mock as T
  }

  // const result: {
  //   tickets: T["results"],

  // } = {
  //   tickets: mock.results
  // }

  // return result
}

export function SearchResultTickets(props: { children: ReactNode }) {
  return (
    <section className="ticket-list">
      <div className="ticket-list__container">
        {props.children}
      </div>
    </section>
  )
}
