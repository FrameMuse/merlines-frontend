import _ from "lodash"
import { useParams } from "react-router-dom"
import { SearchDetails } from "redux/reducers/search"

import { declinedMonthNames } from "../../constants"

export function textualizeDate(date?: Date | null) {
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

export function stringifyPassengers({ adults, children, babies }: SearchDetails["passengers"]) {
  if (adults === 1 && (children + babies) === 0) {
    return ""
  }
  if (adults > 1 && (children + babies) === 0) {
    return `${adults}`
  }
  if (adults > 1 && children > 0 && babies === 0) {
    return `${adults}:${children}`
  }

  return `${adults}:${children}:${babies}`
}

export function stringifyTravelClass(travelClass: SearchDetails["travelClass"]) {
  return travelClass === 1 ? "" : travelClass
}

export function useParametricSearchData() {
  const params = useParams<Record<"routes" | "passengers" | "travelClass", string | undefined>>()
  if (!params.routes) {
    throw new Error("ParseSearchDataError: no routes given")
  }

  // ---ROUTES---

  const routes = []
  const regex = /(\w+)<?>(\w+)\^(\d+)(?:~(\d+))?/g
  let matches

  while ((matches = regex.exec(params.routes)) !== null) {
    const [, origin, destination, date, returnDate] = matches as RegExpExecArray & [string, string, string, string, string | undefined]
    routes.push({
      origin: +origin,
      destination: +destination,
      date: date.replace(/(\d{2})(\d{2})(\d{2})/g, "20$1-$2-$3"),
      returnDate: returnDate?.replace(/(\d{2})(\d{2})(\d{2})/g, "20$1-$2-$3")
    })
  }

  // ---PASSENGERS---

  const [adults, children, infants] = (params.passengers?.split(":") || []).map(Number) as (number | undefined)[]

  // --

  const travelClass = params.travelClass?.replace("C", "")

  return {
    routes,
    travelClass: travelClass ? Number(travelClass) : undefined,
    passengers: params.passengers ? { adults, children, infants } : undefined
  }
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

// export function composeLocationSearchRoutes(locationSearch: Location["search"]) {
//   const locationSearchParams = new URLSearchParams(locationSearch)
// }
