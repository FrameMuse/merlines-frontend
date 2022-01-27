import Icon from "components/common/Icon"
import { useState } from "react"
import { classWithModifiers } from "utils"


interface SearchFilterProps {
  // name: string
  label: string
  extraLabel?: string | number

  defaultHidden?: boolean
  children: any
}

function SearchFilter(props: SearchFilterProps) {
  const [hidden, setHidden] = useState(props.defaultHidden)
  return (
    <div className="search-filter">
      <button className="search-filter__toggle" type="button" onClick={() => setHidden(!hidden)}>
        {props.label}
        {props.extraLabel && (
          <span className="weak">({props.extraLabel})</span>
        )}
        <Icon name="chevron" className={classWithModifiers("search-filter__icon", hidden && "down")} />
      </button>
      <div className={classWithModifiers("search-filter__container", hidden && "hidden")}>{props.children}</div>
    </div>
  )
}

export default SearchFilter
