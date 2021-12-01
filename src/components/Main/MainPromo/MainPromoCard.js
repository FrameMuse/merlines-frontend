import React, { useRef, useEffect } from 'react';

function MainPromoCard({
  cardTitle,
  cardText,
  cardImg,
  isActive,
  cardModifier,
  ks,
  handleClick,
  cardStyle,
  index
}) {
  const titleClass = isActive
    ? 'advantages__slider-title advantages__slider-title--sm'
    : 'advantages__slider-title';
  const itemClass = isActive
    ? 'advantages__slider-item advantages__slider-item--active'
    : 'advantages__slider-item ';
  const gridColumn = index + 1;
  const card = useRef(null);
  useEffect(() => {
    // console.log('MainPromoCard.useEffect', card.current);
    card.current.parentElement.parentElement.style.gridColumn =
      gridColumn + '/ span 1';
  });
  return (
    <div
      ref={card}
      onTouchEnd={handleClick}
      className={`${itemClass} ${ks}`}
      style={cardStyle}
    >
      <div className="advantages__img-box">
        <img
          className={`advantages__img advantages__img--${cardModifier}`}
          src={cardImg}
          alt={cardTitle}
        />
      </div>
      <div className="advantages__slider-content">
        <h3 className={titleClass}>{cardTitle}</h3>
        <p className="advantages__slider-text">{cardText}</p>
      </div>
    </div>
  );
}

export default MainPromoCard;
