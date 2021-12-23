// SCSS
import "./comments.scss"

import Icon from "components/common/Icon"
import { ArticleReplyType } from "interfaces/Blog"
import { Link } from "react-router-dom"
import { classWithModifiers } from "utils"

import ArticleCommentsList from "./ArticleCommentsList"

function ArticleComments(props: { list: ArticleReplyType[] }) {
  return (
    <section className="comments comments--active">
      <div className="comments__header">
        <h2 className="comments__header-title">
          <span className="comments__header-counter">23</span>комментария
        </h2>
        <div className={classWithModifiers("comments__like")}>
          <span className="comments__like-counter">24</span>
          <Icon className="comments__like-icon" name="like" />
        </div>
      </div>
      <ArticleCommentsList list={props.list} />
      <form className="comments__form">
        <div className="comments__form-header">
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
        </div>
        <textarea className="comments__message" placeholder="Введите текст комментария..." />
        <div className="comments__btn-container">
          <input className="btn comments__btn" type="submit" value="Оставить комментарий" />
          <input className="comments__btn-reset" type="reset" value="Отменить" />
        </div>
      </form>
    </section>
  )
}

export default ArticleComments
