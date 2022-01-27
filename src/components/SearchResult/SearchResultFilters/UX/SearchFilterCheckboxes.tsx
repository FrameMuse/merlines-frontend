import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from "react"

import { searchFiltersContext } from "../SearchFilters"
import SearchFilterCheckbox, { SearchFilterCheckboxProps } from "./SearchFilterCheckbox"


interface SearchFilterCheckboxesProps {
  name: string
  children: ReactElement<SearchFilterCheckboxProps>[]
}

function SearchFilterCheckboxes(props: SearchFilterCheckboxesProps) {
  const [filters, setFilters] = useContext(searchFiltersContext)
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget

    if (input.name === "all") {
      setChecks({})
      return
    }

    // If there is only one checked left
    if (!input.checked && Object.values(checks).filter(Boolean).length <= 1) {
      return
    }

    setChecks({ ...checks, [input.name]: input.checked })
  }

  useEffect(() => {
    setFilters(({ ...filters, [props.name]: Object.keys(checks).join(",") }))
  }, [props.name, checks])

  useEffect(() => {
    if (Object.keys(filters).length === 0) setChecks({})
  }, [filters])

  return (
    <div className="search-checkboxes">
      <SearchFilterCheckbox name="all" checked={Object.keys(checks).length === 0} onChange={onChange}>{"Все"}</SearchFilterCheckbox>
      {React.Children.map(props.children, child => (
        <SearchFilterCheckbox {...child.props} checked={!!checks[child.props.name]} onChange={onChange} key={child.props.name} />
      ))}
    </div>
  )
}

// const ll = {
//   all: "Все",

//   0: "Без пересадки",
//   1: "1 пересадка",
//   2: "2 пересадка",
//   3: "3 пересадка"
// } as Record<string, string>

export default SearchFilterCheckboxes
