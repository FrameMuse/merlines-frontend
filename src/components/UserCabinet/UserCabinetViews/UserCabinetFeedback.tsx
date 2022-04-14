import { Link } from "react-router-dom"

import useLocalization from "../../../plugins/localization/hook"


function UserCabinetFeedback() {
  const ll = useLocalization(ll => ll)
  return (
    <>
      <h2 className="cabinet__title cabinet__title--question">{ll.main.askQuestion}</h2>
      <p className="cabinet__text">
        {ll.lk.faqText.beforeLink}
        {" "}
        <Link to="/faq">#FAQ</Link>
        {" "}
        {ll.lk.faqText.afterLink}
      </p>
      <form className="cabinet__form">
        <textarea className="cabinet__textarea cabinet__form-message" placeholder={ll.lk.feedbackPlaceholder} />
        <input className="btn btn--form" type="submit" value={ll.lk.send} />
      </form>
    </>
  )
}

export default UserCabinetFeedback
