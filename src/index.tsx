import "./style.scss"
import "react-toastify/dist/ReactToastify.css"

import ClientAPI from "api/client"
import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { ClientContextProvider } from "react-fetching-library"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { applyMiddleware, createStore } from "redux"
import combinedReducers from "redux/combinedReducers"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import App from "./App"




const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <StrictMode>
    <HashRouter hashType="hashbang">
      <Provider store={store}>
        <RecoilRoot>
          <ClientContextProvider client={ClientAPI}>
            <App />
          </ClientContextProvider>
        </RecoilRoot>
      </Provider>
    </HashRouter>
  </StrictMode>,
  document.getElementById("root")
)
