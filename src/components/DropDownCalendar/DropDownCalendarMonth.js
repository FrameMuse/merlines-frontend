import Svg from '../common/Svg';
import { firstToUpperCase } from '../../utils';
import DropDownCalendarWeek from './DropDownCalendarWeek';
import DropDownCalendarMonthDays from './DropDownCalendarMonthDays';

function DropDownCalendarMonth({
  monthName,
  year,
  days,
  currentMonth,
  dateToInput,
  children
}) {
  return (
    <div className="drop-down-calendar__wrap drop-down-calendar__wrap--active">
      <div className="drop-down-calendar__month-wrap">
        <div className="drop-down-calendar__header">
          <div className="drop-down-calendar__title">
            <span className="drop-down-calendar__month">
              {firstToUpperCase(monthName)}
            </span>
            <span className="drop-down-calendar__year">{` ${year}`}</span>
          </div>

          <div className="drop-down-calendar__month-control">
            <Svg
              svgClass="drop-down-calendar-arrow drop-down-calendar-arrow--top"
              svgName="arrow-filter"
              svgWidth="8"
              svgHeight="7"
            />
            <Svg
              svgClass="drop-down-calendar-arrow drop-down-calendar-arrow--bottom"
              svgName="arrow-filter"
              svgWidth="8"
              svgHeight="7"
            />
          </div>
          {children}
        </div>
      </div>
      <div className="drop-down-calendar__dates">
        <DropDownCalendarWeek />
        <DropDownCalendarMonthDays
          days={days}
          currentMonth={currentMonth}
          dateToInput={dateToInput}
        />
      </div>
    </div>
  );
}

export default DropDownCalendarMonth;
