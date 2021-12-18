import "./AdminSearchFilters.style.scss"

import { FormEventHandler } from "react"

import AdminButton from "../AdminButton/AdminButton"


interface AdminSearchFiltersProps {
  children: any
  onSubmit?: FormEventHandler<HTMLFormElement>
}

function AdminSearchFilters(props: AdminSearchFiltersProps) {
  return (
    <form className="search-filters" onSubmit={props.onSubmit}>
      <h3 className="search-filters__title">Search filters</h3>
      <div className="search-filters__container">
        {props.children}
        <AdminButton>Search</AdminButton>
      </div>
    </form>
  )
}

export default AdminSearchFilters
