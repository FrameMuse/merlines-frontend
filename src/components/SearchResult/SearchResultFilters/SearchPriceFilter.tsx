import { useState } from "react"
import {classWithModifiers, getDefaultSelectedCurrency, getDefaultSelectedLanguage} from "utils"

enum Prices {
  cheap, fast, optimal
}

const ll = {
  cheap: "Самый дешёвый",
  fast: "Самый быстрый",
  optimal: "Оптимальный",
} as Record<string, string>

interface SearchPriceFilterProps {
  prices: [number?, number?, number?]
}
function SearchPriceFilter(props: SearchPriceFilterProps) {
  const [choice, setChoice] = useState(Prices.cheap)
  return (
    <div className="filters__container">
      <h2 className="visually-hidden">Отсортировать</h2>
      <div className="filters__sort">
        {props.prices.map((price, index) => price != null && (
          <button className={classWithModifiers("filters__sort-btn", index === choice && "active")} type="button" onClick={() => setChoice(index)} key={index}>
            <span className="filters__sort-text">{ll[Prices[index]]}</span>
            <span className="filters__sort-price">от {price?.toPrice(getDefaultSelectedLanguage(), getDefaultSelectedCurrency()) ?? "..."}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchPriceFilter
