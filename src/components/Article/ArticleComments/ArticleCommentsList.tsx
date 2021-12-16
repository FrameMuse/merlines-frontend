import { useState } from "react"

import { ArticleCommentType } from "../../../Interfaces/Blog"
import ArticleCommentsItem from "./ArticleCommentsItem"

function ArticleCommentsList(props: { list: ArticleCommentType[] }) {
  const [list, setList] = useState(props.list)
  return (
    <div className="comments__inner">
      <ul className="comments__list">
        {list.map(item => (
          <ArticleCommentsItem {...item} key={item.id} />
        ))}
      </ul>
      <div className="button-text">
        <button className="button-text__btn">загрузить еще 10 комментариев</button>
      </div>
    </div>
  )
}

export default ArticleCommentsList
