import { nanoid } from "nanoid"

import { getRandomInteger, separateThousand } from "../utils"

const MONTH_COUNT = 12
const MIN_PRICE = 25000
const MAX_PRICE = 150000
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
]
const CITIES = [
  "Москва",
  "Париж",
  "Амстердам",
  "Барселона",
  "Милан",
  "Лондон",
  "Берлин",
  "Прага"
]
const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

const makeDay = (num) => {
  return {
    id: nanoid(10),
    month: MONTHS[num],
    price: getRandomInteger(MIN_PRICE, MAX_PRICE)
  }
}

const makeMonthCalendar = (currentYear, transport, pickTransport) => {
  let months = []

  for (let i = 0; i < MONTH_COUNT; i++) {
    months.push(makeDay(i))
  }

  return {
    currentYear: currentYear,
    transport: transport,
    months: months,
    isPicked: pickTransport
  }
}

const makeCityRoute = () => {
  return {
    from: CITIES[getRandomInteger(0, 3)],
    to: CITIES[getRandomInteger(4, 8)]
  }
}

const numToArray = (nums, numsStart) => {
  let arr = []
  for (let i = numsStart ? numsStart : 1; i <= nums; i++) {
    arr.push({
      number: i,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE)
    })
  }
  return arr
}

const pickedMonthInfo = (month, anotherMonth) => {
  const currentYear = new Date().getFullYear()
  const monthNumber = MONTHS.indexOf(month) + 1
  const days = anotherMonth
    ? new Date(anotherMonth.year, anotherMonth.monthNumber, 0).getDate()
    : new Date(currentYear, monthNumber, 0).getDate()

  // TODO: проверить логику
  // т.к. с 1 до 6 понедельник-суббота, а 0 - воскресенье, добавляется проверка на 0, чтобы вернуть 7
  const weekDayStart = anotherMonth
    ? new Date(anotherMonth.year, anotherMonth.monthNumber - 1, 1).getDay() ===
      0
      ? 7
      : new Date(anotherMonth.year, anotherMonth.monthNumber - 1, 1).getDay()
    : new Date(currentYear, monthNumber - 1, 1).getDay() === 0
    ? 7
    : new Date(currentYear, monthNumber - 1, 1).getDay()

  return {
    year: anotherMonth ? anotherMonth.year : currentYear,
    month: anotherMonth ? MONTHS[anotherMonth.monthNumber - 1] : month,
    monthNum: anotherMonth ? anotherMonth.monthNumber : monthNumber,
    days: days,
    daysArr: numToArray(days),
    weekDayStart: weekDayStart
  }
}

const lastMonthInfo = (pickedMonth) => {
  const lastMonthNumber =
    pickedMonth.getMonth() === 0 ? 11 : pickedMonth.getMonth() - 1
  const lastMonthYear =
    lastMonthNumber === 11
      ? pickedMonth.getFullYear() - 1
      : pickedMonth.getFullYear()
  const lastMonthDays = new Date(
    lastMonthYear,
    lastMonthNumber + 1,
    0
  ).getDate()
  const pickedMonthWeekDayStart =
    new Date(pickedMonth.getFullYear(), pickedMonth.getMonth(), 1).getDay() ===
    0
      ? 7
      : new Date(pickedMonth.getFullYear(), pickedMonth.getMonth(), 1).getDay()
  const lastMonthStart =
    lastMonthDays - (pickedMonthWeekDayStart - 2) >= lastMonthDays
      ? 0
      : lastMonthDays - (pickedMonthWeekDayStart - 2)

  const FROM = lastMonthStart
    ? new Date(lastMonthYear, lastMonthNumber, lastMonthStart + 1)
        .toISOString()
        .slice(0, 10)
    : 0
  const TO = lastMonthStart
    ? new Date(lastMonthYear, lastMonthNumber, lastMonthDays + 1)
        .toISOString()
        .slice(0, 10)
    : 0

  // console.log(`from ${lastMonthStart} to ${lastMonthStart ? lastMonthDays : 0}`);
  // console.log('from', FROM);
  // console.log('to', TO);

  return {
    from: FROM,
    to: TO
  }
}

// const lastMonthInfo = pickedMonth => {
//   const lastMonthNumber = ((pickedMonth.monthNum - 1) === 0) ? 12 : pickedMonth.monthNum - 1;
//   const year = lastMonthNumber === 12 ? pickedMonth.year - 1 : pickedMonth.year;
//   const lastMonthDays = new Date(year, lastMonthNumber, 0).getDate();
//   const lastMonthStart = lastMonthDays - (pickedMonth.weekDayStart - 2);
//   const lastMonthRemainingDays = numToArray(lastMonthDays, lastMonthStart);

//   return {
//     year: year,
//     monthNumber: lastMonthNumber,
//     days: lastMonthRemainingDays,
//   };
// };

const nextMonthInfo = (totalDays, pickedMonth) => {
  const nextDays = (days) => {
    if (days === 28) {
      return 0
    } else if (days > 28 && days <= 35) {
      return 35 - days
    } else if (days > 35) {
      return 42 - days
    }
  }

  const nextMonth =
    pickedMonth.monthNum + 1 === 13 ? 1 : pickedMonth.monthNum + 1
  const year = nextMonth === 1 ? pickedMonth.year + 1 : pickedMonth.year
  const nextMonthEnd = nextDays(totalDays)
  const nextMonthStart = numToArray(nextMonthEnd)

  return {
    year: year,
    monthNumber: nextMonth,
    days: nextMonthStart
  }
}

const makeWeek = () => {
  let weekArr = []
  let num = 20

  WEEK_DAYS.forEach((day) => {
    weekArr.push({
      date: `${num++} Января, ${day}`,
      price: `от ${separateThousand(getRandomInteger(MIN_PRICE, MAX_PRICE))} ₽`
    })
  })

  return weekArr
}

export {
  makeMonthCalendar,
  makeCityRoute,
  pickedMonthInfo,
  lastMonthInfo,
  nextMonthInfo,
  makeWeek
}
