interface ArticleFigureProps {
  src?: string
  alt?: string
  title?: string
}

function ArticlePicture(props: ArticleFigureProps) {
  return (
    <figure className="article-picture">
      <picture>
        <img className="article-picture__image" src={props.src} alt={props.alt || "unknown"} />
      </picture>
      {props.title && (
        <figcaption className="article-picture__caption">{props.title}</figcaption>
      )}
    </figure>
  )
}

export default ArticlePicture
