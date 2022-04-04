import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { classWithModifiers } from "utils"

function LkClearHistory() {
  const dispatch = useDispatch()
  const lkData = {}
  return (
    <section className={classWithModifiers("overlay", "history", lkData.isOpenClearHistory && "active")}>
      <div className="overlay__container">
        <div className="overlay__content">
          <button
            // onClick={() => dispatch(setIsOpenClearHistory(false))}
            className="overlay__btn-close"
            type="button"
          >
            закрыть
          </button>
          <h2 className="overlay__title">
            {lkData.isHistoryRoute
              ? "Вы уверенны, что хотите удалить этот результат поиска из истории?"
              : "Вы уверенны, что хотите удалить все результаты поиска из истории?"}
          </h2>
          <div className="overlay__buttons">
            <Link className="overlay__button overlay__button--delete" to="#">Удалить</Link>
            <Link
              // onClick={() => dispatch(setIsOpenClearHistory(false))}
              className="overlay__button overlay__button--cancel"
              to="#"
            >
              Не удалять
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LkClearHistory
