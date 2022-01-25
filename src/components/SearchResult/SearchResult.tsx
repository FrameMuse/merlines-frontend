import "./ticket-list.scss"

import { getTicketsAir, getTicketsAirFilters, postTicketsAir } from "api/actions/tickets"
import SearchResultError from "components/TechnicalPages/SearchResultError"
import Ticket from "components/Ticket/Ticket"
import { FiltersType, TripType } from "interfaces/Search"
import { createContext, Suspense, useContext, useState } from "react"
import { useQuery, useSuspenseQuery } from "react-fetching-library"
import { useLocation } from "react-router-dom"

import Icon from "../common/Icon"
import Loader from "../Loader/Loader"
import LoaderClose from "../Loader/LoaderClose"
import SearchForm from "../SearchForm/SearchForm"
import SearchFormMini from "../SearchForm/SearchFormMini"
import SearchFilters from "./SearchResultFilters/SearchFilters"
import SearchPriceFilter from "./SearchResultFilters/SearchPriceFilter"
import SearchResultSubscribePrice from "./SearchResultSubscribePrice/SearchResultSubscribePrice"
import SearchResultTicketList from "./SearchResultTicketList/SearchTicketList"
import SearchResultWeekPrice from "./SearchResultWeekPrice/SearchResultWeekPrice"


function getAirlineLogo(code: string | number) {
  return `https://pics.avs.io/gates/50/50/${code}.png`
}

// Request session
const searchSessionContext = createContext({ session: "" })

function SearchResult() {
  return (
    <>
      <section className="main-form">
        <SearchForm />
      </section>
      <SearchResultContainer />
    </>
  )
}
// 1. Validate search data
function SearchResultContainer() {
  const location = useLocation()
  const locationSearchParams = new URLSearchParams(location.search)

  const origin = locationSearchParams.get("origin")
  const destination = locationSearchParams.get("destination")
  const date = locationSearchParams.get("date")

  if (!origin || !destination || !date) {
    return (
      <SearchResultError />
    )
  }

  const trips = [{
    origin: +origin,
    destination: +destination,
    date
  }]

  return (
    <SearchResultSessionProvider trips={trips}>
      <Suspense fallback={<Loader />}>
        <SearchResultTicketsContainer />
      </Suspense>
    </SearchResultSessionProvider>
  )
}


interface SearchResultBProps {
  trips: TripType[]
  children: any
}

// 2. Create session
function SearchResultSessionProvider(props: SearchResultBProps) {
  const { error, loading, payload } = useQuery(postTicketsAir(props.trips))

  if (loading) {
    return <Loader />
  }

  if (error || !payload) {
    return <SearchResultError />
  }

  return (
    <searchSessionContext.Provider value={{ session: payload.session }}>
      {props.children}
    </searchSessionContext.Provider>
  )
}

// 3. Determine what type transport is used and get relevant tickets
function SearchResultTicketsContainer() {
  return (
    <SearchResultAirContainer />
  )
}

function SearchResultAirContainer() {
  const [page, setPage] = useState(1)
  const [page_size] = useState(5)
  const [filters, setFilters] = useState<Partial<FiltersType>>({})

  const { session } = useContext(searchSessionContext)
  const { error, payload } = useSuspenseQuery(getTicketsAir(session, page, page_size, filters))

  if (error || !payload) return <SearchResultError />

  return (
    <section className="ticket-list">
      <div className="ticket-list__container">
        <SearchResultWeekPrice />
        <SearchResultAirFiltersContainer />
        <div className="ticket-list__content">
          {payload.results.map(ticket => (
            <Ticket
              id={ticket.id}
              logos={[getAirlineLogo(ticket.best_offer.gate_id)]}
              price={ticket.best_offer.price}
              baggagePrice={ticket.price_with_baggage}
              timelines={ticket.trips[0].segments.map(seg => ({
                arrivalTime: new Date(seg.arrival_time),
                departureTime: new Date(seg.departure_time),
                arrivalPoint: seg.arrival.city + ", " + seg.arrival.title,
                departurePoint: seg.departure.city + ", " + seg.departure.title,
                entries: []
              }))}
              key={ticket.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function SearchResultAirFiltersContainer() {
  const { session } = useContext(searchSessionContext)
  const { error, payload } = useSuspenseQuery(getTicketsAirFilters(session))

  if (error || !payload) return <>No filters</>

  return (
    <div className="ticket-list__left">
      <SearchResultSubscribePrice />
      <div className="filters">
        <SearchPriceFilter />
        <SearchFilters />
      </div>
    </div>
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
