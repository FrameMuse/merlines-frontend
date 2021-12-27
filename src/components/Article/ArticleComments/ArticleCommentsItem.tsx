import { ArticleReplyType } from "interfaces/Blog"
import { useState } from "react"
import { Link } from "react-router-dom"

import ArticleCommentsForm from "./ArticleCommentsForm"


interface ArticleCommentsItemProps extends ArticleReplyType {
  articleId: number
}

function ArticleCommentsItem(props: ArticleCommentsItemProps) {
  const [comments, setComments] = useState<ArticleReplyType[]>(props.replies)
  const [isReplying, setIsReplying] = useState(false)

  function onNewMessage(comment: ArticleReplyType) {
    setComments([...comments, comment])
    setIsReplying(false)
  }

  const date = new Date(props.created_at).toLocaleString("ru", { dateStyle: "long", timeStyle: "short" })
  return (
    <li className="comments__item">
      <div className="user user--comments">
        <img className="user__avatar" src={props.author.avatar} alt="avatar" />
        <div className="comments__user-inner">
          <Link className="comments__user-name" to={"/user/" + props.author.id}>
            {props.author.first_name} {props.author.last_name}
          </Link>
        </div>
      </div>
      <p className="comments__text">{props.text}</p>
      <div className="comments__item-inner">
        <time className="comments__item-date" dateTime={props.created_at}>{date}</time>
        <button className="comments__item-btn" onClick={() => setIsReplying(!isReplying)}>Ответить</button>
      </div>
      {isReplying && (
        <ArticleCommentsForm articleId={props.articleId} reply={props.author} replyId={props.id} onNewMessage={onNewMessage} />
      )}
      <div className="comments__comments">
        {comments.map(comment => (
          <ArticleCommentsItem articleId={props.articleId} {...comment} key={comment.id} />
        ))}
      </div>
    </li>
  )
}

export default ArticleCommentsItem
