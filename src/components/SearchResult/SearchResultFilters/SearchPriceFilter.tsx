import { useState } from "react"
import { classWithModifiers } from "utils"

const ll = {
  cheap: "Самый дешёвый",
  fast: "Самый быстрый",
  optimal: "Оптимальный",
}
const filters = [
  { name: "cheap", price: 20000 },
  { name: "fast", price: 113820 },
  { name: "optimal", price: 73500 }
] as const
interface SearchPriceFilterProps {

}
function SearchPriceFilter(props: SearchPriceFilterProps) {
  const [choice, setChoice] = useState<"cheap" | "fast" | "optimal">("optimal")
  return (
    <div className="filters__container">
      <h2 className="visually-hidden">Отсортировать</h2>
      <div className="filters__sort">
        {filters.map((filter, index) => (
          <button className={classWithModifiers("filters__sort-btn", filter.name === choice && "active")} type="button" onClick={() => setChoice(filter.name)} key={index}>
            <span className="filters__sort-text">{ll[filter.name]}</span>
            <span className="filters__sort-price">от {filter.price.toPrice("ru", "rub")}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchPriceFilter
