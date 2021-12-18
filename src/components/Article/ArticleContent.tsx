// SCSS
import "./user.scss"

import { ArticleType } from "interfaces/Blog"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"

import ArticleComments from "./ArticleComments/ArticleComments"
import ArticlePicture from "./ArticleFigure"
import ArticleSocial from "./ArticleSocial/ArticleSocial"
import ArticleTag from "./ArticleTag"


interface ArticleContentProps extends ArticleType {
  noComments?: boolean
}

function ArticleContent(props: ArticleContentProps) {
  const date = new Date(props.created_at).toLocaleString("ru", { dateStyle: "long", timeStyle: "long" })
  return (
    <section className="article-page">
      <div className="article-page__container">
        <article className="article">
          <ArticleSocial />
          <div className="article-card article-card--header">
            <ul className="article-card__tags-list">
              {props.tags.map((tag, index) => (
                <ArticleTag key={index} tag={tag} />
              ))}
            </ul>
            <h2 className="article-card__title">{props.title}</h2>
            <time className="article-card__date" dateTime={props.created_at}>{date}</time>
            <ArticlePicture src={props.preview} />
          </div>
          <ReactMarkdown components={{ img: props => <ArticlePicture src={props.src} caption={props.alt} /> }}>{props.content}</ReactMarkdown>
          <div className="user user--article">
            <img className="user__avatar" src={props.author.avatar} alt="avatar" />
            <div className="user__inner">
              <div className="user__tag">Автор</div>
              <Link className="user__name" to={"/user/" + props.author.id}>
                {props.author.first_name} {props.author.last_name}
              </Link>
            </div>
          </div>
        </article>
        {!props.noComments && (
          <ArticleComments list={props.comments} />
        )}
      </div>
    </section>
  )
}

export default ArticleContent
