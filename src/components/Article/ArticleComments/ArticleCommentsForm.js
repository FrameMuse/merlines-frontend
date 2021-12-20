import { Link } from "react-router-dom"

function ArticleCommentsForm() {
  return (
    <form className="comments__form">
      <header className="comments__form-header">
        <h3 className="comments__form-title">Ваш комментарий</h3>
        <span className="comments__info comments__info--closed">
          ответ для{" "}
          <Link className="comments__info-link" to="#">
            Григорий Пронин
          </Link>
        </span>
        <div className="comments__form-info">
          <span className="comments__symbol-counter">0</span>
          /
          <span>500 символов</span>
        </div>
      </header>
      <textarea className="comments__message" placeholder="Введите текст комментария..." />
      <div className="comments__btn-container">
        <input className="btn comments__btn" type="submit" value="Оставить комментарий" />
        <input className="comments__btn-reset" type="reset" value="Отменить" />
      </div>
    </form>
  )
}

export default ArticleCommentsForm
