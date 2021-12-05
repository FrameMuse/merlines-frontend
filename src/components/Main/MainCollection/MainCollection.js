import "./mainCollectionSliderStyle.scss"

import React from "react"

import MainCollectionSubtitle from "../MainCollection/MainCollectionSubtitle"
import MainCollectionTitle from "../MainCollection/MainCollectionTitle"
import MainCollectionSlider from "./slick/MainCollectionSlider"

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
