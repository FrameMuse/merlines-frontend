import "./style.scss"
import "react-toastify/dist/ReactToastify.css"

import ClientAPI from "api/client"
import ErrorBoundary from "components/services/ErrorBoudary"
import {StrictMode, Suspense} from "react"
import ReactDOM from "react-dom"
import {ClientContextProvider} from "react-fetching-library"
import {Provider} from "react-redux"
import {HashRouter} from "react-router-dom"
import {RecoilRoot} from "recoil"
import {applyMiddleware, createStore} from "redux"
import combinedReducers from "redux/combinedReducers"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import App from "./App"
import DELangJSON from "./lang/de.json"
import ENLangJSON from "./lang/en.json"
import RULangJSON from "./lang/ru.json"
import Localization from "./plugins/localization/controller"
import {getDefaultSelectedLanguage} from "./utils"

// Add languages
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Localization.add("en", ENLangJSON)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Localization.add("ru", RULangJSON)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
Localization.add("de", DELangJSON)
// Set default language
Localization.setDefault(getDefaultSelectedLanguage() || "ru")


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
            <Suspense fallback={<>Loading...</>}>
              <ErrorBoundary fallback={(e, t) => <>Error: {JSON.stringify(e)} <br /><br /><br /> {JSON.stringify(t)}</>}>
                <App />
              </ErrorBoundary>
            </Suspense>
          </ClientContextProvider>
        </RecoilRoot>
      </Provider>
    </HashRouter>
  </StrictMode>,
  document.getElementById("root")
)
