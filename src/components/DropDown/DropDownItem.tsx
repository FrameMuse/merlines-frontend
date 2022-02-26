import Icon, { IconName } from "components/common/Icon"
import { MouseEventHandler } from "react"
import { classWithModifiers } from "utils"


export interface DropDownElementProps {
  title: string
  code?: string
  iconName?: IconName
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
          <Icon className="drop-down__item-icon" name={props.iconName} />
        )}
        <span className="drop-down__item-title">{props.title}</span>
        {props.code && (
          <span className="drop-down__item-tag">{props.code}</span>
        )}
      </div>
    </div>
  )
}

export default DropDownItem
