import Svg from "components/common/Svg"
import { MouseEventHandler } from "react"
import { classWithModifiers } from "utils"


export interface DropDownElementProps {
  title: string
  tag: string
  iconName?: string
}

interface DropDownItemProps extends DropDownElementProps {
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

function DropDownItem(props: DropDownItemProps) {
  return (
    <div className={classWithModifiers("drop-down__item", props.active && "active")} onClick={props.onClick}>
      <div className="drop-down__item-box">
        {props.iconName && (
          <Svg svgClass="drop-down__item-icon" svgName={props.iconName} />
        )}
        <span className="drop-down__item-title">{props.title}</span>
        <span className="drop-down__item-tag">{props.tag}</span>
      </div>
    </div>
  )
}

export default DropDownItem
