import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

interface MainSpecialCardProps {
  isBest?: boolean
  image?: string
  from: string
  to: string
  city: string
  price: number
}

function MainSpecialCard(props: MainSpecialCardProps) {
  return (
    <div className={classWithModifiers("special__item", props.isBest && "big")}>
      {props.isBest && (
        <div className="special__item-box">
          <img className="special__item-img" src={props.image} alt={props.city} />
        </div>
      )}
      <div className="special__item-head">
        <span className="special__item-city">{props.from}</span>
        <Icon name="arrow" className="special__icon-arrow" />
        <span className="special__item-city">{props.to}</span>
      </div>
      <h3 className="special__item-title">{props.city}</h3>
      <div className="special__item-text">{`от ${props.price} ₽`}</div>
    </div>
  )
}

export default MainSpecialCard
