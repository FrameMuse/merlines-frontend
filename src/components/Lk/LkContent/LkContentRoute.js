import { useDispatch } from "react-redux"
import {
  setIsHistoryRoute,
  setIsOpenClearHistory
} from "../../../reducers/lkDataSlice"

function LkContentRoute() {
  const dispatch = useDispatch()

  const onClickClearHistoryResult = () => {
    dispatch(setIsHistoryRoute(true))
    dispatch(setIsOpenClearHistory(true))
  }

  return (
    <li className="cabinet__col-item">
      <div className="download__field download__field--cabinet download__field--one">
        <span className="download__item download__item--city download__item--icon">
          Москва{" "}
        </span>
        <span className="download__item download__item--city">Париж</span>
        <span className="download__item download__item--date">15 октября</span>
        <span className="download__item download__item--passenger">
          1 пассажир / эконом
        </span>
        <button
          onClick={onClickClearHistoryResult}
          className="download__edit download__edit--clear"
          type="button"
        ></button>
      </div>
    </li>
  )
}

export default LkContentRoute
