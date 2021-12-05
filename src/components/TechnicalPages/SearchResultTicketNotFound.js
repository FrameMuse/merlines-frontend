import "./error.scss"

import React from "react"

const SearchResultTicketNotFound = () => {
  return (
    <div className="ticket-list__not-found">
      <h2 className="ticket-list__title">
        По вашему запросу билеты не найдены
      </h2>
      <p className="ticket-list__error-head">
        Это могло произойти по следующим причинам:
      </p>
      <ol className="ticket-list__error-list">
        <li className="ticket-list__error-item">1. Слишком поздние даты</li>
        <li className="ticket-list__error-item">
          2. Все билеты на эту дату раскуплены
        </li>
        <li className="ticket-list__error-item">
          3. В данном направлении данные отсутствуют
        </li>
      </ol>
    </div>
  )
}

export default SearchResultTicketNotFound
