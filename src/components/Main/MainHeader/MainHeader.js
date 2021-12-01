import React from "react"
import MainHeaderTitle from "./MainHeaderTitle"
import MainHeaderSwitcher from "./MainHeaderSwitcher"
import SearchForm from "../../SearchForm/SearchForm"
import "./main-form.scss"

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
