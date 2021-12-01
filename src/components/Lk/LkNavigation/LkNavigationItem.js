import { Link, useLocation } from 'react-router-dom';
import Svg from '../../common/Svg';

function LkNavigationItem({ itemName, itemSvg, itemRoute }) {
  const path = useLocation().pathname;
  const itemClass = `cabinet__nav-item ${(path === itemRoute) ? "cabinet__nav-item--active" : ""}`;

  return (
    <Link className={itemClass} to={itemRoute}>
      {itemName} <Svg svgClass="cabinet__nav-icon" svgName={itemSvg} svgWidth="15" svgHeight="15" />
    </Link>
  )
};

export default LkNavigationItem;
