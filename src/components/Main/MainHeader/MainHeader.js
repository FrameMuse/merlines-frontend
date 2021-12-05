import "./main-form.scss"

import React from "react"

import SearchForm from "../../SearchForm/SearchForm"
import MainHeaderSwitcher from "./MainHeaderSwitcher"
import MainHeaderTitle from "./MainHeaderTitle"

function MainHeader() {
  return (
    <section className="main-form">
      <div className="main-form__container">
        <div className="main-form__header">
          <MainHeaderTitle />
          <MainHeaderSwitcher />
        </div>
      </div>
      <SearchForm />
    </section>
  )
}

export default MainHeader
