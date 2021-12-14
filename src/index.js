import "./style.scss"

import AdminView from "admin/AdminView"
import React from "react"
import ReactDOM from "react-dom"
import { Route, Switch } from "react-router-dom"
import { RecoilRoot } from "recoil"

import App from "./App"
import Root from "./Root"

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <RecoilRoot>
        <Switch>
          <Route path="/admin">
            <AdminView />
          </Route>
          <Route>
            <App />
          </Route>
        </Switch>
      </RecoilRoot>
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
)
