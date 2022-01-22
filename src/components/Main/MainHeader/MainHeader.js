import "./main-form.scss"

import React from "react"
import { useSelector } from "react-redux"

import SearchForm from "../../SearchForm/SearchForm"
import SearchFormComplicated from "../../SearchForm/SearchFormComplicated"
import MainHeaderSwitcher from "./MainHeaderSwitcher"
import MainHeaderTitle from "./MainHeaderTitle"

function MainHeader() {
  const search = useSelector(state => state.search)
  return (
    <section className="main-form">
      <div className="main-form__container">
        <div className="main-form__header">
          <MainHeaderTitle />
          <MainHeaderSwitcher />
        </div>
      </div>

      {search.routes.length === 1 ? <SearchForm /> : <SearchFormComplicated />}
    </section>
  )
}

export default MainHeader
