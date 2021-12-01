function DropDownCalendarWeekDay({ day }) {
  return (
    <div className="drop-down-calendar__day-name">
      <span>{day}</span>
      <span className="visually-hidden">Понедельник</span>
    </div>
  )
};

export default DropDownCalendarWeekDay;
