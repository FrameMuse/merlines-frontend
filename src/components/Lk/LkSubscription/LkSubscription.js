import { useState } from 'react';

import LkSwitcher from '../LkSwitcher';
import LkContentClearAll from '../LkContent/LkContentClearAll';
import LkContentRoute from '../LkContent/LkContentRoute';

function LkSubscription() {
  const [isActiveRoutes, setIsActiveRoutes] = useState();
  const [isActiveTickets, setIsActiveTickets] = useState();

  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title cabinet__title--history">Подписки</h2>
        <LkSwitcher
          setIsActiveRoutes={setIsActiveRoutes}
          setIsActiveTickets={setIsActiveTickets}
          subscribes={true} />
        <LkContentClearAll subscribe={true} />
      </div>
      {
        isActiveRoutes
        &&
        <ul className="cabinet__col-list">
          <LkContentRoute />
          <LkContentRoute />
          <LkContentRoute />
        </ul>
      }
      {
        isActiveTickets
        &&
        <ul className="cabinet__col-list">
          Билеты
        </ul>
      }
    </>
  )
};

export default LkSubscription;
