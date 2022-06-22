import { ReactNode } from "react"

import SearchResultLoader from "./SearchResultLoader"

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
