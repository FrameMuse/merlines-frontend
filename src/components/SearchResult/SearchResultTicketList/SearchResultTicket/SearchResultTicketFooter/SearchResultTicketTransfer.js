import { Duration } from "luxon"
import React from "react"

import Icon from "../../../../common/Icon"

function SearchResultTicketTransfer({
  transfers,
  transfer_duration,
  isAirportChange
}) {
  const transferDuration = Duration.fromObject({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: transfer_duration
  })
    .normalize()
    .toObject()

  return (
    <div className="ticket__transfer">
      <span className="ticket__transfer-text">
        <Icon
          className="ticket__transfer-icon"
          name="transfer"
          width="15"
          height="15"
        />
        {`Пересадка в ${transfers} `}
      </span>
      <span
        style={{ color: "red", "padding-left": "10px", "font-size": "12px" }}
      >
        {isAirportChange ? " смена аэропорта" : ""}
      </span>
      <time className="ticket__transfer-time">{`${transferDuration.hours}ч ${transferDuration.minutes}м`}</time>
    </div>
  )
}

export default SearchResultTicketTransfer
