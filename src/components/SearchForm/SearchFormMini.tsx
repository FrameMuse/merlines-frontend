import { useSelector } from "react-redux"

import Icon from "../common/Icon"


interface SearchFormMiniProps {
  openForm: () => void
}

function SearchFormMini(props: SearchFormMiniProps) {
  const search = useSelector(state => state.search)
  return (
    <div className="download-close__wrap">
      <div className="download-close__container">
        <div className="download__field download__field--one">
          <span className="download__item download__item--city download__item--icon">
            {search.routes[0].departureDate?.toLocaleDateString("ru") || ""}
          </span>
          <span className="download__item download__item--city">
            {search.routes[0].returnDate?.toLocaleDateString("ru") || ""}
          </span>
          <span className="download__counter">+3</span>
          <span className="download__item download__item--date">
            {search.routes[0].departurePoint?.title || ""}
          </span>
          <span className="download__item download__item--date">
            {search.routes[0].arrivalPoint?.title || ""}
          </span>
          <button className="download__edit" type="button" onClick={props.openForm}>
            <Icon
              className="download__edit-icon"
              name="edit"
              width="16"
              height="16"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchFormMini
