import "./ticket-list.scss"

import { postTicketsAir } from "api/actions/tickets"
import { useParametricSearchData, useSearchParamsEvaluation } from "components/SearchForm/SearchForm.utils"
import ErrorBoundary from "components/services/ErrorBoudary"
import { RouteType } from "interfaces/Search"
import { createContext, ReactNode, Suspense } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { SearchDetails, SearchTravelClass } from "redux/reducers/search"
import { interpolate } from "utils"

import SearchForm from "../SearchForm/SearchForm"
import SearchResultAirContainer from "./SearchResultContainers/SearchResultAirContainer/SearchResultAirContainer"
import SearchResultTicketError from "./SearchResultError"
import SearchResultLoader from "./SearchResultLoader"

export const searchSessionContext = createContext({ session: "" })

function SearchResult() {
  const location = useLocation()
  return (
    <>
      <section className="main-form main-form--small">
        <SearchForm />
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
  if (!searchData.transport || !["plane", "bus", "train"].includes(searchData.transport)) {
    throw new Error("useParametricSearchDataError: wrong `transport`")
  }
  if (searchData.routes.length === 0) {
    throw new Error("useParametricSearchDataError: no `routes` param")
  }
  return (
    <SearchSessionProviderSuspense {...searchData}>
      <SearchTicketsMeta />
      <SearchTicketsContainer transport={searchData.transport} />
    </SearchSessionProviderSuspense>
  )
}


interface SearchResultSessionProviderProps {
  routes: RouteType[]
  travelClass?: SearchDetails["travelClass"]
  passengers?: Partial<SearchDetails["passengers"]>

  children: ReactNode
}
// 2. Create session
function SearchSessionProviderSuspense(props: SearchResultSessionProviderProps) {
  const { error, payload } = useSuspenseQuery(postTicketsAir(props.routes, props.travelClass || 1, props.passengers))
  if (error || !payload) throw new Error()
  return (
    <searchSessionContext.Provider value={{ session: payload.session }}>
      {props.children}
    </searchSessionContext.Provider>
  )
}

// 3. Determine what type transport is used and get relevant tickets
interface SearchTicketsContainerProps {
  transport: SearchDetails["transport"] | (string & {})
}
function SearchTicketsContainer(props: SearchTicketsContainerProps) {
  switch (props.transport) {
    case "plane":
      return <SearchResultAirContainer />

    default:
      throw new Error("SearchTicketsContainerError: unknown transport")
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

// function SearchResultA() {
//   const [isSearchFormOpen, setIsSearchFormOpen] = useState(true)
//   return (
//     <>
//       <section className="ticket-list">
//         <div className="ticket-list-form__container">
//           {isSearchFormOpen ? (
//             <>
//               <SearchForm />
//               <div className="form-close">
//                 <button
//                   onClick={() => setIsSearchFormOpen(!isSearchFormOpen)}
//                   className="form-close__btn"
//                   type="button"
//                 >
//                   <Icon name="chevron" className="form-close__icon" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <SearchFormMini
//               openForm={() => setIsSearchFormOpen(!isSearchFormOpen)}
//             />
//           )}
//         </div>
//       </section>
//       <SearchForm />
//       <div className="form-close">
//         <button
//           onClick={() => setIsSearchFormOpen(!isSearchFormOpen)}
//           className="form-close__btn"
//           type="button"
//         >
//           <Icon name="chevron" className="form-close__icon" />
//         </button>
//       </div>
//       <SearchFormMini openForm={() => setIsSearchFormOpen(!isSearchFormOpen)} />
//     </>
//   )
// }

export default SearchResult
