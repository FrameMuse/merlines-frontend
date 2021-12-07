interface asd {
  svgName?: string
  svgClass?: string

  svgWidth?: string
  svgHeight?: string
}

function Svg(props: asd) {
  return (
    <svg width={props.svgWidth} height={props.svgHeight} className={props.svgClass}>
      <use href={`img/sprite.svg#${props.svgName}`} />
    </svg>
  )
}

export default Svg
