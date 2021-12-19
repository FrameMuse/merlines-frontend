import "./style.scss"

import AdminView from "admin/AdminView"
import ClientAPI from "api/client"
import React from "react"
import ReactDOM from "react-dom"
import { ClientContextProvider } from "react-fetching-library"
import { Route, Switch } from "react-router-dom"
import { RecoilRoot } from "recoil"

import App from "./App"
import Root from "./Root"

ReactDOM.render(
  <React.StrictMode>
    <Root>
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
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
)
