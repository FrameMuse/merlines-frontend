import React, {useEffect, useState} from "react";
import {formatDuration, shortenDate} from "../../../../utils";



const SearchResultTrainTicketInner = ({flight, voyages, maxDuration}) => {
  const [flightDuration, setFlightDuration] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const duration = arr => {
      let durationTime = 0;
      arr.forEach(item => durationTime += item.duration);
      return durationTime;
    };

    setFlightDuration(formatDuration(maxDuration));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flight])

  let durations = [];
  voyages.forEach((_, i) => {
    if (i + 1 < voyages.length) {
      durations.push({
        type: 'item',
        name: `Вылет из ${voyages[i].departure_point_name_cases.po}, ${voyages[i].departure_point_name_airport}`,
        add: `в ${voyages[i].departure_date} ${voyages[i].departure_time}`,
        add2: `${formatDuration(voyages[i].duration)} в пути`,
        duration: voyages[i].duration,
        //       fromDate: Date.parse(`${voyages[i].departure_date} ${voyages[i].departure_time}`),
        //       toDate: Date.parse(`${voyages[i].arrival_date} ${voyages[i].arrival_time}`)
      }, {
        type: 'stop',
        name: `Пересадка в ${voyages[i].arrival_point_name_cases.pr}, ${voyages[i].arrival_point_name_airport}`,
        add: `${formatDuration((Date.parse(`${voyages[i+1].departure_date}T${voyages[i+1].departure_time}`) - (Date.parse(`${voyages[i].arrival_date}T${voyages[i].arrival_time}`))) / 1000 / 60)} ожидания`,
        duration: (Date.parse(`${voyages[i+1].departure_date}T${voyages[i+1].departure_time}`) - (Date.parse(`${voyages[i].arrival_date}T${voyages[i].arrival_time}`))) / 1000 / 60,
      });
    } else {
      durations.push({
        type: 'item',
        name: `Вылет из ${voyages[i].departure_point_name_cases.po}, ${voyages[i].departure_point_name_airport}`,
        add: `в ${voyages[i].departure_date} ${voyages[i].departure_time}`,
        add2: `${formatDuration(voyages[i].duration)} в пути`,
        duration: voyages[i].duration,
        //       fromDate: Date.parse(`${voyages[i].departure_date} ${voyages[i].departure_time}`),
        //       toDate: Date.parse(`${voyages[i].arrival_date} ${voyages[i].arrival_time}`)
      });
    }
  });

  const multiplierDuration = (100 / Math.max(...durations.map(({duration}) => duration)));

  return (
    <>
      <div className="ticket__inner">
        <div className="ticket__inner-item ticket__inner-item--left">
          <time className="ticket__date">{shortenDate(flight[0].departure_date)}</time>
          <div className="ticket__time">{flight[0].departure_time}</div>
        </div>
        <div className="ticket__middle">
            <span className="ticket__flight-time">
              {`${flightDuration} в пути`}
            </span>
          <div className="ticket__union">
            {(
              <>
                {
                  durations.map((duration) =>
                    <div className={`ticket__union-${duration.type}`} style={{ width: `${(duration.duration * multiplierDuration)}%` }}>
                      <div className="ticket__union-popup">
                        {duration.name}
                        <br/>{duration.add}
                        <br/>{duration.add2}
                      </div>
                    </div>
                  )}
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
          <time className="ticket__date">{shortenDate(flight[flight.length - 1].arrival_date)}</time>
          <div className="ticket__time">{flight[flight.length - 1].arrival_time}</div>
        </div>
      </div>
      <div className="ticket__point">
        <div className="ticket__point-item ticket__point-item--left">{voyages[0].departure_point_name}</div>
        <div className="ticket__point-item ticket__point-item--right">{voyages[voyages.length - 1].arrival_point_name}</div>
      </div>
      </>
  )
}
export default SearchResultTrainTicketInner
