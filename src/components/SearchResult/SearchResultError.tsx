import "../ErrorView/error.scss"

function SearchResultTicketError() {
  return (
    <div className="ticket-list__error">
      <h2 className="ticket-list__title">По вашему запросу билеты не найдены</h2>
      <p className="ticket-list__error-head">Это могло произойти по следующим причинам:</p>
      <div className="ticket-list__error-list">
        <div className="ticket-list__error-item">1. Слишком поздние даты</div>
        <div className="ticket-list__error-item">2. Все билеты на эту дату раскуплены</div>
      </div>
    </div>
  )
}
export default SearchResultTicketError
