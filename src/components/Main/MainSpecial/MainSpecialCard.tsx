import { stringifySearchData } from "components/SearchForm/SearchForm.utils"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { SearchPlace } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import Icon from "../../common/Icon"

interface MainSpecialCardProps {
  isBest?: boolean
  image?: string
  origin: SearchPlace | null
  destination: SearchPlace | null
  price: number
}

function MainSpecialCard(props: MainSpecialCardProps) {
  const search = useSelector(state => state.search)
  const link = stringifySearchData({
    ...search,
    routes: [{
      ...search.routes[0],
      origin: props.origin,
      destination: props.destination,
    }]
  })
  return (
    <div className={classWithModifiers("special__item", props.isBest && "big")}>
      {props.isBest && (
        <div className="special__item-box">
          <img className="special__item-img" src={props.image} alt={props.destination?.title || ""} />
        </div>
      )}
      <div className="special__item-head">
        <span className="special__item-city">{props.origin?.title}</span>
        <Icon name="arrow" className="special__icon-arrow" />
      </div>
      <h3 className="special__item-title">{props.destination?.title}</h3>
      <div className="special__item-text">{`от ${props.price} ₽`}</div>
      <Link className="ghost" to={link} />
    </div>
  )
}

export default MainSpecialCard
