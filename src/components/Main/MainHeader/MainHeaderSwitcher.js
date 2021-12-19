import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"

import useFullRoute from "../../../hooks/useFullRoute"
// import useQuery from '../../../hooks/useQuery';
import { setAir, setBus, setTrain } from "../../../reducers/mainSearchSlice"
import routes from "../../../routes"
import Icon from "../../common/Icon"

function MainHeaderSwitcher() {
  const location = useLocation()
  // const query = useQuery();
  const dispatch = useDispatch()
  const fullRoute = useFullRoute()

  const mainLocation = {
    // air: (location.pathname === routes.main) || (query.get('next') === routes.main),
    air: location.pathname === routes.main || fullRoute.includes("air"),
    train: location.pathname === routes.train || fullRoute.includes("train"),
    bus: location.pathname === routes.bus || fullRoute.includes("bus")
  }

  return (
    <div className="main-form__nav">
      <Link
        className={`main-form__item ${mainLocation.air ? "main-form__item--active" : ""
        }`}
        to={routes.main}
        onClick={() => dispatch(setAir())}
      >
        <Icon
          className="main-form__icon"
          name="plane"
          width="38"
          height="40"
        />
        <span className="main-form__item-text">самолёт</span>
      </Link>
      <Link
        className={`main-form__item ${mainLocation.train ? "main-form__item--active" : ""
        }`}
        to={routes.train}
        onClick={() => dispatch(setTrain())}
      >
        <Icon
          className="main-form__icon"
          name="train"
          width="38"
          height="40"
        />
        <span className="main-form__item-text">поезд</span>
      </Link>
      <Link
        className={`main-form__item ${mainLocation.bus ? "main-form__item--active" : ""
        }`}
        to={routes.bus}
        onClick={() => dispatch(setBus())}
      >
        <Icon
          className="main-form__icon"
          name="bus"
          width="38"
          height="40"
        />
        <span className="main-form__item-text">автобус</span>
      </Link>
    </div>
  )
}

export default MainHeaderSwitcher
