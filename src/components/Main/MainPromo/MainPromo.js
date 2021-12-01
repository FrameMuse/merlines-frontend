import MainPromoTitle from "./MainPromoTitle"
import MainPromoSubtitle from "./MainPromoSubtitle"
import "./advantages.scss"
import MainPromoSlider from "./slick/MainPromoSlider"

function MainPromo() {
  return (
    <section className="advantages">
      <div className="advantages__container">
        <MainPromoTitle />
        <MainPromoSubtitle />
        <MainPromoSlider />
        {/* <MainPromoList /> */}
      </div>
    </section>
  )
}

export default MainPromo
