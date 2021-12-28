import "./AdminSearchFilters.style.scss"

import { FormEvent } from "react"

import AdminButton from "../AdminButton/AdminButton"


interface AdminSearchFiltersProps {
  children: any
  pending?: boolean
  onSubmit?(form: FormEvent<HTMLFormElement>): Promise<unknown> | void
}

function AdminSearchFilters(props: AdminSearchFiltersProps) {
  return (
    <form className="search-filters" onSubmit={props.onSubmit}>
      <h3 className="search-filters__title">Search filters</h3>
      <div className="search-filters__container">
        {props.children}
        <AdminButton pending={props.pending} type="submit">Search</AdminButton>
      </div>
    </form>
  )
}

export default AdminSearchFilters
