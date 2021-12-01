import React, {useEffect, useState} from "react";
import {formatDuration, shortenDate} from "../../../../utils";
import {getSimpleTimeFromISO} from "../../../../../../utils";



const SearchResultBusTicketInner = (
  {
    flight,
    voyages,
    maxDuration,
    arrivalDateTime,
    arrivalPointName,
    departureDatetime,
    departurePointName,
  }) => {
  const [wayDuration, setWayDuration] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const duration = arr => {
      let durationTime = 0;
      arr.forEach(item => durationTime += item.duration);
      return durationTime;
    };

    setWayDuration(formatDuration(maxDuration));
  }, [maxDuration])

  let durations = [];
  voyages.forEach((_, i) => {
    durations.push({
      type: 'item',
      name: `Выезд из ${voyages[i].departurePointName}`,
      add: `в ${getSimpleTimeFromISO(departureDatetime)}`,
      add2: `${formatDuration(maxDuration)} в пути`,
      duration: 0,
      fromDate: Date.parse(`${Date.parse(`${departureDatetime}`)}`),
      toDate: Date.parse(`${Date.parse(`${arrivalDateTime}`)}`)
    }, {
      type: 'stop',
      name: `Пересадка в ${arrivalPointName}`,
      add: `${formatDuration((Date.parse(`${departureDatetime}`) - (Date.parse(`${arrivalDateTime}`))))} ожидания`,
      duration: 100,
    });
  });

  // const multiplierDuration = (100 / Math.max(...durations.map(({duration}) => duration)));

  return (
    <>
      <div className="ticket__inner">
        <div className="ticket__inner-item ticket__inner-item--left">
          <time className="ticket__date">{shortenDate(departureDatetime)}</time>
          <div className="ticket__time">{getSimpleTimeFromISO(departureDatetime)}</div>
        </div>
        <div className="ticket__middle">
            <span className="ticket__flight-time">
              {`${wayDuration} в пути`}
            </span>
          <div className="ticket__union">
            {(
              <>
                <div className={`ticket__union-item`} style={{ width: `100%` }}>
                  <div className="ticket__union-popup">
                    {`Отправление ${departurePointName || 'нет данных'}, прибытие ${arrivalPointName || 'нет данных'}`}

                  </div>
                </div>
                <div className={`ticket__union-stop`} style={{ width: `0%` }}>
                  <div className="ticket__union-popup">

                    <br/>
                    <br/>{arrivalPointName}
                  </div>
                </div>
              </>
            )}
            {/* <div className="ticket__union-item" style={{ width: '30%' }}>
                <div className="ticket__union-popup">Вылет из аэропорт Домодедово, в пути 5ч 5м</div>
              </div>
              <div className="ticket__union-stop" style={{ width: '20%' }}>
                <div className="ticket__union-popup">Ожидание в аэропорте Орли, 2ч 20м</div>
              </div>
              <div className="ticket__union-item">
                <div className="ticket__union-popup">Вылет из аэропорт Домодедово, в пути 5ч 5м</div>
              </div>
              <div className="ticket__union-stop">
                <div className="ticket__union-popup">Ожидание в аэропорте Орли, 2ч 20м</div>
              </div>
              <div className="ticket__union-item" style={{ width: '45%' }}>
                <div className="ticket__union-popup">Посадка аэропорт Орли, в 17:20</div>
              </div> */}
          </div>
        </div>
        <div className="ticket__inner-item ticket__inner-item--right">
          <time className="ticket__date">{shortenDate(arrivalDateTime)}</time>
          <div className="ticket__time">{getSimpleTimeFromISO(arrivalDateTime)}</div>
        </div>
      </div>
      <div className="ticket__point">
        <div className="ticket__point-item ticket__point-item--left">{departurePointName}</div>
        <div className="ticket__point-item ticket__point-item--right">{arrivalPointName}</div>
      </div>
      </>
  )
}
export default SearchResultBusTicketInner
