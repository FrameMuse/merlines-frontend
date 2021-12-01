function LandingPriceDynamicItem({ itemClass, price, name }) {
  return (
    <li className={`price-dynamics__schedule-item price-dynamics__schedule-item--${itemClass}`}>
      <span className="price-dynamics__schedule-price">{`${price.toLocaleString()} ₽`}</span>
      <div className="price-dynamics__schedule-thumb"></div>
      <span className="price-dynamics__schedule-month">{name}</span>
    </li>
  )
};

export default LandingPriceDynamicItem;
