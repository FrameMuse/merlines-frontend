import React from "react"
import ReactDOM from "react-dom"
import "./style.scss"

import App from "./App"
import Root from "./Root"

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
)
