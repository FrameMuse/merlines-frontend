import { Action } from "api/client"
import { ReactNode, useRef, useState } from "react"
import { QueryError, QueryResponse, useClient } from "react-fetching-library"

import SearchResultLoader from "./SearchResultLoader"

export function useProgressiveSuspenseQuery<T extends { in_progress: boolean, results: unknown[] }>(action: Action<T>) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [flag, setFlag] = useState(false)
  const { suspenseCache, query } = useClient()

  const suspenseCacheItem = suspenseCache.get(action)

  if (suspenseCacheItem && suspenseCacheItem.response == null) {
    throw suspenseCacheItem.fetch
  }

  if (suspenseCacheItem?.response) {
    const response = suspenseCacheItem.response as QueryResponse<T>
    if (response.error) {
      throw new QueryError("useProgressiveSuspenseQuery", response)
    }

    if (response.payload) {
      if (response.payload.in_progress) {
        timeoutRef.current && clearTimeout(timeoutRef.current)
        if (response.payload.results.length > 0) {
          timeoutRef.current = setTimeout(() => {
            forceUpdate().then(() => setFlag(!flag))
          }, 2500)
          return { ...response, passiveLoading: true }
        } else {
          throw new Promise<void>(resolve => {
            timeoutRef.current = setTimeout(() => {
              suspenseCache.remove(action)
              resolve()
            }, 2500)
          })
        }
      }
    }

    return { ...response, passiveLoading: false }
  }

  function forceUpdate() {
    const fetch = query(action, true)
    suspenseCache.add(action, { fetch })
    fetch.then(response => suspenseCache.add(action, { fetch, response }))
    return fetch
  }

  throw forceUpdate()
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
