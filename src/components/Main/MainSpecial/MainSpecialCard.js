import Svg from "../../common/Svg"

function MainSpecialCard({
  bestCard,
  bestCardImg,
  cardFrom,
  cardTo,
  cardToCity,
  cardPrice
}) {
  return (
    <li className={`special__item ${bestCard ? "special__item--big" : ""}`}>
      {bestCard && (
        <div className="special__item-box">
          <img
            className="special__item-img"
            src={bestCardImg}
            alt={cardToCity}
          />
        </div>
      )}
      <div className="special__item-head">
        <span className="special__item-city">{cardFrom}</span>
        <Svg
          svgClass="special__icon-arrow"
          svgName="arrow"
          svgWidth="10"
          svgHeight="7"
        />
        <span className="special__item-city">{cardTo}</span>
      </div>
      <h3 className="special__item-title">{cardToCity}</h3>
      <div className="special__item-text">{`от ${cardPrice} ₽`}</div>
    </li>
  )
}

export default MainSpecialCard
