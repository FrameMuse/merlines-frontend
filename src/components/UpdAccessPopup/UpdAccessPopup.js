import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setHistoryRoute } from '../../reducers/routesDataSlice';
import { selectAccessData, setIsRememberMe } from '../../reducers/accessDataSlice';
import Svg from '../common/Svg';
import UpdAccessPopupConfirm from './UpdAccessPopupConfirm';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import routes from '../../routes';
import useQuery from '../../hooks/useQuery';
import useFullRoute from '../../hooks/useFullRoute';

function UpdAccessPopup({ login, active }) {
  const history = useHistory();
  const query = useQuery();
  const fullRoute = useFullRoute();
  const dispatch = useDispatch();
  const accessData = useSelector(selectAccessData);
  const prevLocation = query.get('next');
  const location = useLocation();
  const [popupName, setPopupName] = useState(login ? 'Вход' : 'Регистрация');

  const closeAccessPopup = (e) => {
    const popup = e.currentTarget.parentElement;
    popup.classList.remove('modal--opened');
    popup.addEventListener('transitionend', () => history.push(prevLocation ? prevLocation : location.pathname), false);
    // popup.addEventListener('transitionend', () => history.push(location.pathname), false);
  }
  const takePopupName = evt => setPopupName(evt.target.textContent);
  const getFullRoute = () => dispatch(setHistoryRoute(fullRoute));
  const onClickChangeIsRememberMe = () => dispatch(setIsRememberMe());

  return (
    <section className={`modal ${active ? "modal--opened" : ""}`}>
      <button className="modal__close" onClick={closeAccessPopup}>
        <span className="modal__close-text">закрыть</span>
        <Svg svgClass="modal__close-icon" svgName="close" svgWidth="15" svgHeight="15" />
      </button>
      <div className="modal__container">
        {
          (popupName !== 'Подтверждение')
          &&
          <div className="subnav subnav--modal modal__subnav">
            <Link
              onClick={takePopupName}
              className={`subnav-link ${(popupName === 'Вход') ? "subnav-link--active" : ""}`}
              to={`${routes.login}?next=${query.get('next')}`}>Вход</Link>
            <Link
              onClick={takePopupName}
              className={`subnav-link ${(popupName === 'Регистрация') ? "subnav-link--active" : ""}`}
              to={`${routes.signup}?next=${query.get('next')}`}>Регистрация</Link>
          </div>
        }
        {
          (popupName === 'Регистрация')
          &&
          <Signup
            setPopupName={setPopupName}
            getFullRoute={getFullRoute}
            isRememberMe={accessData.isRememberMe}
            setIsRememberMe={onClickChangeIsRememberMe} />
        }
        {
          (popupName === 'Вход')
          &&
          <Login
            getFullRoute={getFullRoute}
            isRememberMe={accessData.isRememberMe}
            setIsRememberMe={onClickChangeIsRememberMe} />
        }
        {
          (popupName === 'Подтверждение')
          &&
          <UpdAccessPopupConfirm />
        }
      </div>
    </section>
  )
};

export default UpdAccessPopup;
