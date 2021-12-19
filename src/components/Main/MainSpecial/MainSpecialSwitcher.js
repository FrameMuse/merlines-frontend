import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import { setAir, setBus, setTrain } from "../../../reducers/mainSearchSlice"
import routes from "../../../routes"
import Icon from "../../common/Icon"

function MainSpecialSwitcher() {
  const path = useLocation().pathname
  const dispatch = useDispatch()

  return (
    <div className="special-nav special__special-nav">
      <Link
        className={`special-nav__item ${path === "/" ? "special-nav__item--active" : ""
        }`}
        to={routes.main}
        onClick={() => dispatch(setAir())}
      >
        <Icon
          className="special-nav__icon"
          name="plane"
          width="25"
          height="26"
        />
      </Link>
      <Link
        className={`special-nav__item ${path === "/train" ? "special-nav__item--active" : ""
        }`}
        to={routes.train}
        onClick={() => dispatch(setTrain())}
      >
        <Icon
          className="special-nav__icon"
          name="train"
          width="22"
          height="26"
        />
      </Link>
      <Link
        className={`special-nav__item ${path === "/bus" ? "special-nav__item--active" : ""
        }`}
        to={routes.bus}
        onClick={() => dispatch(setBus())}
      >
        <Icon
          className="special-nav__icon"
          name="bus"
          width="22"
          height="26"
        />
      </Link>
    </div>
  )
}

export default MainSpecialSwitcher
