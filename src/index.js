import "./style.scss"

import React from "react"
import ReactDOM from "react-dom"
import { RecoilRoot } from "recoil"

import App from "./App"
import Root from "./Root"

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
)
