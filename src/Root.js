import React from "react"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import { applyMiddleware, createStore } from "redux"
import { routerMiddleware, ConnectedRouter } from "connected-react-router"
import { composeWithDevTools } from "redux-devtools-extension"

import { setCurrentUser, setToken } from "./components/Login/LoginActions"
import rootReducer from "./Reducer"
import { isEmpty } from "./utils"

const Root = ({ children, initialState = {} }) => {
  const history = createBrowserHistory()
  const middleware = [thunk, routerMiddleware(history)]

  const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(setToken(localStorage.getItem("token")))
  }
  if (!isEmpty(localStorage.getItem("user"))) {
    const user = JSON.parse(localStorage.getItem("user"))
    store.dispatch(setCurrentUser(user, ""))
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  )
}

export default Root
