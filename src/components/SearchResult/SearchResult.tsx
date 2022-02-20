import "./ticket-list.scss"

import { postTicketsAir } from "api/actions/tickets"
import { useParametricSearchData } from "components/SearchForm/SearchForm.utils"
import ErrorBoundary from "components/services/ErrorBoudary"
import { RouteType } from "interfaces/Search"
import { createContext, ReactNode, Suspense } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import { Helmet } from "react-helmet"
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
  const searchData = useParametricSearchData()
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
  const searchData = useParametricSearchData()

  const title = `Авиабилеты из {origin} в {destination}. Цены на прямые рейсы {travelClass} класса`
  const desc = `Дешевые авиабилеты из {origin} ({originCode}) в {destination} ({destinationCode}) на merlines.ru. Лучшие цены на прямые рейсы {travelClass} класса {isChildren}`
  return (
    <Helmet>
      <title>
        {interpolate(title, {
          origin: searchData.routes[0].origin,
          destination: searchData.routes[0].destination,
          travelClass: Object.keys(SearchTravelClass)[Object.values(SearchTravelClass).indexOf(String(searchData.travelClass || 1))]
        })}
      </title>
      <meta
        name="description"
        content={interpolate(desc, {
          origin: searchData.routes[0].origin,
          originCode: "CDE",
          destination: searchData.routes[0].destination,
          destinationCode: "CDE",
          travelClass: Object.keys(SearchTravelClass)[Object.values(SearchTravelClass).indexOf(String(searchData.travelClass || 1))],
          isChildren: searchData.passengers?.children || searchData.passengers?.infants ? "с детьми" : ""
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
//         <div className="ticket-list__container">
//           <SearchResultTicketList />
//         </div>
//         <button className="ticket-list__open-filter">фильтры</button>
//       </section>
//       <Loader></Loader>
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
//       {/* <LoaderClose></LoaderClose> */}
//     </>
//   )
// }

export default SearchResult
