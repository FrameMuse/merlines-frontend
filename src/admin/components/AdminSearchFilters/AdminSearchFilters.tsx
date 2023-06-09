import "./AdminSearchFilters.style.scss"

import { FormEvent } from "react"

import AdminButton from "../AdminButton/AdminButton"


interface AdminSearchFiltersProps {
  children: any
  pending?: boolean
  onSubmit?(form: FormEvent<HTMLFormElement>): Promise<void> | void
}

function AdminSearchFilters(props: AdminSearchFiltersProps) {
  return (
    <form className="admin-search-filters" onSubmit={props.onSubmit}>
      <h3 className="admin-search-filters__title">Search filters</h3>
      <div className="admin-search-filters__container">
        {props.children}
        <AdminButton pending={props.pending} type="submit">Search</AdminButton>
      </div>
    </form>
  )
}

export default AdminSearchFilters
