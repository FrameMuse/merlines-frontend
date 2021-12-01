import { useLocation } from 'react-router-dom';

function useFullRoute() {
  return `${useLocation().pathname}${useLocation().search}`;
};

export default useFullRoute;
