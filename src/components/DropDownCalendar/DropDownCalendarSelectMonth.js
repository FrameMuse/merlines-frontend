import { useCallback } from 'react';
import { DateTime } from 'luxon';

const DropDownCalendarSelectMonth = ({ dispatch }) => {
  const getMonthData = useCallback(() => {
    const currMonth = DateTime.now().month;
    return Array.from({ length: 12 }, (e, i) => {
      return {
        text: new Date(null, currMonth + i, null).toLocaleDateString('ru', {
          month: 'long'
        }),
        date: DateTime.now().plus({ months: i }).toISODate()
      };
    });
  }, []);

  return (
    <select onChange={dispatch} className="drop-down-calendar-select">
      {getMonthData().map((month, index) => (
        <option key={index} value={month.date}>
          {month.text}
        </option>
      ))}
    </select>
  );
};

export default DropDownCalendarSelectMonth;
