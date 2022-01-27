import "./ticket-list.scss"

import { postTicketsAir } from "api/actions/tickets"
import ErrorBoundary from "components/services/ErrorBoudary"
import { TripType } from "interfaces/Search"
import { createContext, Suspense, useEffect } from "react"
import { useSuspenseQuery } from "react-fetching-library"
import { useHistory, useLocation } from "react-router-dom"

import SearchForm from "../SearchForm/SearchForm"
import SearchResultAirContainer from "./SearchResultAirContainer"
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
      <Suspense fallback={<SearchResultLoader />}>
        <ErrorBoundary fallback={<SearchResultTicketError />}>
          <SearchResultContainer />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
// 1. Validate search data
function SearchResultContainer() {
  const location = useLocation()
  const locationSearchParams = new URLSearchParams(location.search)

  const origins = locationSearchParams.getAll("origin")
  const destinations = locationSearchParams.getAll("destination")
  const dates = locationSearchParams.getAll("date")
  const travel_class = locationSearchParams.get("travel_class")

  if (travel_class == null) {
    throw new Error("There is no travel_class")
  }

  if (!origins.length || !destinations.length || !origins.length) {
    throw new Error("There is a lack of data")
  }

  if ((origins.length !== destinations.length) || (origins.length !== dates.length)) {
    throw new Error("There is a diffrent amount of data")
  }

  const trips: TripType[] = origins.map((origin, index) => ({
    origin: +origin,
    destination: +destinations[index],
    date: dates[index]
  }))

  return (
    <SearchResultSessionProvider trips={trips} travel_class={travel_class}>
      <SearchResultTransportContainer />
    </SearchResultSessionProvider>
  )
}


interface SearchResultSessionProviderProps {
  trips: TripType[]
  travel_class: string
  children: any
}
// 2. Create session
function SearchResultSessionProvider(props: SearchResultSessionProviderProps) {
  const { error, payload, query } = useSuspenseQuery(postTicketsAir(props.trips, props.travel_class))

  // Update on location update
  const history = useHistory()
  useEffect(() => history.listen(() => query()), [history])

  if (error || !payload) {
    throw new Error()
  }

  return (
    <searchSessionContext.Provider value={{ session: payload.session }}>
      {props.children}
      1asdasdasdsas
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
