import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import { setAir, setBus, setTrain } from "../../../reducers/mainSearchSlice"
import routes from "../../../routes"
import Svg from "../../common/Svg"

function MainSpecialSwitcher() {
  const path = useLocation().pathname
  const dispatch = useDispatch()

  return (
    <div className="special-nav special__special-nav">
      <Link
        className={`special-nav__item ${
          path === "/" ? "special-nav__item--active" : ""
        }`}
        to={routes.main}
        onClick={() => dispatch(setAir())}
      >
        <Svg
          svgClass="special-nav__icon"
          svgName="plane"
          svgWidth="25"
          svgHeight="26"
        />
      </Link>
      <Link
        className={`special-nav__item ${
          path === "/train" ? "special-nav__item--active" : ""
        }`}
        to={routes.train}
        onClick={() => dispatch(setTrain())}
      >
        <Svg
          svgClass="special-nav__icon"
          svgName="train"
          svgWidth="22"
          svgHeight="26"
        />
      </Link>
      <Link
        className={`special-nav__item ${
          path === "/bus" ? "special-nav__item--active" : ""
        }`}
        to={routes.bus}
        onClick={() => dispatch(setBus())}
      >
        <Svg
          svgClass="special-nav__icon"
          svgName="bus"
          svgWidth="22"
          svgHeight="26"
        />
      </Link>
    </div>
  )
}

export default MainSpecialSwitcher
