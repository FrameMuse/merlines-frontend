import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import MainPromoCard from "../MainPromoCard"
import MockSlides from "./MockSlides"
import { DotButtons } from "./DotButton"

const initialActiveCard = {
  index: 0
}

const MainPromoSlider = () => {
  // const [loading, setLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(initialActiveCard)
  const slider = useRef(null)
  const [slides, setSlides] = useState([])

  const settings = {
    initialSlide: 0,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    className: "advantages__list",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          // useTransform: true,
          // swipeToSlide: true,
          speed: 500,
          arrows: false,
          // centerMode: true,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          infinite: true,
          dots: false,
          lazyLoad: true,
          // easing: 'ease-out',
          // useCSS: true,
          // fade: false,
          beforeChange: (current, next) => {
            // next = next < 0 ? 0 : next;
            console.log("MainPromoSlider.beforeChange", next)
            setActiveCard({ index: next < 0 ? 0 : next })
          },
          afterChange: (next) => {
            // next = next < 0 ? 0 : next;
            // console.log('MainPromoSlider.afterChange', next);
          },
          onReInit: () => {
            // console.log('MainPromoSlider.slider.onReInit');
            // slider.current?.slickGoTo(0);
          },
          onInit: () => {
            // console.log('MainPromoSlider.slider.onInit');
            // slider.current?.slickGoTo(0);
          }
        }
      }
    ]
  }

  const handleClick = (evt) => {
    console.log(evt.target.classList)
  }

  useEffect(() => {
    let didCancel = false
    const getSlides = () => {
      // setLoading(true);
      let res = []
      try {
        if (!didCancel) {
          res = MockSlides()
          // console.log('MainPromoCard.getSlides', res);
          setSlides(res)
        }
      } catch (e) {
        console.log("MainPromoSlides.getSlides", e)
      } finally {
        // console.log('MainPromoCard.getSlides.finally');
        // slider.current.slickGoTo(0);
        // setLoading(false);
      }
    }

    getSlides()
    return () => (didCancel = true)
  }, [])

  useEffect(() => {
    slider.current?.slickGoTo(activeCard.index)
  }, [activeCard.index])

  return (
    <>
      <div>
        <Slider ref={slider} {...settings}>
          {slides?.map((card, index) => (
            <MainPromoCard
              handleClick={handleClick}
              key={index}
              cardTitle={card.title}
              isActive={index === activeCard.index}
              cardText={card.text}
              cardImg={card.img}
              cardModifier={card.modifier}
              ks={card.ksClass}
              index={index}
            />
          ))}
        </Slider>
      </div>
      <div className="advantages__slider-control">
        <DotButtons dispatch={setActiveCard} activeIndex={activeCard.index} />
      </div>
    </>
  )
}

export default MainPromoSlider
