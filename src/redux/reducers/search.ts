export enum SearchTravelClass {
  economy = 1, business
}

export interface SearchPlace {
  id: number
  title: string
  code?: string
}

export interface SearchAirports extends SearchPlace {
  country_title: string
  airports: SearchPlace[]
}

export interface SearchRoute {
  origin: SearchPlace | null
  destination: SearchPlace | null

  date: Date | null
  returnDate: Date | null
}

export interface SearchDetails {
  hasReturnDate: boolean
  transport: "plane" | "bus" | "train"
  travelClass: SearchTravelClass
  routes: SearchRoute[]
  passengers: {
    adults: number
    children: number
    infants: number
  }
}

const initialState: SearchDetails = {
  hasReturnDate: false,
  transport: "plane",
  travelClass: 1,
  routes: [{ destination: null, origin: null, date: new Date, returnDate: null }],
  passengers: {
    adults: 1,
    children: 0,
    infants: 0
  }
}

Object.freeze(initialState)

type Action =
  { type: "SEARCH_UPDATE" | "SEARCH_ROUTES_ADD" | "SEARCH_PASSENGERS_UPDATE", payload: typeof initialState }
  | { type: "SEARCH_ROUTES_UPDATE", payload: { index: number; route: SearchRoute } }

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "SEARCH_UPDATE":
      return { ...state, ...action.payload }

    case "SEARCH_ROUTES_ADD":
      if (state.routes.length >= 7) {
        return state
      }
      return { ...state, routes: [...state.routes, ...action.payload.routes] }

    case "SEARCH_ROUTES_UPDATE":
      state.routes[action.payload.index] = {
        ...state.routes[action.payload.index],
        ...action.payload.route
      }

      return { ...state }

    case "SEARCH_PASSENGERS_UPDATE":
      return { ...state, passengers: { ...state.passengers, ...action.payload.passengers } }

    default:
      return state
  }
}

export const updateSearch = (payload: Partial<SearchDetails>) => ({
  type: "SEARCH_UPDATE",
  payload
})

export const resetSearchRoutes = {
  type: "SEARCH_UPDATE",
  payload: {
    routes: initialState.routes
  }
}

export const updateSearchHasReturnDate = (hasReturnDate: SearchDetails["hasReturnDate"]) => ({
  type: "SEARCH_UPDATE",
  payload: { hasReturnDate }
})

export const updateSearchTravelClass = (travelClass: SearchTravelClass) => ({
  type: "SEARCH_UPDATE",
  payload: { travelClass }
})

export const updateSearchTransport = (transport: SearchDetails["transport"]) => ({
  type: "SEARCH_UPDATE",
  payload: { transport }
})

export const addSearchRoutes = (...routes: SearchRoute[]) => ({
  type: "SEARCH_ROUTES_ADD",
  payload: { routes }
})

export const updateSearchRoute = (index: number, route: Partial<SearchRoute>) => ({
  type: "SEARCH_ROUTES_UPDATE",
  payload: { index, route }
})

export const updateSearchPassengers = (passengers: Partial<SearchDetails["passengers"]>) => ({
  type: "SEARCH_PASSENGERS_UPDATE",
  payload: { passengers }
})
