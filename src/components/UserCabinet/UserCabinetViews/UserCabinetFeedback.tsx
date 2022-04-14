import { postAccountSupport } from "api/actions/account"
import { FormElements } from "interfaces/common"
import { FormEvent } from "react"
import { useMutation } from "react-fetching-library"
import { Link } from "react-router-dom"

import useLocalization from "../../../plugins/localization/hook"


function UserCabinetFeedback() {
  const ll = useLocalization(ll => ll)
  const { mutate: sendTicket } = useMutation(postAccountSupport)
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const elements = target.elements as FormElements<"text">

    const { error } = await sendTicket(elements.text.value)
    if (error) return

    target.reset()
  }
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
      <form className="cabinet__form" onSubmit={onSubmit}>
        <textarea className="cabinet__textarea cabinet__form-message" name="text" placeholder={ll.lk.feedbackPlaceholder} />
        <input className="btn btn--form" type="submit" value={ll.lk.send} />
      </form>
    </>
  )
}

export default UserCabinetFeedback
