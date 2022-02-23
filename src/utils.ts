import axios from "axios"
import { DataURLBase64 } from "interfaces/common"
import { DateTime } from "luxon"
import Localization from "plugins/localization/controller"
import { Dispatch, SetStateAction, useState } from "react"

import { monthNamesDate, weekDays } from "./constants"

const getRandomInteger = (min = 0, max = 1) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

const getRandomElement = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)]

const getTwoRandomElements = (arr: any[]) => {
  if (arr.length > 1) {
    const firstEl = getRandomElement(arr)
    const secondEl = getRandomElement(arr.filter((item: any) => item !== firstEl))
    return [firstEl, secondEl]
  }
  return arr
}

const getBetterPrice = (data: any[], transport: string) => {
  const numArr: number[] = []
  if (transport === "bus") {
    data.forEach((item: { price: number }) => item.price && numArr.push(item.price / 100))
  } else {
    data.forEach((item: { price: any }) => item.price && numArr.push(item.price))
  }
  return Math.min(...numArr)
}

const convertIdToRoute = (id: any) => `/blog/article/${id}`

export const dateToMonthName = (date: string | number | Date) => new Date(date).toLocaleString(Localization.getLang(), { month: "long" })

const getDaysInterval = (date: any, calendar: string | undefined) => {
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

export const capitalize = (str?: string | null): string => {
  if (!str?.length) return ""
  return str[0].toUpperCase() + str.slice(1)
}

const formatDateToDayWeek = (date = DateTime.now()) => {
  return `${date.day} ${monthNamesDate[date.month]}, ${capitalize(
    date.reconfigure({ locale: "ru-RU" }).weekdayShort
  )}`
}

const addNoPriceMonths = (arr: string | any[]) => {
  const newArr = [...arr]
  for (let i = arr.length - 1; i < 11; i++) {
    const lastElementDate = DateTime.fromISO(newArr[i].date)
    newArr.push({
      date: lastElementDate.plus({ months: 1 }).toISO().slice(0, 7),
      price: null,
      currency: "RUB"
    })
  }
  return newArr
}

const isEmpty = (value: { trim?: any } | null | undefined) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0)

const setAxiosAuthToken = (token: string) => {
  if (typeof token !== "undefined" && token) {
    // Apply for every request
    axios.defaults.headers.common["Authorization"] = "Token " + token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"]
  }
}

const simpleOnError = (error: { response: { data: any }; message: any }) => {
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
const pluralize = (number: number, words: string[]) => {
  number = Math.abs(number) % 100
  const number2 = number % 10
  if (number > 10 && number < 20) return words[2]
  if (number2 > 1 && number2 < 5) return words[1]
  if (number2 === 1) return words[0]
  return words[2]
}

const takeErrors = (errors: { [x: string]: any[] }) => {
  const errorsArr: string[] = []
  for (const key in errors) {
    if (key !== "username") {
      if (key === "non_field_errors") {
        errors[key].map((value: any) => errorsArr.push(`${value}`))
      } else {
        errors[key].map((value: any) => errorsArr.push(`${key}: ${value}`))
      }
    }
  }
  return errorsArr
}

const fromISOtoString = (isoDate: any) => {
  const date = DateTime.fromISO(isoDate)
  return `${date.day} ${monthNamesDate[date.month]} ${date.year}`
}

const toTranslateBaggageCode = (code: string) => {
  const getCountPlaces = (valueStr: string) => valueStr.slice(0, 1).match(/\d+/)
  const getCountWeight = (valueStr: string) => valueStr.slice(-2).match(/\d+/)
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

const translateTripClassFromCodeToName = (code: any) => {
  switch (code) {
    case "Y":
      return "Эконом"
    case "C":
      return "Бизнес"
    default:
      return code
  }
}

const dateMountWeekday = (isoDate: any) => {
  const date = DateTime.fromISO(isoDate)
  return `${date.day} ${monthNamesDate[date.month]}, ${weekDays[date.weekday - 1]}`
}

const getSimpleTimeFromISO = (isoDate: any) => {
  const date = DateTime.fromISO(isoDate)
  return `${date.toLocaleString(DateTime.TIME_SIMPLE)}`
}

const separateThousand = (value: string | number | any[]) => {
  value = value.toString()
  const before = value.slice(-3, value.length)
  const after = value.slice(0, -3)
  return `${after} ${before}`
}

/**
 * @param { Array<string | null | undefined> } classNames
 * @returns `class1 class2`
 */
export function classMerge(...classNames: (string | undefined)[]) {
  const space = " "
  return classNames.filter(Boolean).join(space)
}

/**
 * Creates class with modifiers
 *
 * Join modifiers with className and returns one
 * @param { string } className - origin class
 * @param { Array<string | number | false | null | undefined> | undefined } modifiers - class modifiers
 */
export function classWithModifiers(className: string, ...modifiers: (string | boolean | undefined)[]) {
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
 * @param { Record<string, unknown> } QueryObject
 * @returns string
 */
export function createQuery(QueryObject?: Record<string, any> | null) {
  if (QueryObject == null) return ""

  const QueryKeys = Object.keys(QueryObject)
  const QueryArray = QueryKeys.map(function (key) {
    const value = QueryObject[key]
    if (value === true) {
      return encodeURIComponent(key)
    }

    if (value) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(value)
    }

    return ""
  })

  return QueryArray.filter((query) => query).join("&")
}

export function toBase64(file: File): Promise<DataURLBase64> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as DataURLBase64)
    reader.onerror = reject
  })
}


export async function getFileFromURL(url: string) {
  const fileName = url.slice(url.lastIndexOf("/") + 1)

  const response = await fetch(url)
  const Uint8Array = (await response.body?.getReader()?.read())?.value

  return new File(Uint8Array ? [Uint8Array] : [], fileName, { type: response.headers.get("content-type") || "image" })
}

/**
 *
 * Awaits given function
 * @returns [pending, callback, setPending]
 */
export function usePending<F extends (...args: any[]) => any>(fn: F | undefined | null): [boolean, F, Dispatch<SetStateAction<boolean>>] {
  const [pending, setPending] = useState(false)
  async function callback(...args: any) {
    setPending(true)
    const result = await fn?.(...args)
    setPending(false)
    return result
  }
  return [pending, callback as F, setPending]
}


/**
 *
 * @param {File} file
 * @returns
 */
export const isImageFile = (file: File) => file.type.includes("image")




type IfNever<T, S> = [T] extends [never] ? S : T
export function getFormElements<E extends HTMLFormControlsCollection, K extends IfNever<Exclude<keyof E, keyof HTMLFormControlsCollection>, string>>(elements: E, ...keys: K[]): Record<K, string> {
  // Set default values
  const data = Object.fromEntries(keys.map(key => [key, ""])) as Record<K, string>

  for (const element of elements) {
    if (!(element instanceof HTMLInputElement)) continue
    if (!keys.includes(element.name as K)) continue
    if (!element.value.length) continue

    data[element.name as K] = element.value
  }

  return data
}


declare global {
  interface Number {
    toPrice(this: number, locale?: string, currency?: string): string
  }
}

Number.prototype.toPrice = function (this: number, locale = "EN", currency = "USD"): string {
  try {
    return this.toLocaleString(locale, { style: "currency", maximumFractionDigits: 0, currency })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("tag") || error.message.includes("locale")) {
        return "Invalid language tag"
      }

      return "Invalid currency code"
    }

    throw error
  }
}



/**
 * filter predicate
 *
 * if some of elements are equal
 */
export function someEqual<T>(key: keyof T) {
  return (value: T, _index: number, array: T[]): boolean => {
    return array.some(someValue => someValue[key] === value[key])
  }
}



// export function inter<V = unknown>(value: V, vars: Record<string, string | number>) {
//   if (!value) throw new TypeError("interError: empty value gotten")
//   const varKeys = Object.keys(vars)
//   if (value instanceof Array) {
//     return value.flatMap(a => a).map(interpolate)
//   }
//   return interpolate(value)
// }


type ExtractInterpolations<T extends string> = T extends `${infer _Start}{${infer V}}${infer Rest}` ? V | ExtractInterpolations<Rest> : never

/**
 * Interpolates {variable} in string
 */
export function interpolate<T extends string>(value: T, vars: Record<ExtractInterpolations<T>, string | number>): string {
  const varKeys = Object.keys(vars) as ExtractInterpolations<T>[]
  return varKeys.reduce((result: string, next) => result.replace(new RegExp(`{${next}}`, "g"), String(vars[next])), value)
}

export {
  getRandomInteger,
  getRandomElement,
  getTwoRandomElements,
  getBetterPrice,
  convertIdToRoute,
  getDaysInterval,
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
  formatDateToDayWeek,
  getSimpleTimeFromISO,
  separateThousand
}
