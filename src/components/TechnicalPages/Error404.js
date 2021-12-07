import "./error.scss"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { selectRoutesData } from "../../reducers/routesDataSlice"

function Error404() {
  const routesData = useSelector(selectRoutesData)

  return (
    <section className="error error--404">
      <div className="error__container">
        <div className="error__inner">
          <h1 className="error__title">Извините, страница не найдена</h1>
          <Link className="error__link" to={routesData.historyRoute}>
            вернуться обратно
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Error404
