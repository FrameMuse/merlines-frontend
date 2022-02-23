import { SearchFormRoute } from "components/SearchForm/SearchFormRoute"
import { useSelector } from "react-redux"
import { classWithModifiers } from "utils"

interface PriceCalendarSearchProps {

}
function PriceCalendarSearch(props: PriceCalendarSearchProps) {
  const transport = useSelector(state => state.search.transport)
  return (
    <div className="search-form">
      <div className="search-form__nav">
        {/* <button className={classWithModifiers("search-form__nav-btn", search.hasReturnDate && "active")} type="button" onClick={setReturnDate}>
          Туда - обратно
        </button>
        <button className={classWithModifiers("search-form__nav-btn", !search.hasReturnDate && "active")} type="button" onClick={removeReturnDate}>
          В одну сторону
        </button> */}
      </div>
      <div className="search-form__inner">
        {/* <SearchFormRoute /> */}
        <button className="search-form__btn" type="button">Найти</button>
      </div>
    </div>
  )
}

export default PriceCalendarSearch
