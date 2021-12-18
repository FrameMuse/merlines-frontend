import { ArticleReplyType } from "interfaces/Blog"
import { Link } from "react-router-dom"


interface ArticleCommentsItemProps extends ArticleReplyType { }

function ArticleCommentsItem(props: ArticleCommentsItemProps) {
  const date = new Date(props.created_at).toLocaleString("ru", { dateStyle: "long", timeStyle: "long" })
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
        <button className="comments__item-btn">Ответить</button>
      </div>
      <div className="comments__comments">
        {props.replies?.map(comment => (
          <ArticleCommentsItem {...comment} key={comment.id} />
        ))}
      </div>
    </li>
  )
}

export default ArticleCommentsItem
