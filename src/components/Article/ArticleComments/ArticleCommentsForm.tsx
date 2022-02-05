import { postBlogArticleComments } from "api/actions/blog"
import ClientAPI from "api/client"
import { ArticleAuthorType, ArticleReplyType } from "interfaces/Blog"
import { Dispatch, FormEvent, useState } from "react"
import { Link } from "react-router-dom"


const MAX_TEXTAREA_LENGTH = 500

interface ArticleCommentsFormProps {
  articleId: number
  reply?: ArticleAuthorType
  replyId?: number

  onNewMessage?: Dispatch<ArticleReplyType>
}

function ArticleCommentsForm(props: ArticleCommentsFormProps) {
  const [message, setMessage] = useState("")
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (message.length === 0) return

    ClientAPI
      .query(postBlogArticleComments(props.articleId, message, props.replyId))
      .then(({ error, payload }) => {
        if (error || !payload) return

        form.reset()
        props.onNewMessage?.({
          ...payload,
          text: message,
          replies: []
        })
      })
  }
  return (
    <form className="comments__form" onSubmit={onSubmit}>
      <div className="comments__form-header">
        <h3 className="comments__form-title">Ваш комментарий</h3>
        {props.reply && (
          <div className="comments__info">
            <span>ответ для </span>
            <Link className="comments__info-link" to={"/user/" + props.reply?.id}>
              {props.reply?.first_name} {props.reply?.last_name}
            </Link>
          </div>
        )}
        <div className="comments__form-info">({message.length}/{MAX_TEXTAREA_LENGTH} символов)</div>
      </div>
      <textarea className="comments__message" maxLength={MAX_TEXTAREA_LENGTH} placeholder="Введите текст комментария..." onInput={event => setMessage(event.currentTarget.value)} />
      <div className="comments__btn-container">
        <input className="btn comments__btn" type="submit" value="Оставить комментарий" />
        <input className="comments__btn-reset" type="reset" value="Отменить" />
      </div>
    </form>
  )
}

export default ArticleCommentsForm
