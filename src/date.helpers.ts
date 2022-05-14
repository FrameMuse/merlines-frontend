export function setDateMonth(date: Date, month: number) {
  const dateInstance = new Date(date)
  dateInstance.setUTCMonth(month)
  return dateInstance
}

export function setDateDay(date: Date, day: number) {
  const dateInstance = new Date(date)
  dateInstance.setUTCDate(day)
  return dateInstance
}

export function offsetDateMonth(date: Date, offset = 0) {
  return setDateMonth(date, date.getUTCMonth() + offset)
}

export function offsetDateDay(date: Date, offset = 0) {
  return setDateDay(date, date.getUTCDate() + offset)
}



export function getAmountOfDays(date: Date) {
  const newDate = new Date(date)

  newDate.setUTCDate(1)
  newDate.setUTCMonth(newDate.getUTCMonth() + 1)
  newDate.setUTCDate(0)

  return newDate.getUTCDate()
}

export function getFirstWeekday(date: Date) {
  const dateInstance = setDateDay(date, 1)
  const weekDay = dateInstance.getUTCDay()
  // Transform UTC week day to Russian's
  if (weekDay === 0) return 7
  if (weekDay === 1) return 0
  return weekDay
}
