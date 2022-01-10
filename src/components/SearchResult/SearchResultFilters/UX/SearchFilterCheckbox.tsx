import { ChangeEventHandler } from "react"

export interface SearchFilterCheckboxProps {
  children: any

  name: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

function SearchFilterCheckbox(props: SearchFilterCheckboxProps) {
  return (
    <label className="filters__group">
      <input
        className="filters__checkbox"
        type="checkbox"

        name={props.name}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
      />
      <div className="filters__label">{props.children}</div>
    </label>
  )
}

export default SearchFilterCheckbox
