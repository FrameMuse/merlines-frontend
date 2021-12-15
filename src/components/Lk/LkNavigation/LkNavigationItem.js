import { Link, useLocation } from "react-router-dom"

import Icon from "../../common/Icon"

function LkNavigationItem({ itemName, itemSvg, itemRoute }) {
  const path = useLocation().pathname
  const itemClass = `cabinet__nav-item ${path === itemRoute ? "cabinet__nav-item--active" : ""
  }`

  return (
    <Link className={itemClass} to={itemRoute}>
      {itemName}{" "}
      <Icon
        className="cabinet__nav-icon"
        name={itemSvg}
        width="15"
        height="15"
      />
    </Link>
  )
}

export default LkNavigationItem
