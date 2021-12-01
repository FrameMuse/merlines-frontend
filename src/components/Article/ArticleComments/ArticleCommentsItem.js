import { Link } from 'react-router-dom';

function ArticleCommentsItem({ comment }) {
  return (
    <li className="comments__item">
      <div className="user user--comments">
        <img className="user__avatar" src={comment.author.avatar} alt={comment.author.name} />
        <div className="comments__user-inner">
          <Link className="comments__user-name" to="#">{comment.author.name}</Link>
        </div>
      </div>
      <p className="comments__text">{comment.text}</p>
      <div className="comments__item-inner">
        <time className="comments__item-date">{comment.date}</time>
        <button className="comments__item-btn">Ответить</button>
      </div>
      {
        comment.answers
        &&
        <ul className="comments__answer-list">
          {comment.answers.map((answer, index) =>
            <li key={index} className="comments__answer-item">
              <div className="comments__user comments__user--inner">
                <img className="comments__user-img" src={answer.author.avatar} alt={answer.author.name} />
                <div className="comments__user-inner">
                  <Link className="comments__user-name" to="#">{answer.author.name}</Link>
                  <div className="comments__user-info">ответ для <Link to="#">{comment.author.name}</Link></div>
                </div>
              </div>
              <p className="comments__text">{answer.text}</p>
              <div className="comments__item-inner">
                <time className="comments__item-date">{answer.date}</time>
                <button className="comments__item-btn">Ответить</button>
              </div>
            </li>)}
        </ul>
      }
    </li>
  )
};

export default ArticleCommentsItem;
