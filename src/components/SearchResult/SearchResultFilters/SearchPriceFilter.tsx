import {useState} from "react"
import {classWithModifiers, getDefaultSelectedCurrency, getDefaultSelectedLanguage} from "utils"

import useLocalization from "../../../plugins/localization/hook"

enum Prices {
  cheap, fast, optimal
}

interface SearchPriceFilterProps {
  prices: [number?, number?, number?]
}

function SearchPriceFilter(props: SearchPriceFilterProps) {
  const ll = useLocalization(ll => ll)

  const [choice, setChoice] = useState(Prices.cheap)
  return (
    <div className="filters__container">
      <h2 className="visually-hidden">{ll.searchResult.sorting}</h2>
      <div className="filters__sort">
        {props.prices.map((price, index) => price != null && (
          <button className={classWithModifiers("filters__sort-btn", index === choice && "active")} type="button"
            onClick={() => setChoice(index)} key={index}>
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
