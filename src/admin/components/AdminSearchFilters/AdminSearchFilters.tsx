import "./AdminSearchFilters.style.scss"

import { useRef } from "react"

import AdminButton from "../AdminButton/AdminButton"


interface AdminSearchFiltersProps {
  children: any
  onSubmit?(form: HTMLFormElement | null): Promise<unknown> | void
}

function AdminSearchFilters(props: AdminSearchFiltersProps) {
  const ref = useRef<HTMLFormElement | null>(null)
  return (
    <form className="search-filters" ref={ref} onSubmit={event => event.preventDefault()}>
      <h3 className="search-filters__title">Search filters</h3>
      <div className="search-filters__container">
        {props.children}
        <AdminButton onClick={() => props.onSubmit?.(ref.current)}>Search</AdminButton>
      </div>
    </form>
  )
}

export default AdminSearchFilters
