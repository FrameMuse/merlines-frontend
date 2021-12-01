function Svg({ svgClass, svgName, svgWidth, svgHeight, handleClick, upd, updClass, updClass2, updSvgName }) {
  return (
    <>
      {
        !upd
          ?
          <svg onClick={handleClick} className={svgClass} width={svgWidth} height={svgHeight}>
            <use xlinkHref={`img/sprite.svg#${svgName}`} />
          </svg>
          :
          <svg onClick={handleClick} className={svgClass} width={svgWidth} height={svgHeight}>
            <use className={updClass} href={`img/sprite.svg#${svgName}`} />
            <use className={updClass2} href={`img/sprite.svg#${updSvgName}`} />
          </svg>
      }
    </>
  )
}

export default Svg;
