import { ConnectedRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import React from "react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

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

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  )
}

export default Root
