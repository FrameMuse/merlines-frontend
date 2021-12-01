import React from "react"
import "./error.scss"

const SearchResultTicketError = () => {
  return (
    <div className="ticket-list__error">
      <h2 className="ticket-list__title">
        По вашему запросу билеты не найдены
      </h2>
      <p className="ticket-list__error-head">
        Это могло произойти по следующим причинам:
      </p>
      <ul className="ticket-list__error-list">
        <li className="ticket-list__error-item">1. Слишком поздние даты</li>
        <li className="ticket-list__error-item">
          2. Все билеты на эту дату раскуплены
        </li>
      </ul>
    </div>
  )
}
export default SearchResultTicketError
