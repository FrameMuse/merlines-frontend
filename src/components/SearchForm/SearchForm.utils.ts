import { getGeoAirCity } from "api/actions/geo"
import ClientAPI from "api/client"
import _ from "lodash"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { SearchDetails, updateSearch, updateSearchRoute, updateSearchTransport, updateSearchTravelClass } from "redux/reducers/search"

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
    if (!route.origin || !route.destination || !route.date) {
      throw new TypeError("StringifyRoutesError: Lack of data in a route")
    }

    return {
      ...route,
      origin: route.origin.id,
      destination: route.destination.id,
      date: stringifyDate(route.date)
    }
  })
  return routes.map(route => {
    if (route.returnDate && routes.length === 1) {
      return `${route.origin}<>${route.destination}^${route.date}~${stringifyDate(route.returnDate)}`
    }
    return `${route.origin}>${route.destination}^${route.date}`
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
  const [adults, children, infants] = (stringPassengers.split(":")).map(Number) as (number | undefined)[]
  return { adults, children, infants }
}

function parseSearchTravelClass(stringTravelClass?: string): number | undefined {
  if (stringTravelClass == null) return stringTravelClass
  const travelClass = stringTravelClass.replace("C", "")
  return +travelClass
}

export function useParametricSearchData(): ParametricSearchData {
  const params = useParams<Record<"transport" | "routes" | "passengers" | "travelClass", string | undefined>>()

  const transport = params.transport || null
  const routes = parseSearchRoutes(params.routes)
  const passengers = parseSearchPassengers(params.passengers)
  const travelClass = parseSearchTravelClass(params.travelClass)

  return { transport, routes, travelClass, passengers }
}

export function useSearchParamsEvaluation() {
  const dispatch = useDispatch()
  const searchData = useParametricSearchData()
  const searchRoutes = useSelector(state => state.search.routes)
  useEffect(() => {
    if (searchData.travelClass) {
      dispatch(updateSearchTravelClass(searchData.travelClass))
    }
    if (searchData.transport && ["air", "bus", "train"].includes(searchData.transport)) {
      dispatch(updateSearchTransport(searchData.transport as SearchDetails["transport"]))
    }
    dispatch(updateSearch({
      hasReturnDate: !!searchData.routes[0].returnDate && searchData.routes.length === 0,
      passengers: {
        adults: searchData.passengers?.adults || 1,
        children: searchData.passengers?.children || 0,
        infants: searchData.passengers?.infants || 0
      }
    }))

    async function updateRoutes() {
      dispatch(updateSearch({ hasReturnDate: searchData.routes[0].returnDate !== null }))
      await searchData.routes.forEach(async (route, index) => {
        dispatch(updateSearchRoute(index, {
          origin: {
            id: route.origin,
            title: ""
          },
          destination: {
            id: route.destination,
            title: ""
          },
          date: route.date ? new Date(route.date) : null,
          returnDate: route.returnDate ? new Date(route.returnDate) : null
        }))

        if (searchRoutes[index].origin?.title.length === 0) {
          const { error, payload } = await ClientAPI.query(getGeoAirCity(route.origin))
          if (!error && payload) {
            dispatch(updateSearchRoute(index, { origin: payload }))
          }
        }

        if (searchRoutes[index].destination?.title.length === 0) {
          const { error, payload } = await ClientAPI.query(getGeoAirCity(route.destination))
          // console.log(payload)
          if (!error && payload) {
            dispatch(updateSearchRoute(index, { destination: payload }))
          }
        }
      })

    }

    updateRoutes()
  }, [searchData])
}

export interface ParametricSearchData {
  transport: string | null
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

