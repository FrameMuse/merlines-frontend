import { ArticleAuthorType } from "interfaces/Blog"
import { Link } from "react-router-dom"


interface ArticleCommentProps {
  replying?: ArticleAuthorType
}

function ArticleComment(props: ArticleCommentProps) {
  return (
    <form className="comments__form">
      <div className="comments__form-header">
        <h3 className="comments__form-title">Ваш комментарий</h3>
        {props.replying && (
          <div className="comments__info">
            <span>ответ для</span>
            <Link className="comments__info-link" to={"/user/" + props.replying?.id}>
              {props.replying?.first_name} {props.replying?.last_name}
            </Link>
          </div>
        )}
        <div className="comments__form-info">(0/500 символов)</div>
      </div>
      <textarea className="comments__message" placeholder="Введите текст комментария..." />
      <div className="comments__btn-container">
        <input className="btn comments__btn" type="submit" value="Оставить комментарий" />
        <input className="comments__btn-reset" type="reset" value="Отменить" />
      </div>
    </form>
  )
}

export default ArticleComment
