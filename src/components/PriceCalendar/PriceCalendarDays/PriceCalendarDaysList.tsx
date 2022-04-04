import PriceCalendarDay from "./PriceCalendarDay"

interface PriceCalendarDaysListProps {

}

function PriceCalendarDaysList(props: PriceCalendarDaysListProps) {
  return (
    <div className="price-calendar-days__list">
      <PriceCalendarDay
        date={new Date}
        price={120000}
        active
        isBestPrice
      />
    </div>
  )
}

export default PriceCalendarDaysList
