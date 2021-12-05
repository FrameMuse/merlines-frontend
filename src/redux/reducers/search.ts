export type SearchTravelClass = "business" | "economy"

export interface SearchRoute {
  departurePoint: string | null
  arrivalPoint: string | null

  departureDate: Date | null
  returnDate: Date | null
}

export interface SearchDetails {
  travelClass: SearchTravelClass
  routes: SearchRoute[]
  passengers: {
    adults: number
    children: number
    babies: number
  }
}

const initialState: SearchDetails = {
  travelClass: "economy",
  routes: [],
  passengers: {
    adults: 1,
    children: 0,
    babies: 0
  }
}

type Action =
  { type: "SEARCH_UPDATE" | "SEARCH_ROUTES_ADD" | "SEARCH_PASSENGERS_UPDATE", payload: typeof initialState }
  | { type: "SEARCH_ROUTES_UPDATE", payload: { index: number; route: SearchRoute } }

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "SEARCH_UPDATE":
      return { ...state, ...action.payload }

    case "SEARCH_ROUTES_ADD":
      return { ...state, routes: [...state.routes, ...action.payload.routes] }

    case "SEARCH_ROUTES_UPDATE":
      state.routes.splice(action.payload.index, 0, action.payload.route)
      return { ...state, routes: state.routes }

    case "SEARCH_PASSENGERS_UPDATE":
      return { ...state, passengers: { ...state.passengers, ...action.payload.passengers } }

    default:
      return state
  }
}

export const updateSearchTravelClass = (travelClass: SearchTravelClass) => ({
  type: "SEARCH_UPDATE",
  payload: { travelClass }
})

export const addSearchRoutes = (...routes: SearchRoute[]) => ({
  type: "SEARCH_ROUTES_ADD",
  payload: { routes }
})

export const updateSearchRoute = (index: number, route: SearchRoute) => ({
  type: "SEARCH_ROUTES_ADD",
  payload: { index, route }
})

export const updateSearchPassengers = (passengers: Partial<SearchDetails["passengers"]>) => ({
  type: "SEARCH_PASSENGERS_UPDATE",
  payload: { passengers }
})
