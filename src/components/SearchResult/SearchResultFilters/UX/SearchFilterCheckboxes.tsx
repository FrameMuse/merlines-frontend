import React, { ChangeEvent, ReactElement, useState } from "react"

import SearchFilterCheckbox, { SearchFilterCheckboxProps } from "./SearchFilterCheckbox"


interface SearchFilterCheckboxesProps {
  name: string
  children: ReactElement<SearchFilterCheckboxProps>[]
}

function SearchFilterCheckboxes(props: SearchFilterCheckboxesProps) {
  const [checks, setChecks] = useState<Record<string, boolean>>({ all: true })

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget

    if (input.name === "all") {
      setChecks({ all: true })
      return
    }

    // If there is only one checked left
    if (!input.checked && Object.values(checks).filter(Boolean).length <= 1) {
      return
    }

    setChecks({ ...checks, all: false, [input.name]: input.checked })
  }

  return (
    <div className="search-checkboxes">
      <SearchFilterCheckbox children={"Все"} name={"all"} checked={checks.all} onChange={onChange} />
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
