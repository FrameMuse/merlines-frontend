import {currencyType, DataURLBase64, languageType} from "interfaces/common"
import Localization from "plugins/localization/controller"
import { Dispatch, SetStateAction, useState } from "react"

export const numberToLetter = (n: number): string => {
  switch (n){
    case 1:
      return "Первая"
    case 2:
      return "Вторая"
    case 3:
      return "Третья"
    case 4:
      return "Четвертая"
    case 5:
      return "Пятая"
    default:
      return ""
  }
}

export const dateToMonthName = (date: string | number | Date) => new Date(date).toLocaleString(Localization.getLang(), { month: "long" })

export const capitalize = (str?: string | null): string => {
  if (!str?.length) return ""
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * Склонение окончаний существительных после числа
 * @param {number} number — число перед существительным
 * @param {array} words — массив с вариантами слов в зависимости от числа
 * @return {string} — выбранное слово в зависимости от числа
 */
export const pluralize = (number: number, words: string[]) => {
  number = Math.abs(number) % 100
  const number2 = number % 10
  if (number > 10 && number < 20) return words[2]
  if (number2 > 1 && number2 < 5) return words[1]
  if (number2 === 1) return words[0]
  return words[2]
}

/**
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
export const getDefaultSelectedLanguage = (): languageType => {
  return localStorage.getItem("language") as languageType || "ru"
}

export const getDefaultSelectedCurrency = () : currencyType => {
  return localStorage.getItem("currency") as currencyType || "rub"
}
