import { SVGAttributes } from "react"

interface IconProps extends SVGAttributes<SVGElement> { }

function Icon(props: IconProps) {
  return (
    <svg {...props}>
      <use href={`img/sprite.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
