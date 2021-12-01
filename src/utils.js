import axios from "axios"
import { DateTime, Interval } from "luxon"
import { monthNamesDate, weekDays } from "./constants"

const getRandomInteger = (min = 0, max = 1) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

const getTwoRandomElements = (arr) => {
  if (arr.length > 1) {
    const firstEl = getRandomElement(arr)
    const secondEl = getRandomElement(arr.filter((item) => item !== firstEl))
    return [firstEl, secondEl]
  }
  return arr
}

const getBetterPrice = (data, transport) => {
  let numArr = []
  if (transport === "bus") {
    data.forEach((item) => item.price && numArr.push(item.price / 100))
  } else {
    data.forEach((item) => item.price && numArr.push(item.price))
  }
  return Math.min(...numArr)
}

const convertIdToRoute = (id) => `/blog/article/${id}`

const dateToMonthName = (date) =>
  new Date(date).toLocaleString("ru", { month: "long" })

const getDaysInterval = (date, calendar) => {
  const currentMonth = DateTime.isDateTime(date) ? date : DateTime.fromISO(date)
  const isSameMonth =
    DateTime.local(currentMonth.year, currentMonth.month + 1).endOf("week")
      .day === 7

  if (!calendar) {
    return {
      start_date: DateTime.local(currentMonth.year, currentMonth.month)
        .startOf("week")
        .toISODate(),
      end_date: isSameMonth
        ? DateTime.local(currentMonth.year, currentMonth.month)
            .endOf("month")
            .toISODate()
        : DateTime.local(
            currentMonth.month === 12
              ? currentMonth.year + 1
              : currentMonth.year,
            currentMonth.month === 12 ? 1 : currentMonth.month + 1
          )
            .endOf("week")
            .toISODate()
    }
  } else {
    return {
      start_date: DateTime.local(currentMonth.year, currentMonth.month).startOf(
        "week"
      ),
      end_date: isSameMonth
        ? DateTime.local(currentMonth.year, currentMonth.month).endOf("month")
        : DateTime.local(
            currentMonth.month === 12
              ? currentMonth.year + 1
              : currentMonth.year,
            currentMonth.month === 12 ? 1 : currentMonth.month + 1
          ).endOf("week")
    }
  }
}

const firstToUpperCase = (str) => {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}

const isPreviousDay = (date) => {
  if (date) {
    const isCurrentDay =
      date.toISO().slice(0, 10) === DateTime.now().toISO().slice(0, 10) ||
      (date.month === DateTime.now().month && date.day > DateTime.now().day) ||
      date.month > DateTime.now().month ||
      date.year > DateTime.now().year

    return !isCurrentDay
  }
}

const formatDateToDayWeek = (date = DateTime.now()) => {
  return `${date.day} ${monthNamesDate[date.month]}, ${firstToUpperCase(
    date.reconfigure({ locale: "ru-RU" }).weekdayShort
  )}`
}

const addNoPriceMonths = (arr) => {
  let newArr = [...arr]
  for (let i = arr.length - 1; i < 11; i++) {
    let lastElementDate = DateTime.fromISO(newArr[i].date)
    newArr.push({
      date: lastElementDate.plus({ months: 1 }).toISO().slice(0, 7),
      price: null,
      currency: "RUB"
    })
  }
  return newArr
}

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0)

const setAxiosAuthToken = (token) => {
  if (typeof token !== "undefined" && token) {
    // Apply for every request
    axios.defaults.headers.common["Authorization"] = "Token " + token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"]
  }
}

const simpleOnError = (error) => {
  if (error.response) {
    console.error(JSON.stringify(error.response.data))
  } else if (error.message) {
    console.error(JSON.stringify(error.message))
  } else {
    console.error(JSON.stringify(error))
  }
}

/**
 * Склонение окончаний существительных после числа
 * @param {number} number — число перед существительным
 * @param {array} words — массив с вариантами слов в зависимости от числа
 * @return {string} — выбранное слово в зависимости от числа
 */
const pluralize = (number, words) => {
  number = Math.abs(number) % 100
  const number2 = number % 10
  if (number > 10 && number < 20) return words[2]
  if (number2 > 1 && number2 < 5) return words[1]
  if (number2 === 1) return words[0]
  return words[2]
}

const takeErrors = (errors) => {
  let errorsArr = []
  for (let key in errors) {
    if (key !== "username") {
      if (key === "non_field_errors") {
        errors[key].map((value) => errorsArr.push(`${value}`))
      } else {
        errors[key].map((value) => errorsArr.push(`${key}: ${value}`))
      }
    }
  }
  return errorsArr
}

const fromISOtoString = (isoDate) => {
  const date = DateTime.fromISO(isoDate)
  return `${date.day} ${monthNamesDate[date.month]} ${date.year}`
}

const toTranslateBaggageCode = (code) => {
  const getCountPlaces = (valueStr) => valueStr.slice(0, 1).match(/\d+/)
  const getCountWeight = (valueStr) => valueStr.slice(-2).match(/\d+/)
  if (code) {
    return {
      place: getCountPlaces(code),
      weight: getCountWeight(code)
    }
  } else if (code === "") {
    return ""
  } else if (code === "0PC") {
    return false
  } else {
    return false
  }
}

const daysFromInterval = (date) => {
  const days = getDaysInterval(date, "calendar")
  const daysInterval = Interval.fromDateTimes(
    days.start_date.startOf("day"),
    days.end_date.endOf("day")
  )
  return daysInterval.splitBy({ days: 1 }).map((day) => day.start.toISODate())
}

const translateTripClassFromCodeToName = (code) => {
  switch (code) {
    case "Y":
      return "Эконом"
    case "C":
      return "Бизнес"
    default:
      return code
  }
}

const dateMountWeekday = (isoDate) => {
  const date = DateTime.fromISO(isoDate)
  return `${date.day} ${monthNamesDate[date.month]}, ${
    weekDays[date.weekday - 1]
  }`
}

const getSimpleTimeFromISO = (isoDate) => {
  const date = DateTime.fromISO(isoDate)
  return `${date.toLocaleString(DateTime.TIME_SIMPLE)}`
}

const separateThousand = (value) => {
  value = value.toString()
  const before = value.slice(-3, value.length)
  const after = value.slice(0, -3)
  return `${after} ${before}`
}

/**
 * Creates class with modifiers
 *
 * Join modifiers with className and returns one
 * @param { string } className - origin class
 * @param { Array<string | number | false | null | undefined> | undefined } modifiers - class modifiers
 */
export function classWithModifiers(className, ...modifiers) {
  if (!modifiers || !modifiers.length) {
    return className
  }

  modifiers = modifiers.filter((modifier) => modifier) // Map modified classes

  if (!modifiers.length) {
    return className
  }

  const space = " "
  const separator = "--"

  modifiers = modifiers.map((modifier) => className + separator + modifier) // Map modified classes

  return className + space + modifiers.join(space) // Join all together
}

/**
 *
 * @param { Record<string, string | number> } QueryObject
 * @returns string
 */
export function createQuery(QueryObject) {
  if (!QueryObject) {
    throw new Error("QueryObject is empty")
  }

  const QueryKeys = Object.keys(QueryObject)
  const QueryArray = QueryKeys.map(function (key) {
    const value = QueryObject[key]
    if (value) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(value)
    }
    return ""
  })

  return QueryArray.filter((query) => query).join("&")
}

export {
  getRandomInteger,
  getRandomElement,
  getTwoRandomElements,
  getBetterPrice,
  convertIdToRoute,
  dateToMonthName,
  getDaysInterval,
  firstToUpperCase,
  isPreviousDay,
  addNoPriceMonths,
  isEmpty,
  setAxiosAuthToken,
  simpleOnError,
  pluralize,
  takeErrors,
  fromISOtoString,
  toTranslateBaggageCode,
  translateTripClassFromCodeToName,
  dateMountWeekday,
  daysFromInterval,
  formatDateToDayWeek,
  getSimpleTimeFromISO,
  separateThousand
}
