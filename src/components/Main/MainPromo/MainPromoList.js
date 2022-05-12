import "keen-slider/keen-slider.min.css"

import { useKeenSlider } from "keen-slider/react"
import { useReducer, useState } from "react"

import MainPromoCard from "./MainPromoCard"

function MainPromoList() {
  const initialIsActiveCard = {
    save: true,
    seo: false,
    business: false
  }

  function reducer(state, action) {
    switch (action.type) {
      case "save":
        return {
          save: true,
          seo: false,
          business: false
        }
      case "seo":
        return {
          save: false,
          seo: true,
          business: false
        }
      case "business":
        return {
          save: false,
          seo: false,
          business: true
        }
      default:
        throw new Error()
    }
  }

  const [isActiveCard, dispatch] = useReducer(reducer, initialIsActiveCard)

  const mockDataPromoCards = [
    {
      title: "Лучшие цены",
      isActive: isActiveCard.save,
      text: "Помогаем найти самые гибкие маршруты и выгодные цены для клиентов",
      img: "images/advanteges/save-money-bw.png",
      modifier: "save",
      ksClass: "keen-slider__slide number-slide1"
    },
    {
      title: "Поиск по всему миру",
      isActive: isActiveCard.seo,
      text: "Постоянно отслеживаем акции, предложения перевозчиков и агентств",
      img: "images/advanteges/seo-bw.png",
      modifier: "seo",
      ksClass: "keen-slider__slide number-slide2"
    },
    {
      title: "Проверенные поставщики",
      isActive: isActiveCard.business,
      text: "Сотрудничаем с перевозчиками и агентствами, зарекомендовавшими себя временем",
      img: "images/advanteges/business-meeting-bw.png",
      modifier: "business",
      ksClass: "keen-slider__slide number-slide3"
    }
  ]

  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0)

  // eslint-disable-next-line no-unused-vars
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 3,
    breakpoints: {
      "(min-width: 0px) and (max-width: 767px)": {
        slidesPerView: 1
      }
    },
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }
  })

  const handleClick = (evt) => {
    // console.log(evt.target.classList)
  }

  return (
    <div className="advantages__slider">
      <ul ref={sliderRef} className="advantages__slider-list keen-slider">
        {mockDataPromoCards.map((card, index) => (
          <MainPromoCard
            handleClick={handleClick}
            key={index}
            cardTitle={card.title}
            isActive={card.isActive}
            cardText={card.text}
            cardImg={card.img}
            cardModifier={card.modifier}
            ks={card.ksClass}
          />
        ))}
      </ul>
      <div className="advantages__slider-control">
        <button
          onClick={() => dispatch({ type: "save" })}
          className={`advantages__slider-btn ${isActiveCard.save ? "advantages__slider-btn--active" : ""}`}
          type="button"
        ></button>
        <button
          onClick={() => dispatch({ type: "seo" })}
          className={`advantages__slider-btn ${isActiveCard.seo ? "advantages__slider-btn--active" : ""}`}
          type="button"
        ></button>
        <button
          onClick={() => dispatch({ type: "business" })}
          className={`advantages__slider-btn ${isActiveCard.business ? "advantages__slider-btn--active" : ""}`}
          type="button"
        ></button>
      </div>
    </div>
  )
}

export default MainPromoList
