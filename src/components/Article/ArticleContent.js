import React from "react"
import { Link } from "react-router-dom"
import "./user.scss"

import ArticleTag from "./ArticleTag"
import ArticleFigure from "./ArticleFigure"
import ArticleSocial from "./ArticleSocial/ArticleSocial"
import ArticleComments from "./ArticleComments/ArticleComments"

const convertToHTML = (item, index) => {
  switch (item.type) {
    case "header": {
      return (
        <h3 key={index} className="article__subtitle">
          {item.text}
        </h3>
      )
    }
    case "paragraph": {
      return (
        <p key={index} className="article__text">
          {item.text}
        </p>
      )
    }
    case "image": {
      return <ArticleFigure key={index} item={item} />
    }
    case "list": {
      return (
        <div key={index}>
          <p key={index} className="article__text article__text--before-list">
            {item.text}
          </p>
          <ul className="article__list">
            {item.list.map((element, indexLi) => (
              <li key={indexLi} className="article__item">
                {element.item}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    default:
      return <div key={index}>Some item</div>
  }
}

function ArticleContent({ articleData }) {
  return (
    <section className="article-page">
      <div className="article-page__container">
        <article className="article">
          <div className="article-card article-card--header">
            <ul className="article-card__tags-list">
              {articleData.tags.map((tag, index) => (
                <ArticleTag key={index} tagName={tag} />
              ))}
            </ul>
            <h2 className="article-card__title">{articleData.title}</h2>
            <time className="article-card__date" dateTime="2019-06-12">
              {articleData.date}
            </time>
            <ArticleFigure item={articleData.headerImage} title={true} />
          </div>
          {articleData.content.map((element, index) =>
            convertToHTML(element, index)
          )}
          <div className="user user--article">
            <img
              className="user__avatar"
              src={articleData.author.avatar}
              alt={articleData.author.name}
            />
            <div className="user__inner">
              <div className="user__tag">Автор</div>
              <Link className="user__name" to="#">
                {articleData.author.name}
              </Link>
            </div>
          </div>
          <ArticleSocial />
        </article>
        {articleData.comments && (
          <ArticleComments comments={articleData.comments} />
        )}
      </div>
    </section>
  )
}

export default ArticleContent
