import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { selectPriceCalendar } from '../../../reducers/priceCalendarSlice';
import PriceCalendarDaysListItem from './PriceCalendarDaysListItem';

function PriceCalendarDaysList() {
  const priceCalendarData = useSelector(selectPriceCalendar);
  const isBus = priceCalendarData.pickedMonthData.transport === 'bus';

  return (
    <div className="days__list">
      {
        priceCalendarData.pickedMonthData.currentMonth
          ?
          <>
            {
              priceCalendarData.pickedMonthData.previousMonth
              && priceCalendarData.pickedMonthData.previousMonth.map((day, index) =>
                <PriceCalendarDaysListItem key={index} notCurrent={true} />)
            }

            {
              priceCalendarData.pickedMonthData.currentMonth.map((day, index) =>
                <PriceCalendarDaysListItem
                  key={index} date={DateTime.fromISO(day.date)} price={isBus ? (day.price / 100) : day.price} betterPrice={priceCalendarData.pickedMonthData.betterPrice} />)
            }

            {
              priceCalendarData.pickedMonthData.nextMonth
              && priceCalendarData.pickedMonthData.nextMonth.map((day, index) =>
                <PriceCalendarDaysListItem key={index} notCurrent={true} />)
            }
          </>
          :
          <div>..... is Loading</div>
      }
    </div>
  )
};

export default PriceCalendarDaysList;
