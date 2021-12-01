import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

function LkSwitcher({ setIsActiveRoutes, setIsActiveTickets, subscribes }) {
  const initialState = {
    isActiveRoutes: true,
    isActiveTickets: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'pickRoutes':
        return {
          isActiveRoutes: true,
          isActiveTickets: false
        };
      case 'pickTickets':
        return {
          isActiveRoutes: false,
          isActiveTickets: true
        };
      default:
        throw new Error();
    }
  };

  const [favouritesMenu, dispatch] = useReducer(reducer, initialState);
  const routesClass = `subnav-link ${favouritesMenu.isActiveRoutes ? "subnav-link--active" : ""}`;
  const ticketsClass = `subnav-link ${favouritesMenu.isActiveTickets ? "subnav-link--active" : ""}`;
  const mainClass = `subnav ${subscribes ? "cabinet__subnav" : ""}`;

  useEffect(() => {
    setIsActiveRoutes(favouritesMenu.isActiveRoutes);
    setIsActiveTickets(favouritesMenu.isActiveTickets);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouritesMenu.isActiveRoutes, favouritesMenu.isActiveTickets]);

  return (
    <div className={mainClass}>
      <Link
        onClick={() => dispatch({ type: 'pickRoutes' })}
        className={routesClass}
        to="#">Маршруты</Link>
      <Link
        onClick={() => dispatch({ type: 'pickTickets' })}
        className={ticketsClass}
        to="#">Билеты</Link>
    </div>
  )
}

export default LkSwitcher;
