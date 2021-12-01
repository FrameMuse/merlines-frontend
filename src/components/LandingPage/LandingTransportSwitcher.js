import { Link } from 'react-router-dom';
import Svg from '../common/Svg';

function LandingTransportSwitcher() {
  return (
    <div className="special-nav landing__special-nav">
      <Link className="special-nav__item special-nav__item--active" to="#">
        <Svg svgClass="special-nav__icon" svgName="plane" svgWidth="25" svgHeight="26" />
      </Link>
      <Link className="special-nav__item" to="#">
        <Svg svgClass="special-nav__icon" svgName="train" svgWidth="22" svgHeight="26" />
      </Link>
      <Link className="special-nav__item" to="#">
        <Svg svgClass="special-nav__icon" svgName="bus" svgWidth="22" svgHeight="26" />
      </Link>
    </div>
  )
};

export default LandingTransportSwitcher;
