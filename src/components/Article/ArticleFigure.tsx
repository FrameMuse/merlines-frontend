interface ArticleFigureProps {
  src?: string
  caption?: string
}

function ArticlePicture(props: ArticleFigureProps) {
  return (
    <figure className="article-picture">
      <picture>
        <img className="article-picture__image" src={props.src} alt="article picture" />
      </picture>
      {props.caption && (
        <figcaption className="article-picture__caption">{props.caption}</figcaption>
      )}
    </figure>
  )
}

export default ArticlePicture
