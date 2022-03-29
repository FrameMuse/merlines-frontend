import { Link } from "react-router-dom"


function UserCabinetFeedback() {
  return (
    <>
      <h2 className="cabinet__title cabinet__title--question">Задать вопрос</h2>
      <p className="cabinet__text">
        Если на странице блога в разделе
        {" "}
        <Link to="/faq">#FAQ</Link>
        {" "}
        вы не нашли ответ на интересующий вас вопрос относительно нашего
        сервиса, то вы можете задать его здесь и мы ответим как можно скорее.
      </p>
      <form className="cabinet__form">
        <textarea className="cabinet__textarea cabinet__form-message" placeholder="Опишите Ваш вопрос или проблему" />
        <input className="btn btn--form" type="submit" value="Отправить" />
      </form>
    </>
  )
}

export default UserCabinetFeedback
