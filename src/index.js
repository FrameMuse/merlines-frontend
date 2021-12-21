import "./style.scss"

import AdminView from "admin/AdminView"
import ClientAPI from "api/client"
import { routerMiddleware } from "connected-react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { ClientContextProvider } from "react-fetching-library"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { RecoilRoot } from "recoil"
import { applyMiddleware, createStore } from "redux"
import combinedReducers from "redux/combinedReducers"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import App from "./App"

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(...[thunk, routerMiddleware(history)]))
)

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Provider store={store}>
        <RecoilRoot>
          <ClientContextProvider client={ClientAPI}>
            <Switch>
              <Route path="/admin">
                <AdminView />
              </Route>
              <Route>
                <App />
              </Route>
            </Switch>
          </ClientContextProvider>
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
)
