import { postBlogArticleComments } from "api/actions/blog"
import ClientAPI from "api/client"
import { ArticleAuthorType } from "interfaces/Blog"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"


interface ArticleCommentsFormProps {
  id: number
  reply?: ArticleAuthorType
}

function ArticleCommentsForm(props: ArticleCommentsFormProps) {
  const [message, setMessage] = useState("")
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    ClientAPI.query(postBlogArticleComments(props.id, message, props.reply?.id))
  }
  return (
    <form className="comments__form" onSubmit={onSubmit}>
      <div className="comments__form-header">
        <h3 className="comments__form-title">Ваш комментарий</h3>
        {props.reply && (
          <div className="comments__info">
            <span>ответ для</span>
            <Link className="comments__info-link" to={"/user/" + props.reply?.id}>
              {props.reply?.first_name} {props.reply?.last_name}
            </Link>
          </div>
        )}
        <div className="comments__form-info">(0/500 символов)</div>
      </div>
      <textarea className="comments__message" placeholder="Введите текст комментария..." onInput={event => setMessage(event.currentTarget.value)} />
      <div className="comments__btn-container">
        <input className="btn comments__btn" type="submit" value="Оставить комментарий" />
        <input className="comments__btn-reset" type="reset" value="Отменить" />
      </div>
    </form>
  )
}

export default ArticleCommentsForm
