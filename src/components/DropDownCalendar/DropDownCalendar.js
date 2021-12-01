import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import './drop-down-calendar.scss'

import {
  setIsOpenCalendar,
  setTwoMonthsPlus,
  setTwoMonthsMinus,
  setTwoMonthsIntervals,
  setTwoMonthsCurrent,
  setTwoMonthsNext,
  selectDropDownCalendar
} from '../../reducers/dropDownCalendarSlice';
import { selectMainSearchParams } from '../../reducers/mainSearchSlice';
import DropDownCalendarSlider from './DropDownCalendarSlider';
import DropDownCalendarMonth from './DropDownCalendarMonth';
import DropDownCalendarSelectMonth from './DropDownCalendarSelectMonth';

function DropDownCalendar({ dateToInput, closeToggle, isOffsetCal, node }) {
  const [isCurrent, setIsCurrent] = useState(true);
  const dispatchCal = useDispatch();
  const mainSearchParams = useSelector(selectMainSearchParams);
  const { twoMonthsDates, twoMonthsIntervals } = useSelector(
    selectDropDownCalendar
  );

  useEffect(() => {
    document.addEventListener('mousedown', closeToggle);

    return () => {
      document.removeEventListener('mousedown', closeToggle);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatchCal(setTwoMonthsIntervals());
    setIsCurrent(DateTime.now().month === twoMonthsDates.current.month);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twoMonthsDates]);

  return (
    <div
      ref={node}
      className={isOffsetCal ? 'drop-down-calendar drop-down-calendar--offset' :  'drop-down-calendar'}
    >
      <DropDownCalendarSlider
        clickPrev={() => dispatchCal(setTwoMonthsMinus())}
        clickNext={() => dispatchCal(setTwoMonthsPlus())}
        isCurrent={isCurrent}
      />
      <div className="drop-down-calendar__container">
        <button
          onClick={() => dispatchCal(setIsOpenCalendar())}
          className="drop-down-calendar__close-btn"
          type="button"
        >
          закрыть
        </button>
        <div className="drop-down-calendar__form">
          <div className="form__group form__group--date-dep">
            <input
              className="form__input"
              type="text"
              id="date-departure"
              value={
                mainSearchParams.date.front.from
                  ? mainSearchParams.date.front.from
                  : mainSearchParams.date.changedInput.from
              }
              readOnly
              placeholder="Дата отправления"
            />
            <label className="form__label" htmlFor="date-departure">
              дата отправления
            </label>
          </div>
          <div className="form__group form__group--date-arr">
            <input
              className="form__input"
              type="text"
              id="date-arrival"
              value={
                mainSearchParams.date.front.to
                  ? mainSearchParams.date.front.to
                  : mainSearchParams.date.changedInput.to
              }
              readOnly
              placeholder="Дата обратно"
            />
            <label className="form__label" htmlFor="date-arrival">
              обратно
            </label>
          </div>
        </div>
        <DropDownCalendarMonth
          dateToInput={dateToInput}
          monthName={
            twoMonthsDates.current.reconfigure({ locale: 'ru' }).monthLong
          }
          year={twoMonthsDates.current.year}
          days={twoMonthsIntervals.current}
          currentMonth={twoMonthsDates.current}
        >
          <DropDownCalendarSelectMonth
            dispatch={(e) => dispatchCal(setTwoMonthsCurrent(e.target.value))}
          />
        </DropDownCalendarMonth>
        <DropDownCalendarMonth
          dateToInput={dateToInput}
          monthName={
            twoMonthsDates.next.reconfigure({ locale: 'ru' }).monthLong
          }
          year={twoMonthsDates.next.year}
          days={twoMonthsIntervals.next}
          currentMonth={twoMonthsDates.next}
        >
          <DropDownCalendarSelectMonth
            dispatch={(e) => dispatchCal(setTwoMonthsNext(e.target.value))}
          />
        </DropDownCalendarMonth>
      </div>
    </div>
  );
}

export default DropDownCalendar;
