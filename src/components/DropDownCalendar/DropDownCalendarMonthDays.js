import React, { useState, useEffect } from 'react';
import { DateTime, Interval } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDropDownCalendar,
  setDateIntervalArr
} from '../../reducers/dropDownCalendarSlice';
import DropDownCalendarItem from './DropDownCalendarItem';

function DropDownCalendarMonthDays({ days, currentMonth, dateToInput }) {
  const [currentDays, setCurrentDays] = useState([]);
  const dropDownCalendarParams = useSelector(selectDropDownCalendar);
  const dispatch = useDispatch();

  useEffect(() => {
    const start = DateTime.fromISO(
      dropDownCalendarParams.dateInterval.from
    ).startOf('day');
    const end = DateTime.fromISO(dropDownCalendarParams.dateInterval.to).endOf(
      'day'
    );

    if (dropDownCalendarParams.isDateInterval) {
      dispatch(
        setDateIntervalArr(
          Interval.fromDateTimes(start, end)
            .splitBy({ days: 1 })
            .map((day) => day.start.toISODate())
        )
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownCalendarParams.dateInterval]);

  useEffect(() => {
    setCurrentDays(
      days.map((day) => {
        if (DateTime.fromISO(day).month !== currentMonth.month) {
          return '';
        } else {
          return day;
        }
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="drop-down-calendar__days-list">
      {currentDays.map((day, index) =>
        day ? (
          <DropDownCalendarItem
            key={day}
            date={day && DateTime.fromISO(day)}
            dateToInput={dateToInput}
          />
        ) : (
          <div key={index}></div>
        )
      )}
    </div>
  );
}

export default DropDownCalendarMonthDays;
