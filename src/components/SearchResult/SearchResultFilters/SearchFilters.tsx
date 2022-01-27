// SCSS
import "./filters.scss"

import useDebounce from "hooks/useDebounce"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"


type SearchFilters = Record<string, string | number | boolean | undefined>
export const searchFiltersContext = createContext<[SearchFilters, Dispatch<SetStateAction<SearchFilters>>]>([{}, () => { 1 }])

function SearchFilters(props: { children: any, onChange: Dispatch<SearchFilters> }) {
  const reducer = useState<SearchFilters>({})
  const filters = useDebounce(reducer[0], 1000)
  useEffect(() => {
    props.onChange(filters)
  }, [props.onChange, filters])
  return (
    <searchFiltersContext.Provider value={reducer}>
      <div className="filters__container">
        <SearchFiltersHeader />

        <div className="search-filters">
          {props.children}
        </div>
      </div>
    </searchFiltersContext.Provider>
  )
}

function SearchFiltersHeader() {
  const [_filters, setFilters] = useContext(searchFiltersContext)
  return (
    <div className="filters__header">
      <h2 className="filters__title">Фильтры</h2>
      <button className="filters__clear" type="button" onClick={() => setFilters({})}>очистить все</button>
    </div>
  )
}

export default SearchFilters
