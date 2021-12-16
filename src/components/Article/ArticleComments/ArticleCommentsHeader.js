import Icon from "../../common/Icon"

function ArticleCommentsHeader() {
  return (
    <header className="comments__header">
      <h2 className="comments__header-title">
        <span className="comments__header-counter">23</span>комментария
      </h2>
      <div className="comments__like">
        <span className="comments__like-counter">24</span>
        <Icon
          className="comments__like-icon"
          name="like"
          width="20"
          height="20"
        />
      </div>
    </header>
  )
}

export default ArticleCommentsHeader
