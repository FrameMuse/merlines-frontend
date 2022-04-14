import "./error.scss"

import { Link } from "react-router-dom"

import useLocalization from "../../plugins/localization/hook"


interface ErrorViewProps {
  code: "404" | 404 | ((string | number) & {})
}

function ErrorView(props: ErrorViewProps) {
  const ll = useLocalization(ll => ll)

  return (
    <section className="error error--404">
      <div className="error__container">
        <div className="error__inner">
          <h1 className="error__title">{ll.err.sorry}, {ll.err[props.code] || ll.err["404"]}</h1>
          <Link className="error__link" to="/">{ll.err.returnBack}</Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorView
