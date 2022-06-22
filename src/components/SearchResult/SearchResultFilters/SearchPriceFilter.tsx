import useLocalization from "plugins/localization/hook"
import { Dispatch } from "react"
import { useState } from "react"
import { classWithModifiers, getDefaultSelectedCurrency, getDefaultSelectedLanguage } from "utils"

enum Prices {
  cheap, fast, optimal
}

interface SearchPriceFilterProps {
  prices: [number?, number?, number?]
  onChange?: Dispatch<keyof typeof Prices>
}

function SearchPriceFilter(props: SearchPriceFilterProps) {
  const ll = useLocalization(ll => ll)

  const [choice, setChoice] = useState(Prices.cheap)
  return (
    <div className="filters__container">
      <h2 className="visually-hidden">{ll.searchResult.sorting}</h2>
      <div className="filters__sort">
        {[...Array(3).fill(null)].map((price, index) => (
          <button className={classWithModifiers("filters__sort-btn", index === choice && "active")} type="button"
            onClick={() => (setChoice(index), props.onChange?.(Prices[index] as never))} key={index}>
            <span className="filters__sort-text">{ll.searchResult[Prices[index]]}</span>
            <span
              className="filters__sort-price">от {price?.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency()) ?? "..."}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchPriceFilter
