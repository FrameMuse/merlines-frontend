import useLocalization from "../../../plugins/localization/hook"
import MainSpecialList from "./MainSpecialList"
import MainSpecialSwitcher from "./MainSpecialSwitcher"

function MainSpecial() {
  const ll = useLocalization(ll => ll)

  return (
    <section className="special">
      <div className="special__container">
        <div className="special__inner">
          <h2 className="special__title">{ll.main.specialOffers}</h2>
          <p className="special__text">{ll.main.rightHereRightNow}</p>
          <MainSpecialSwitcher />
        </div>
      </div>
      <div className="special__wrap">
        <MainSpecialList />
      </div>
    </section>
  )
}

export default MainSpecial
