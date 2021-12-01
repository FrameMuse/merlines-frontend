import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHistoryRoute } from '../../../reducers/routesDataSlice';
import routes from '../../../routes';
import useFullRoute from '../../../hooks/useFullRoute';
import './textarea.scss'

function LkFeedback() {
  const fullRoute = useFullRoute();
  const dispatch = useDispatch();

  const getFullRoute = () => dispatch(setHistoryRoute(fullRoute));

  return (
    <>
      <h2 className="cabinet__title cabinet__title--question">Задать вопрос</h2>
      <p className="cabinet__text">Если на странице блога в разделе <Link onClick={getFullRoute} to={routes.footer.faq}>#FAQ</Link> вы не нашли ответ на интересующий вас вопрос относительно нашего сервиса, то вы можете задать его здесь и мы ответим как можно скорее.</p>
      <form className="cabinet__form">
        <textarea className="textarea cabinet__form-message" placeholder="Опишите Ваш вопрос или проблему"></textarea>
        <input className="btn btn--form" type="submit" value="Отправить" />
      </form>
    </>
  )
};

export default LkFeedback;
