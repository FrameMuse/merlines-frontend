import ArticleCommentsItem from "./ArticleCommentsItem"

function ArticleCommentsList({ commentsData }) {
  return (
    <div className="comments__inner">
      <ul className="comments__list">
        {commentsData.map((comment, index) => (
          <ArticleCommentsItem key={index} comment={comment} />
        ))}
      </ul>
      <div className="button-text">
        <button className="button-text__btn">
          загрузить еще 10 комментариев
        </button>
      </div>
    </div>
  )
}

export default ArticleCommentsList
