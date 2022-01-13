import Icon from "../../common/Icon"

function SearchResultSubscribePrice() {
  return (
    <button className="ticket-list__notice" type="button">
      <span className="ticket-list__notice-text">Отслеживать цену</span>
      <Icon name="notice" className="ticket-list__icon" />
    </button>
  )
}

export default SearchResultSubscribePrice
