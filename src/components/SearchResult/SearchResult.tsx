import "./ticket-list.scss"

import { getCalendarAirWeek } from "api/actions/calendar"
import { postTicketsAir } from "api/actions/tickets"
import Icon from "components/common/Icon"
import { useParametricSearchData, useSearchParamsEvaluation } from "components/SearchForm/SearchForm.utils"
import SearchFormMini from "components/SearchForm/SearchFormMini"
import ErrorBoundary from "components/services/ErrorBoudary"
import { RouteType } from "interfaces/Search"
import { createContext, ReactNode, Suspense, useState } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { SearchDetails, SearchTravelClass } from "redux/reducers/search"
import { classWithModifiers, interpolate } from "utils"

import SearchForm from "../SearchForm/SearchForm"
import SearchResultAirContainer from "./SearchResultContainers/SearchResultAirContainer/SearchResultAirContainer"
import SearchResultTicketError from "./SearchResultError"
import { SearchFiltersType } from "./SearchResultFilters/SearchFilters"
import SearchResultLoader from "./SearchResultLoader"

export const searchSessionContext = createContext<{ session: string; filters: SearchFiltersType }>({ session: "", filters: {} })
export const searchWeekPricesContext = createContext<({
  date: string
  price: number
} | undefined)[]>([])

function SearchResult() {
  const location = useLocation()
  return (
    <>
      <section className="main-form main-form--small">
        {/* <SearchForm /> */}
        <SearchResultForm />
      </section>
      <ErrorBoundary fallback={<SearchResultTicketError />} deps={[location]}>
        <Suspense fallback={<SearchResultLoader />}>
          <SearchResultContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
// 1. Validate search data
function SearchResultContainer() {
  useSearchParamsEvaluation()
  const searchData = useParametricSearchData()
  if (!searchData.transport || !["air", "bus", "train"].includes(searchData.transport)) {
    throw new Error("useParametricSearchDataError: wrong `transport`")
  }
  if (searchData.routes.length === 0) {
    throw new Error("useParametricSearchDataError: no `routes` param")
  }

  const routes = searchData.routes.flatMap(route => route.returnDate ? [{ ...route, returnDate: undefined }, { origin: route.destination, destination: route.origin, date: route.returnDate, returnDate: undefined }] : route)

  return (
    <SearchSessionProviderSuspense {...searchData} routes={routes}>
      <SearchWeekPricesProviderSuspense {...searchData}>
        <SearchTicketsMeta />
        <SearchTicketsContainer transport={searchData.transport} />
      </SearchWeekPricesProviderSuspense>
    </SearchSessionProviderSuspense>
  )
}


interface SearchResultProviderProps {
  routes: RouteType[]
  travelClass?: SearchDetails["travelClass"]
  passengers?: Partial<SearchDetails["passengers"]>

  children: ReactNode
}
// 2. Create session
function SearchSessionProviderSuspense(props: SearchResultProviderProps) {
  const { payload } = useSuspenseQuery(postTicketsAir(props.routes, props.travelClass || 1, props.passengers))
  if (!payload) throw new Error("no payload")

  return (
    <searchSessionContext.Provider value={{ ...payload, filters: {} }}>
      {props.children}
    </searchSessionContext.Provider>
  )
}

// 3. Get price calendar for current week
function SearchWeekPricesProviderSuspense(props: SearchResultProviderProps) {
  const route = props.routes[0]
  const [year, month, day] = route.date.split("-")

  const { payload } = useSuspenseQuery(getCalendarAirWeek(route.origin, route.destination, year, month, day))
  if (!payload) throw new Error("no payload")

  return (
    <searchWeekPricesContext.Provider value={payload}>
      {props.children}
    </searchWeekPricesContext.Provider>
  )
}

// 4. Determine what type transport is used and get relevant tickets
interface SearchTicketsContainerProps {
  transport: SearchDetails["transport"] | (string & {})
}
function SearchTicketsContainer(props: SearchTicketsContainerProps) {
  switch (props.transport) {
    case "air":
      return <SearchResultAirContainer />

    default:
      return (
        <div className="ticket-list__error">
          <h2 className="ticket-list__title">Поиск билетов на {({ train: "поезда", bus: "автобусы" } as never)[props.transport]} ещё в разработке</h2>
          <p className="ticket-list__error-head">Мы работает над этим</p>
        </div>
      )
  }
}

function SearchTicketsMeta() {
  const search = useSelector(state => state.search)
  if (search.routes[0].origin === null || search.routes[0].destination === null) {
    throw new Error("SearchTicketsMetaError: Empty route")
  }

  const title = `Авиабилеты из {origin} в {destination}. Цены на прямые рейсы {travelClass} класса`
  const desc = `Дешевые авиабилеты из {origin} ({originCode}) в {destination} ({destinationCode}) на merlines.ru. Лучшие цены на прямые рейсы {travelClass} класса {isChildren}`
  return (
    <Helmet>
      <title>
        {interpolate(title, {
          origin: search.routes[0].origin.title,
          destination: search.routes[0].destination.title,
          travelClass: SearchTravelClass[search.travelClass]
        })}
      </title>
      <meta
        name="description"
        content={interpolate(desc, {
          origin: search.routes[0].origin.title,
          originCode: search.routes[0].origin.code || "CDE",
          destination: search.routes[0].destination.title,
          destinationCode: search.routes[0].destination.code || "CDE",
          travelClass: SearchTravelClass[search.travelClass],
          isChildren: search.passengers?.children || search.passengers?.infants ? "с детьми" : ""
        })}
      />
    </Helmet>
  )
}

function SearchResultForm() {
  const [isMiniMode, setIsExpanded] = useState(true)
  return (
    <>
      <div className={classWithModifiers("form-mini__form", isMiniMode && "mini-mode")}>
        <SearchForm />
        <div className="form-close">
          <button
            onClick={() => setIsExpanded(!isMiniMode)}
            className="form-close__btn"
            type="button"
          >
            <Icon name="chevron" className="form-close__icon" />
          </button>
        </div>
      </div>
      <div className={classWithModifiers("form-mini__mini", isMiniMode && "mini-mode")}>
        <SearchFormMini openForm={() => setIsExpanded(!isMiniMode)} />
      </div>
    </>
  )
}

export default SearchResult
