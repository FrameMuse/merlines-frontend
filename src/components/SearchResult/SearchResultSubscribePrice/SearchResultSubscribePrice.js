import Icon from "../../common/Icon"

function SearchResultSubscribePrice() {
  return (
    <button className="ticket-list__notice" type="button">
      <span className="ticket-list__notice-text">Отслеживать цену</span>
      <Icon
        className="ticket-list__notice-icon"
        name="notice"
        width="15"
        height="15"
      />
    </button>
  )
}

export default SearchResultSubscribePrice
