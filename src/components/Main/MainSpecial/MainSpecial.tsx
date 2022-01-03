import MainSpecialList from "./MainSpecialList"
import MainSpecialSwitcher from "./MainSpecialSwitcher"

function MainSpecial() {
  return (
    <section className="special">
      <div className="special__container">
        <div className="special__inner">
          <h2 className="special__title">Спецпредложения</h2>
          <p className="special__text">Только здесь и сейчас!</p>
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
