import React from "react";
import {selectMainSearchParams, setOneWay} from "../../../../reducers/mainSearchSlice";
import {useDispatch, useSelector} from "react-redux";


const ChooseWay = () => {
  const dispatch = useDispatch();
  const mainSearchParams = useSelector(selectMainSearchParams);

  const pickOneWay = evt => {
    evt.preventDefault();
    dispatch(setOneWay(true));
  }

  const pickTwoWays = evt => {
    evt.preventDefault();
    dispatch(setOneWay(false));
  }

  return (
    <div className="form__nav">
      <button
        onClick={pickTwoWays}
        className={`form__nav-btn ${!mainSearchParams.one_way ? "form__nav-btn--active" : ""}`}>
        Туда - обратно
      </button>
      <button
        onClick={pickOneWay}
        className={`form__nav-btn ${mainSearchParams.one_way ? "form__nav-btn--active" : ""}`}>
        В одну сторону
      </button>
      <button onClick={evt => evt.preventDefault()} className="form__nav-btn">Сложный маршрут</button>
    </div>
  )
}

export default  ChooseWay
