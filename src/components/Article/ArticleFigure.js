function ArticleFigure({ item, title }) {
  return (
    <figure className={`${title ? "article-card__figure" : "article__figure"}`}>
      <picture>
        <source
          type="image/webp"
          media="(min-width: 1170px)"
          srcSet={`${item.src.desktop}.webp, ${item.src.desktop}@2x.webp 2x`}
        />
        <source
          type="image/webp"
          media="(min-width: 992px)"
          srcSet={`${item.src.laptop}.webp, ${item.src.laptop}@2x.webp 2x`}
        />
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet={`${item.src.tablet}.webp, ${item.src.tablet}@2x.webp 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${item.src.mobile}.webp, ${item.src.mobile}@2x.webp 2x`}
        />
        <source
          media="(min-width: 1170px)"
          srcSet={`${item.src.desktop}.jpg, ${item.src.desktop}@2x.jpg 2x`}
        />
        <source
          media="(min-width: 992px)"
          srcSet={`${item.src.laptop}.jpg, ${item.src.laptop}@2x.jpg 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${item.src.tablet}.jpg, ${item.src.tablet}@2x.jpg 2x`}
        />
        <img
          className={`${title ? "article-card__img" : "article__img"}`}
          src={`${item.src.mobile}.jpg`}
          srcSet={`${item.src.mobile}@2x.jpg 2x`}
          width="290"
          height="200px"
          alt={item.img.alt}
        />
      </picture>
      <figcaption className="article__photo-author">{`Автор фото - ${item.img.author}`}</figcaption>
    </figure>
  )
}

export default ArticleFigure
