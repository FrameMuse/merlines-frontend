// SCSS
import "./filters.scss"

import useDebounce from "hooks/useDebounce"
import { noop } from "lodash"
import useLocalization from "plugins/localization/hook"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"


export type SearchFiltersType = Record<string, string | number | boolean | undefined>
export const searchFiltersContext = createContext<[SearchFiltersType, Dispatch<SetStateAction<SearchFiltersType>>]>([{}, noop])

export interface SearchFiltersBaseProps<T extends object> {
  onChange: Dispatch<Partial<T>>
}

interface SearchFiltersProps extends SearchFiltersBaseProps<SearchFiltersType> {
  children: ReactNode
}

function SearchFilters(props: SearchFiltersProps) {
  const reducer = useState<SearchFiltersType>({})
  const filters = useDebounce(reducer[0], 1000)
  useEffect(() => props.onChange(filters), [props.onChange, filters])
  return (
    <searchFiltersContext.Provider value={reducer}>
      <div className="filters__container">
        <SearchFiltersHeader />
        <div className="search-filters">{props.children}</div>
      </div>
    </searchFiltersContext.Provider>
  )
}

function SearchFiltersHeader() {
  const [, setFilters] = useContext(searchFiltersContext)
  const ll = useLocalization(ll => ll)
  return (
    <div className="filters__header">
      <h2 className="filters__title">{ll.searchResult.filters}</h2>
      <button className="filters__clear" type="button" onClick={() => setFilters({})}>
        {ll.searchResult.clearAll}
      </button>
    </div>
  )
}


export default SearchFilters
