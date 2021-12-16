// SCSS
import "./user.scss"

import { Link } from "react-router-dom"

import { ArticleType } from "../../Interfaces/Blog"
import ArticleComments from "./ArticleComments/ArticleComments"
import ArticleFigure from "./ArticleFigure"
import ArticleSocial from "./ArticleSocial/ArticleSocial"
import ArticleTag from "./ArticleTag"

// const convertToHTML = (item, index) => {
//   switch (item.type) {
//     case "header": {
//       return (
//         <h3 key={index} className="article__subtitle">
//           {item.text}
//         </h3>
//       )
//     }
//     case "paragraph": {
//       return (
//         <p key={index} className="article__text">
//           {item.text}
//         </p>
//       )
//     }
//     case "image": {
//       return <ArticleFigure key={index} item={item} />
//     }
//     case "list": {
//       return (
//         <div key={index}>
//           <p key={index} className="article__text article__text--before-list">
//             {item.text}
//           </p>
//           <ul className="article__list">
//             {item.list.map((element, indexLi) => (
//               <li key={indexLi} className="article__item">
//                 {element.item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )
//     }
//     default:
//       return <div key={index}>Some item</div>
//   }
// }


interface ArticleContentProps extends ArticleType { }

function ArticleContent(props: ArticleContentProps) {
  return (
    <section className="article-page">
      <div className="article-page__container">
        <article className="article">
          <div className="article-card article-card--header">
            <ul className="article-card__tags-list">
              {props.tags.map((tag, index) => (
                <ArticleTag key={index} tag={tag} />
              ))}
            </ul>
            <h2 className="article-card__title">{props.title}</h2>
            <time className="article-card__date" dateTime="2019-06-12">
              {props.date}
            </time>
            <ArticleFigure item={props.headerImage} title={true} />
          </div>
          {props.content.map((element, index) => element.toString())}
          <div className="user user--article">
            <img
              className="user__avatar"
              src={props.author.avatar}
              alt={props.author.name}
            />
            <div className="user__inner">
              <div className="user__tag">Автор</div>
              <Link className="user__name" to="#">
                {props.author.name}
              </Link>
            </div>
          </div>
          <ArticleSocial />
        </article>
        <ArticleComments list={props.comments} />
      </div>
    </section>
  )
}

export default ArticleContent
