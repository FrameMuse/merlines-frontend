import "./main-form.scss"

import { useSelector } from "react-redux"

import SearchForm from "../../SearchForm/SearchForm"
import SearchFormComplicated from "../../SearchForm/SearchFormComplicated"
import MainHeaderSwitcher from "./MainHeaderSwitcher"

function MainForm() {
  const search = useSelector(state => state.search)
  return (
    <section className="main-form">
      <div className="main-form__container">
        <div className="main-form__header">
          <h2 className="main-form__title">Ищем и сравниваем билеты на</h2>
          <MainHeaderSwitcher />
        </div>
      </div>

      {search.routes.length === 1 ? <SearchForm /> : <SearchFormComplicated />}
    </section>
  )
}

export default MainForm
