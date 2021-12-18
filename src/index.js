import "./style.scss"

import ClientAPI from "api/client"
import React from "react"
import ReactDOM from "react-dom"
import { ClientContextProvider } from "react-fetching-library"
import { RecoilRoot } from "recoil"

import App from "./App"
import Root from "./Root"

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <RecoilRoot>
        <ClientContextProvider client={ClientAPI}>
          <App />
        </ClientContextProvider>
      </RecoilRoot>
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
)
