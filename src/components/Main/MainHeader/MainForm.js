import "./main-form.scss"

import useLocalization from "../../../plugins/localization/hook"
import SearchForm from "../../SearchForm/SearchForm"
import MainHeaderSwitcher from "./MainHeaderSwitcher"

function MainForm() {
  const ll = useLocalization(ll => ll)

  return (
    <section className="main-form">
      <div className="main-form__container">
        <div className="main-form__header">
          <h2 className="main-form__title">{ll.main.searchTickets}</h2>
          <MainHeaderSwitcher />
        </div>
      </div>
      <SearchForm />
    </section>
  )
}

export default MainForm
