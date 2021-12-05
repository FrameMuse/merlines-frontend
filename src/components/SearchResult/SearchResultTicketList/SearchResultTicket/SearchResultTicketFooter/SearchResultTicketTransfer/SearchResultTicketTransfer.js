import { Duration } from "luxon"
import React from "react"

import Svg from "../../../../../common/Svg"

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
        <Svg
          svgClass="ticket__transfer-icon"
          svgName="transfer"
          svgWidth="15"
          svgHeight="15"
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
