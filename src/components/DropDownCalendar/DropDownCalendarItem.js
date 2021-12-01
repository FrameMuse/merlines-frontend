import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

import {
  selectMainSearchParams,
  setDateFrom,
  setDateTo,
  reverseDate,
  setChangedInputFrom,
} from '../../reducers/mainSearchSlice';

import {
  selectDropDownCalendar,
  setIsOpenCalendar,
  setIsOneClick,
  setDateIntervalFrom,
  setDateIntervalTo,
  setIsDateInterval
} from '../../reducers/dropDownCalendarSlice';

import { monthNamesDate } from '../../constants';
import { firstToUpperCase, isPreviousDay } from '../../utils';

function DropDownCalendarItem({ date, dateToInput }) {
  const mainSearchParams = useSelector(selectMainSearchParams);
  const dropDownCalendarParams = useSelector(selectDropDownCalendar);
  const dispatch = useDispatch();
  const notCurrent = isPreviousDay(date);
  const [isPicked, setIsPicked] = useState(false);

  const checkDate = (date, dateFrom) => {
    if (date.month === dateFrom.month) {
      return date.day < dateFrom.day;
    } else {
      return date.month < dateFrom.month;
    }
  };

  const pickDate = (evt) => {
    const isSmallerDate = checkDate(
      date,
      DateTime.fromISO(mainSearchParams.date.api.from)
    );
    if (dropDownCalendarParams.isOneClick) {
      if (!notCurrent) {
        if (!mainSearchParams.one_way) {
          dispatch(setDateFrom(date));
          sessionStorage.setItem('dateFrom', date);
          dateToInput.current.focus();
          dispatch(setIsOneClick(false));
          dispatch(setIsDateInterval(true));
        } else {
          dispatch(setDateFrom(date));
          sessionStorage.setItem('dateFrom', date);
          dispatch(setIsOpenCalendar());
        }
      }
    } else {
      if (!notCurrent) {
        if (isSmallerDate) {
          dispatch(reverseDate());
          dispatch(setDateFrom(date));
          sessionStorage.setItem('dateFrom', date);
        } else {
          dispatch(setDateTo(date));
        }

        dispatch(setIsOpenCalendar());
        dispatch(setIsOneClick(true));
        dispatch(setIsDateInterval(false));
      }
    }
  };
  const dateToLocale = date.reconfigure({ locale: 'ru-RU' });

  const changeDate = (evt) => {
    const isSmallerDateInterval = checkDate(
      date,
      DateTime.fromISO(mainSearchParams.date.api.from)
    );

    if (dropDownCalendarParams.isOneClick) {
      if (!notCurrent) {
        if (!mainSearchParams.one_way) {
          dispatch(
            setChangedInputFrom(
              `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(
                dateToLocale.weekdayShort
              )}`
            )
          );
          dispatch(setDateIntervalFrom(date.toISO().slice(0, 10)));
        } else {
          dispatch(
            setChangedInputFrom(
              `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(
                dateToLocale.weekdayShort
              )}`
            )
          );
          dispatch(setDateIntervalFrom(date.toISO().slice(0, 10)));
          // dispatch(setChangedInputTo(
          //   `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(date.weekdayShort)}`
          // ));
          // dispatch(setDateIntervalTo(date.toISO().slice(0, 10)));
        }
      }
    } else {
      if (!notCurrent) {
        // const prevDate = DateTime.fromISO(mainSearchParams.date.api.from);

        if (isSmallerDateInterval) {
          // setIntervalDateTo(
          //   `${prevDate.day} ${
          //     monthNamesDate[prevDate.month]
          //   }, ${firstToUpperCase(
          //     prevDate.reconfigure({ locale: 'ru-RU' }).weekdayShort
          //   )}`
          // );
          // // dispatch(
          // //   setChangedInputTo(
          // //     `${prevDate.day} ${
          // //       monthNamesDate[prevDate.month]
          // //     }, ${firstToUpperCase(
          // //       prevDate.reconfigure({ locale: 'ru-RU' }).weekdayShort
          // //     )}`
          // //   )
          // // );
          // setIntervalDateFrom(
          //   `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(
          //     dateToLocale.reconfigure({ locale: 'ru-RU' }).weekdayShort
          //   )}`
          // );
          // // dispatch(
          // //   setChangedInputFrom(
          // //     `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(
          // //       dateToLocale.reconfigure({ locale: 'ru-RU' }).weekdayShort
          // //     )}`
          // //   )
          // // );
          dispatch(setDateIntervalTo(mainSearchParams.date.api.from));
          dispatch(setDateIntervalFrom(date.toISO().slice(0, 10)));
        } else {
          // dispatch(
          //   setChangedInputTo(
          //     `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(
          //       dateToLocale.reconfigure({ locale: 'ru-RU' }).weekdayShort
          //     )}`
          //   )
          // );
          // dispatch(
          //   setChangedInputFrom(
          //     `${prevDate.day} ${
          //       monthNamesDate[prevDate.month]
          //     }, ${firstToUpperCase(
          //       prevDate.reconfigure({ locale: 'ru-RU' }).weekdayShort
          //     )}`
          //   )
          // );
          dispatch(setDateIntervalTo(date.toISO().slice(0, 10)));
          dispatch(setDateIntervalFrom(mainSearchParams.date.api.from));
        }
      }
    }
  };

  useEffect(() => {
    setIsPicked(
      date.toISO().slice(0, 10) === mainSearchParams.date.api.from ||
        date.toISO().slice(0, 10) === mainSearchParams.date.api.to
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSearchParams.date.api]);

  return (
    <div
      onClick={
        !mainSearchParams.date.api.from || !mainSearchParams.date.api.to
          ? pickDate
          : pickDate
      }
      onPointerEnter={changeDate}
      className={`
        drop-down-calendar__day
        ${!date || notCurrent ? 'drop-down-calendar__day--disabled' : ''}
        ${
          isPicked
            ? 'drop-down-calendar__day--group drop-down-calendar__day--active'
            : ''
        }
        ${
          dropDownCalendarParams.dateIntervalArr.find(
            (item) => item === date.toISO().slice(0, 10)
          )
            ? 'drop-down-calendar__day--group'
            : ''
        }
        `}
    >
      <span className="drop-down-calendar__day-nam">{date.day}</span>
    </div>
  );
}

export default DropDownCalendarItem;
