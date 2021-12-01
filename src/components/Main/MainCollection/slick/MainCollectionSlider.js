import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import MainCollectionCard from '../MainCollectionCard';
import { MainCollectionNextArrow, MainCollectionPrevArrow } from './Arrows';
import MockSlides from './MockSlides';

const getNumberOfActiveSlides = () => {
  const $list = document.querySelectorAll(
    '.section__container .slick-slide.slick-active'
  );
  return $list.length;
};

const calcNextSlideNumber = (current, dir, slides, numberOfActiveSlides) => {
  let slideNumber = current;
  switch (dir) {
    case DIRS.left:
      if (slideNumber > 0) slideNumber--;
      break;
    case DIRS.right:
      if (slideNumber < slides - numberOfActiveSlides) slideNumber++;
      break;
    default:
  }
  return slideNumber;
};

const DIRS = { right: 'right', left: 'left' };

const MainCollectionSlider = () => {
  const [slideNumber, setSlideNumber] = useState(0);

  const [slides, setSlides] = useState([]);

  const getSlides = async () => {
    let res = [];
    try {
      res = await MockSlides;
      setSlides(res);
    } catch (e) {
      console.log('MainCollectionSlides.getSlides', e);
    }
  };

  const slider = useRef(null);
  let blockSlickToGo = false;
  const [numberOfActiveSlides, setNumberOfActiveSlides] = useState(
    slides.length
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    swipeToSlide: true,
    className: 'section__list',
    beforeChange: () => {
      blockSlickToGo = true;
    },
    afterChange: (current) => {
      setSlideNumber(current);
      blockSlickToGo = false;
    },
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          swipeToSlide: true
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          speed: 100,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          swipeToSlide: true,
          autoplay: false,
          initialSlide: 5
        }
      }
    ]
  };

  useEffect(() => getSlides());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setNumberOfActiveSlides(getNumberOfActiveSlides());
    });
  });

  useEffect(() => {
    if (!blockSlickToGo) slider.current.slickGoTo(slideNumber ?? 0);
    setNumberOfActiveSlides(getNumberOfActiveSlides());
  }, [blockSlickToGo, slideNumber, numberOfActiveSlides]);

  return (
    <div>
      <MainCollectionPrevArrow
        onClick={() => {
          setSlideNumber(
            calcNextSlideNumber(
              slideNumber,
              DIRS.left,
              slides.length,
              numberOfActiveSlides
            )
          );
        }}
        disabled={slideNumber === 0}
      />

      <Slider ref={slider} {...settings}>
        {slides?.map((slide, index) => (
          <MainCollectionCard
            key={index}
            cardMain={slide.main ?? false}
            cardImg={slide.img}
            cardTag={slide.tag}
            cardTitle={slide.title}
            cardDate={slide.date}
            cardDateNum={slide.dateNum}
          />
        ))}
      </Slider>
      <MainCollectionNextArrow
        onClick={() => {
          setSlideNumber(
            calcNextSlideNumber(
              slideNumber,
              DIRS.right,
              slides.length,
              numberOfActiveSlides
            )
          );
        }}
        disabled={
          slides.length === numberOfActiveSlides ||
          slideNumber === slides.length - numberOfActiveSlides
        }
      />
    </div>
  );
};

export default MainCollectionSlider;
