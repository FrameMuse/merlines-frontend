import "./main-form.scss"

import SearchForm from "../../SearchForm/SearchForm"
import MainHeaderSwitcher from "./MainHeaderSwitcher"

function MainForm() {
  return (
    <section className="main-form">
      <div className="main-form__container">
        <div className="main-form__header">
          <h2 className="main-form__title">Ищем и сравниваем билеты на</h2>
          <MainHeaderSwitcher />
        </div>
      </div>
      <SearchForm />
    </section>
  )
}

export default MainForm
