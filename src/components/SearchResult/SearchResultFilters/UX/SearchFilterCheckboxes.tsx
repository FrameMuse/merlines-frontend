import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from "react"

import useLocalization from "../../../../plugins/localization/hook"
import { searchFiltersContext } from "../SearchFilters"
import SearchFilterCheckbox, { SearchFilterCheckboxProps } from "./SearchFilterCheckbox"


interface SearchFilterCheckboxesProps {
  name: string
  resetBtn?: boolean
  children: ReactElement<SearchFilterCheckboxProps>[] | ReactElement<SearchFilterCheckboxesProps>
}

function SearchFilterCheckboxes(props: SearchFilterCheckboxesProps) {
  const ll = useLocalization(ll => ll)
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

  function onReset() {
    setChecks({})
  }

  useEffect(() => {
    setFilters(({ ...filters, [props.name]: Object.keys(checks).filter(key => checks[key]).join(",") }))
  }, [props.name, checks])

  useEffect(() => {
    if (Object.keys(filters).length === 0) setChecks({})
  }, [filters])

  return (
    <div className="search-checkboxes">
      {props.resetBtn &&
      <button onClick={onReset} className={"search-filter__reset-btn"}>
        <svg className={"search-filter__reset-icon"} width="15" height="15">
          <use href="img/sprite.svg#close" />
        </svg>
        {ll.searchResult.resetAll}
      </button>}

      <SearchFilterCheckbox name="all" checked={Object.keys(checks).length === 0} onChange={onChange}>
        {ll.searchResult.all}
      </SearchFilterCheckbox>
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
