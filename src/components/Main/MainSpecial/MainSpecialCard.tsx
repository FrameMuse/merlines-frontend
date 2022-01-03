import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

interface MainSpecialCardProps {
  bestCard?: any
  bestCardImg?: any
  cardFrom: any
  cardTo: any
  cardToCity: any
  cardPrice: any
}

function MainSpecialCard(props: MainSpecialCardProps) {
  return (
    <div className={classWithModifiers("special__item", props.bestCard && "big")}>
      {props.bestCard && (
        <div className="special__item-box">
          <img className="special__item-img" src={props.bestCardImg} alt={props.cardToCity} />
        </div>
      )}
      <div className="special__item-head">
        <span className="special__item-city">{props.cardFrom}</span>
        <Icon name="arrow" className="special__icon-arrow" />
        <span className="special__item-city">{props.cardTo}</span>
      </div>
      <h3 className="special__item-title">{props.cardToCity}</h3>
      <div className="special__item-text">{`от ${props.cardPrice} ₽`}</div>
    </div>
  )
}

export default MainSpecialCard
