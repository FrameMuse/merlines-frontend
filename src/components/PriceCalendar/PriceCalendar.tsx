import "./PriceCalendar.scss"

import useLocalization from "../../plugins/localization/hook"
import TransportSwitcher from "../SearchResult/TransportSwitcher"
import PriceCalendarDays from "./PriceCalendarDays/PriceCalendarDays"

function PriceCalendar() {
  const ll = useLocalization(ll => ll)
  return (
    <section className="price-calendar calendar--days">
      <div className="price-calendar-container">
        <h2 className="price-calendar__title">{ll.priceCalendar.title}</h2>
        {/* <PriceCalendarSearch
          transport={priceCalendarData.air.transport}
          setPickedMonthName={setPickedMonthName}
        />
        {!mainSearchParams.one_way && <PriceCalendarVacationSlider />} */}
        <TransportSwitcher prices={[1200,12200,2220]} />
        <div className="price-calendar__list">
          {/* {priceCalendarData.bus.months.length ? (
            priceCalendarData.bus.months.map((month, index) => (
              <PriceCalendarMonth
                key={index}
                transport={priceCalendarData.bus.transport}
                monthDate={month.date}
                price={month.price / 100}
                betterPrice={priceCalendarData.bus.betterPrice}
                setPickedMonthName={setPickedMonthName}
              />
            ))
          ) : (
            <div>is loading .............</div>
          )} */}
        </div>
      </div>
      {/* <PriceCalendarDays pickedMonthName={1} setPickedMonthName={1} /> */}
    </section>
  )
}

export default PriceCalendar
