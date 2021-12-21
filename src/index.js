import "./style.scss"
import "react-toastify/dist/ReactToastify.css"

import ClientAPI from "api/client"
import { routerMiddleware } from "connected-react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { ClientContextProvider } from "react-fetching-library"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
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
      <Provider store={store}>
        <RecoilRoot>
          <ClientContextProvider client={ClientAPI}>
            <App />
          </ClientContextProvider>
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
)
