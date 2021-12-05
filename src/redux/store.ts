import thunk from "redux-thunk"
import combinedReducers from "./combinedReducers"
import { createStore, applyMiddleware, compose } from "redux"

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)))
export default store
// Declarations
declare module "redux" {
  interface Store { }
}
declare module "react-redux" {
  interface DefaultRootState extends ReturnType<typeof store.getState> { }
  function useDispatch<TDispatch = typeof store.dispatch>(): TDispatch;
}
