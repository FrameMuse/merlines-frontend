import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import combinedReducers, { ReducersType } from "./combinedReducers"

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)))
export default store
// Declarations
declare module "redux" {
  interface Store { }
}
declare module "react-redux" {
  interface DefaultRootState extends ReducersType { }
  // function useDispatch<TDispatch = typeof store.dispatch>(): TDispatch;
}
