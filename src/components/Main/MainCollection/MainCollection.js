import React from "react"
import MainCollectionTitle from "../MainCollection/MainCollectionTitle"
import MainCollectionSubtitle from "../MainCollection/MainCollectionSubtitle"
import MainCollectionSlider from "./slick/MainCollectionSlider"
import "./mainCollectionSliderStyle.scss"

const MainCollection = () => {
  return (
    <section className="section section--index">
      <div className="section__container swiper-container">
        <MainCollectionTitle />
        <MainCollectionSubtitle />
        <MainCollectionSlider />
      </div>
    </section>
  )
}

export default MainCollection
