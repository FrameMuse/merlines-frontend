import "./ticket-list.scss"

import { postTicketsAir } from "api/actions/tickets"
import { useParametricSearchData } from "components/SearchForm/SearchForm.utils"
import ErrorBoundary from "components/services/ErrorBoudary"
import { RouteType } from "interfaces/Search"
import { createContext, ReactNode, Suspense } from "react"
import { useSuspenseQuery } from "react-fetching-library"

import SearchForm from "../SearchForm/SearchForm"
import SearchResultAirContainer from "./SearchResultContainers/SearchResultAirContainer/SearchResultAirContainer"
import SearchResultTicketError from "./SearchResultError"
import SearchResultLoader from "./SearchResultLoader"

// Request session
export const searchSessionContext = createContext({ session: "" })

function SearchResult() {
  return (
    <>
      <section className="main-form main-form--small">
        <SearchForm />
      </section>
      <ErrorBoundary fallback={<SearchResultTicketError />} deps={[location]}>
        <SearchResultContainer />
      </ErrorBoundary>
    </>
  )
}
// 1. Validate search data
function SearchResultContainer() {
  const searchData = useParametricSearchData()
  console.log(searchData)
  return (
    <Suspense fallback={<SearchResultLoader />}>
      <SearchResultSessionProvider routes={searchData.routes} travelClass={searchData.travelClass} passengers={searchData.passengers}>
        <SearchResultTransportContainer />
      </SearchResultSessionProvider>
    </Suspense>
  )
}


interface SearchResultSessionProviderProps {
  routes: RouteType[]
  travelClass?: number
  passengers?: Partial<{
    adults: number
    children: number
    infants: number
  }>

  children: ReactNode
}
// 2. Create session
function SearchResultSessionProvider(props: SearchResultSessionProviderProps) {
  const { error, payload } = useSuspenseQuery(postTicketsAir(props.routes, props.travelClass || 1, props.passengers))
  if (error || !payload) throw new Error()
  return (
    <searchSessionContext.Provider value={{ session: payload.session }}>
      {props.children}
    </searchSessionContext.Provider>
  )
}

// 3. Determine what type transport is used and get relevant tickets
function SearchResultTransportContainer() {
  return (
    <SearchResultAirContainer />
  )
}

// function SearchResultA() {
//   const [isSearchFormOpen, setIsSearchFormOpen] = useState(true)
//   return (
//     <>
//       {/* <Helmet>
//         <title>{meta.generateTitle(cityFrom, cityTo, travelClass)}</title>
//         <meta
//           name="description"
//           content={meta.generateMetaDescription(
//             cityFrom,
//             cityFromCode,
//             cityTo,
//             cityToCode,
//             travelClass,
//             isChildren
//           )}
//         />
//       </Helmet> */}
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
