import _ from "lodash"
import { useParams } from "react-router-dom"
import { SearchDetails } from "redux/reducers/search"

import { declinedMonthNames } from "../../constants"

export function humanizeDate(date?: Date | null) {
  if (date == null) return ""

  const day = date.getDate()
  const month = declinedMonthNames[date.getMonth()]
  const weekday = date.toLocaleDateString("ru", { weekday: "short" })

  return `${day} ${_.capitalize(month)}, ${_.capitalize(weekday)}`
}

export function stringifyRoutes(searchRoutes: SearchDetails["routes"]) {
  const stringifyDate = (date: Date) => date.toJSON().slice(2, 10).replace(/-/g, "")
  const routes = searchRoutes.flatMap(route => {
    if (!route.departurePoint || !route.arrivalPoint || !route.departureDate) {
      throw new TypeError("StringifyRoutesError: Lack of data in a route")
    }

    return {
      ...route,
      departurePoint: route.departurePoint.id,
      arrivalPoint: route.arrivalPoint.id,
      departureDate: stringifyDate(route.departureDate)
    }
  })
  return routes.map(route => {
    if (route.returnDate) {
      return `${route.departurePoint}<>${route.arrivalPoint}^${route.departureDate}~${stringifyDate(route.returnDate)}`
    }
    return `${route.departurePoint}>${route.arrivalPoint}^${route.departureDate}`
  }).join("|")
}

export function stringifyPassengers({ adults, children, infants }: SearchDetails["passengers"]) {
  if (adults === 1 && (children + infants) === 0) {
    return ""
  }
  if (adults > 1 && (children + infants) === 0) {
    return `${adults}`
  }
  if (adults >= 1 && children > 0 && infants === 0) {
    return `${adults}:${children}`
  }

  return `${adults}:${children}:${infants}`
}

export function stringifyTravelClass(travelClass: SearchDetails["travelClass"]) {
  return travelClass === 1 ? "" : travelClass
}

export function stringifySearchData(search: Omit<SearchDetails, "hasReturnDate">) {
  const TRANSPORT = search.transport
  const ROUTES = stringifyRoutes(search.routes)
  const PASSENGERS = stringifyPassengers(search.passengers)
  const CLASS = search.travelClass === 1 ? "" : search.travelClass

  return "/search/" + TRANSPORT + "/" + ROUTES + (PASSENGERS && ("/" + PASSENGERS)) + (CLASS && "/C" + CLASS)
}

function parseSearchRoutes(stringRoutes?: string) {
  if (stringRoutes == null) return []

  const routes = []
  const regex = /(\w+)<?>(\w+)\^(\d+)(?:~(\d+))?/g
  let matches

  while ((matches = regex.exec(stringRoutes)) !== null) {
    const [, origin, destination, date, returnDate] = matches as RegExpExecArray & [string, string, string, string, string | undefined]
    routes.push({
      origin: +origin,
      destination: +destination,
      date: date.replace(/(\d{2})(\d{2})(\d{2})/g, "20$1-$2-$3"),
      returnDate: returnDate?.replace(/(\d{2})(\d{2})(\d{2})/g, "20$1-$2-$3")
    })
  }

  return routes
}

function parseSearchPassengers(stringPassengers?: string) {
  if (stringPassengers == null) return stringPassengers
  const [adults, children, infants] = (stringPassengers.split(":") || []).map(Number) as (number | undefined)[]
  return { adults, children, infants }
}

function parseSearchTravelClass(stringTravelClass?: string): number | undefined {
  if (stringTravelClass == null) return stringTravelClass
  const travelClass = stringTravelClass.replace("C", "")
  return +travelClass
}

export function useParametricSearchData(): ParametricSearchData {
  const params = useParams<Record<"transport" | "routes" | "passengers" | "travelClass", string | undefined>>()

  const transport = params.transport
  const routes = parseSearchRoutes(params.routes)
  const passengers = parseSearchPassengers(params.passengers)
  const travelClass = parseSearchTravelClass(params.travelClass)

  if (transport == null) {
    throw new Error("useParametricSearchDataError: no `transport` param")
  }
  if (routes.length === 0) {
    throw new Error("useParametricSearchDataError: no `routes` param")
  }

  return { transport, routes, travelClass, passengers }
}

export interface ParametricSearchData {
  transport: string
  routes: {
    origin: number
    destination: number
    date: string
    returnDate?: string
  }[]
  travelClass?: number
  passengers?: Partial<SearchDetails["passengers"]>
}

// origin=MSK
// destination=SPB
// depart_date=2022-01-09
// ----------------------
// return_date=2022-01-09
// one_way=true
// passengers_adults=1
// travel_class=economy

/**
 * /search/MSK->SPB:220109|SPB->MSK:220109/2:2/economy
 * /search/MSK->SPB:220109/1:0:0/economy
 * /search/MSK<->SPB:220109~220109/1/economy
 * /search/[CITY]<->[CITY]:[DATE]~[DATE]/[ADULTS]:[CHILDREN]:[INFANTS]/[CLASS]
 */

