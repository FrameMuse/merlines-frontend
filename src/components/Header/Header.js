import { Link, useLocation } from 'react-router-dom';
import Svg from '../common/Svg';
import HeaderNavigation from './HeaderNavigation';
import routes from '../../routes';
import './header.scss'
import './nav.scss'

function Header() {
  const location = useLocation();

  const mainRoute = locationPath => {
    switch (locationPath) {
      case routes.priceCalendar.air:
        return routes.main;
      case routes.priceCalendar.train:
        return routes.train;
      case routes.priceCalendar.bus:
        return routes.bus;
      default:
        return routes.main;
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link className="logo" to={() => mainRoute(location.pathname)}>
          <Svg svgClass="logo__icon" svgName="merlines" svgWidth="98" svgHeight="22" />
        </Link>
        <HeaderNavigation />
      </div >
    </header>
  );
}

export default Header;
