import { SVGAttributes } from "react"


export type IconName = ("arrow" | "chevron" | "baggage" | "baggageLg" | "bus" | "calendar" | "checkbox" | "close" | "departures" | "download" | "edit" | "facebook" | "filter" | "germany" | "kingdom" | "history" | "instagram" | "like" | "loading" | "logout" | "notice" | "plane" | "question" | "russia" | "s7" | "search" | "share" | "star" | "switch" | "telegram" | "train" | "transfer" | "visibility" | "vkontakte" | "merlines" | "MerLines5" | "MerLines51" | "MerLines52" | "MerLines4" | "merlines1" | "merlines2" | "merlines3") | ({} & string)

interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName
}

function Icon(props: IconProps) {
  return (
    <svg {...props}>
      <use href={`img/sprite.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
