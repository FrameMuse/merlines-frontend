// SCSS
import "./user.scss"

import AdminButton from "admin/components/AdminButton/AdminButton"
import { ArticleType } from "interfaces/Blog"
import ReactMarkdown from "react-markdown"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import ArticleComments from "./ArticleComments/ArticleComments"
import ArticlePicture from "./ArticleFigure"
import ArticleSocial from "./ArticleSocial/ArticleSocial"
import ArticleTag from "./ArticleTag"


interface ArticleContentProps extends ArticleType {
  noComments?: boolean
}

function ArticleContent(props: ArticleContentProps) {
  const user = useSelector(state => state.user)
  const date = new Date(props.created_at).toLocaleString("ru", { dateStyle: "long", timeStyle: "medium" })
  return (
    <section className="article-page">
      {user.authed && ["admin", "editor", undefined].includes(user.role) && (
        <EditArticleButton articleId={props.id} />
      )}
      <div className="article-page__container">
        <article className="article">
          <ArticleSocial />
          <div className="article-card article-card--header">
            <div className="article-card__tags-list">
              {props.tags.map((tag, index) => (
                <ArticleTag key={index} tag={tag} />
              ))}
            </div>
            <h2 className="article-card__title">{props.title}</h2>
            <time className="article-card__date" dateTime={props.created_at}>{date}</time>
          </div>
          <div className="article__content">
            <ReactMarkdown components={{ img: props => <ArticlePicture {...props} /> }}>{props.content}</ReactMarkdown>
          </div>
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
        <ArticleComments list={props.comments} />
      </div>
    </section>
  )
}

function EditArticleButton(props: { articleId: number }) {
  return (
    <>
      <Link to={"/admin/edit-article/" + props.articleId} className="admin-button admin-button--gray">Редактировать статью</Link>
      <br />
      <br />
      <br />
    </>
  )
}

export default ArticleContent
