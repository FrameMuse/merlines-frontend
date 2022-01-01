import { SVGAttributes } from "react"

interface IconProps extends SVGAttributes<SVGElement> {
  name: ("arrow" | "baggage" | "baggageLg" | "bus" | "calendar" | "checkbox" | "close" | "departures" | "download" | "edit" | "facebook" | "filter" | "germany" | "history" | "instagram" | "like" | "loading" | "logout" | "notice" | "plane" | "question" | "russia" | "s7" | "search" | "share" | "star" | "switch" | "telegram" | "train" | "transfer" | "visibility" | "vkontakte" | "merlines" | "MerLines5" | "MerLines51" | "MerLines52" | "MerLines4" | "merlines1" | "merlines2" | "merlines3") | ({} & string)
}

function Icon(props: IconProps) {
  return (
    <svg {...props}>
      <use href={`img/sprite.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
