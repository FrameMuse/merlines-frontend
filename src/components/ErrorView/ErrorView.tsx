import "./error.scss"

import { Link } from "react-router-dom"


interface ErrorViewProps {
  code: "404" | 404 | ((string | number) & {})
}

function ErrorView(props: ErrorViewProps) {
  return (
    <section className="error error--404">
      <div className="error__container">
        <div className="error__inner">
          <h1 className="error__title">Извините, {ll[props.code] || ll[404]}</h1>
          <Link className="error__link" to="/">вернуться обратно</Link>
        </div>
      </div>
    </section>
  )
}

const ll = {
  404: "страница не найдена",
  500: "произошла ошибка сервера",
} as Record<string | number, string>

export default ErrorView
