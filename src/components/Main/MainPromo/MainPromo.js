import "./advantages.scss"

import MainPromoSubtitle from "./MainPromoSubtitle"
import MainPromoTitle from "./MainPromoTitle"
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
