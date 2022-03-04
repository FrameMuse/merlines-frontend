import { Action } from "api/client"
import { PaginationType } from "interfaces/Django"
import _ from "lodash"
import { ReactNode, useRef } from "react"
import { useQuery } from "react-fetching-library"

import SearchResultLoader from "./SearchResultLoader"


export function useTicketsSuspenseQuery<T extends PaginationType & { in_progress: boolean }>(action: Action<T>) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const response = useQuery(action)

  if (response.payload) {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    if (response.payload.count === 0 && response.payload.in_progress) {
      timeoutRef.current = setTimeout(() => response.query(), 2500)
      throw new Promise(_.noop)
    }

    if (response.payload.count === 0 && !response.payload.in_progress) {
      throw new Error("There is no results")
    }
  }

  return response
}

interface SearchResultTicketsProps {
  children: ReactNode
  loading?: boolean
}

export function SearchResultTickets(props: SearchResultTicketsProps) {
  if (props.loading) {
    return <SearchResultLoader />
  }

  return (
    <section className="ticket-list">
      <div className="ticket-list__container">
        {props.children}
      </div>
    </section>
  )
}
